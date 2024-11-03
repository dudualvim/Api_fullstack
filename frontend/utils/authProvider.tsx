import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../services/auth';
import { decodeJWT } from '../utils/jwtUtils';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  userRole: string | null;
  isAuthenticated: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
  
      if (!response || !response.access_token) {
        throw new Error('Resposta Invalida do Server');
      }
  
      
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
  

      const decoded = decodeJWT(response.access_token);
      console.log('Decoded token:', decoded);
  
      if (!decoded || !decoded.role) {
        throw new Error('Formato de Token Invalido');
      }
  
      setUserRole(decoded.role);
      setIsAuthenticated(true);
  
      // Confere a role do usuário e redireciona para a página correta
      if (decoded.role === 'superadmin') {
        await router.push('/superadmin');
      } else if (decoded.role === 'admin') {
        await router.push('/admin');
      } else if (decoded.role === 'operador') {
        await router.push('/operador');
      } else {
        throw new Error('Papel do usuário inválido');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  

  const logout = () => {
    console.log("Logout executado");
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setUserRole(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ login, userRole, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
