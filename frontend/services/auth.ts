// services/auth.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    throw error;
  }
};
