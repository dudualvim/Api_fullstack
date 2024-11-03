import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/SuperAdminPage.module.css';

const RefreshTokenButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshToken = async () => {
    setIsLoading(true);
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
      }


      const params = new URLSearchParams({ refresh_token: refreshToken });

      const response = await axios.post(
        `http://localhost:8000/auth/refresh-token?${params.toString()}`,
        null, 
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (response.data.access_token && response.data.refresh_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        alert('Token atualizado com sucesso');
      } else {
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error: any) {
      console.error('Erro ao atualizar token:', error);
      alert(error.response?.data?.detail || error.message || 'Erro ao atualizar token');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={styles.button}
      onClick={handleRefreshToken}
      disabled={isLoading}
    >
      {isLoading ? 'Atualizando...' : 'Atualizar Token'}
    </button>
  );
};

export default RefreshTokenButton;