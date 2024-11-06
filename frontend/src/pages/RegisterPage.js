// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { registerUser } from '../api/userApi';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ name, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button label="Register" onClick={handleRegister} />
    </div>
  );
};

export default RegisterPage;