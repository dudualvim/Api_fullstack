import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authProvider';
import styles from '../styles/SuperAdminPage.module.css';
import CreateUserButton from '../components/buttons/CreateUserButton';
import CreateEmpresaButton from '../components/buttons/CreateEmpresaButton';
import UserList from '../components/lists/UserList';
import EmpresaList from '../components/lists/EmpresaList';
import RefreshTokenButton from '../components/auth/RefreshTokenButton';

const SuperAdminPage = () => {
  const { userRole, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'superadmin') {
      router.push('/login');
    }
  }, [userRole, isAuthenticated, router]);

  if (!isAuthenticated || userRole !== 'superadmin') {
    return <p>Redirecionando...</p>;
  }

  const [showCreateEmpresa, setShowCreateEmpresa] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [users, setUsers] = useState([]);
  const [empresaData, setEmpresaData] = useState({ name: '', address: '', phone: '', email: '', cnpj: '' });
  const [userData, setUserData] = useState({ name: '', email: '', password: '', role: '', empresa_id: null });

  const handleCreateEmpresa = async () => {
    try {
      console.log('Dados da empresa sendo enviados:', empresaData);
      const response = await axios.post('http://localhost:8000/empresa/register', empresaData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert(response.data.msg);
      setShowCreateEmpresa(false);
      handleListEmpresas(); // Atualizar a lista de empresas
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      alert('Falha ao criar empresa');
    }
  };

  const handleCreateUser = async () => {
    console.log('Criando usuário com os dados:', userData);
  
    // Verifique se todos os campos obrigatórios estão preenchidos
    if (!userData.name || !userData.email || !userData.password || !userData.role) {
      alert('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/usuario/register', userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert(response.data?.msg || "Usuário criado com sucesso");
      setShowCreateUser(false);
  
      // Atualiza a lista de usuários
      await handleListUsers();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      if (error.response) {
        console.error('Erro detalhes:', error.response.data);
      }
      alert('Falha ao criar usuário');
    }
  };
  

  const handleListEmpresas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/empresa/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEmpresas(response.data);
    } catch (error) {
      console.error('Erro ao listar empresas:', error);
      alert('Falha ao listar empresas');
    }
  };

  const handleListUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/usuario/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      alert('Falha ao listar usuários');
    }
  };

  const handleRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error("Refresh token não encontrado");
      }
  
      const response = await axios.post(
        'http://localhost:8000/refresh-token',
        { refresh_token: refreshToken }, // Passa o token no corpo da requisição
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      alert('Token atualizado com sucesso!');
      // Armazena novos tokens
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      if (error.response) {
        console.error('Erro detalhes:', error.response.data);
      }
      alert('Falha ao atualizar token');
    }
  };
  

  useEffect(() => {
    handleListEmpresas();
    handleListUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Super Admin Page</h1>
      <div className={styles.buttonContainer}>
        <CreateEmpresaButton onEmpresaCreated={handleListEmpresas} />
        <CreateUserButton onUserCreated={handleListUsers} />
      </div>
      <RefreshTokenButton />
      <EmpresaList empresas={empresas} />
      <UserList users={users} empresas={empresas} />
      <div className={styles.refreshTokenContainer}>
      </div>
    </div>
  );
};

export default SuperAdminPage;
