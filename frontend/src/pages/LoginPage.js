// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { loginUser } from '../api/userApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button label="Login" onClick={handleLogin} />
    </div>
  );
};

export default LoginPage;