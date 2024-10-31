// src/services/user.service.js

const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (userData) => {
  const { email, name, password } = userData;

  // Normalize email
  const normalizedEmail = email.toLowerCase();

  // Check if user already exists
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new Error('User already exists with this email address.');
  }

  // Hash password
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  const newUser = new User({
    email: normalizedEmail,
    name,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

// Authenticate User
const authenticateUser = async (email, password) => {
  // Normalize email
  const normalizedEmail = email.toLowerCase();

  // Find user by email
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw new Error('Invalid credentials.');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials.');
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
};

// Get User Profile
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found.');
  }
  return user;
};

// Update User Profile
const updateUserProfile = async (userId, updateData) => {
  const { email, name, password } = updateData;
  const updateFields = {};

  if (email) {
    const normalizedEmail = email.toLowerCase();
    // Check if the new email already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser && existingUser._id.toString() !== userId) {
      throw new Error('Email is already in use by another user.');
    }
    updateFields.email = normalizedEmail;
  }
  if (name) updateFields.name = name;
  if (password) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    updateFields.password = await bcrypt.hash(password, saltRounds);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!updatedUser) {
    throw new Error('User not found.');
  }

  return updatedUser;
};

module.exports = {
  registerUser,
  authenticateUser,
  getUserProfile,
  updateUserProfile,
};
