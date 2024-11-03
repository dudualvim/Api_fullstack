import React, { useState, useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RefreshTokenButton from '../components/auth/RefreshTokenButton';

const LoginPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Verifique se estamos no lado do cliente
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const handleTokenRefresh = () => {
    if (typeof window !== 'undefined') {
      // Atualiza o estado do token no lado do cliente
      setToken(localStorage.getItem('token'));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
