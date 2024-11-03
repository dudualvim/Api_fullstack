import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authProvider';
import styles from '../styles/SuperAdminPage.module.css';
import CreateUserButton from '../components/buttons/CreateUserButton';
import UserList from '../components/lists/UserList';
import RefreshTokenButton from '../components/auth/RefreshTokenButton';

const AdminPage = () => {
  const { userRole, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      router.push('/login');
    } else {
      handleListUsers(); // Listar os usuários quando o componente for carregado
    }
  }, [userRole, isAuthenticated, router]);

  if (!isAuthenticated || userRole !== 'admin') {
    return <p>Redirecionando...</p>;
  }

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [userData, setUserData] = useState({ name: '', email: '', password: '', role: 'operador', empresa_id: null });

  const handleCreateUser = async () => {
    console.log('Criando usuário com os dados:', userData);

    // Verifique se todos os campos obrigatórios estão preenchidos
    if (!userData.name || !userData.email || !userData.password) {
      alert('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/usuario/register', userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Resposta da criação do usuário:', response.data);

      // Verifique se a resposta contém a mensagem ou outro dado relevante
      if (response.data && response.data.msg) {
        alert(response.data.msg);
      } else {
        alert('Usuário criado com sucesso');
      }

      setShowCreateUser(false);
      handleListUsers(); // Atualizar a lista de usuários
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      if (error.response) {
        console.error('Erro detalhes:', error.response.data);
      }
      alert('Falha ao criar usuário');
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Page</h1>
      <div className={styles.buttonContainer}>
        <CreateUserButton onUserCreated={handleListUsers} />
      </div>
      <RefreshTokenButton />
      <UserList users={users} empresas={empresas} />
    </div>
  );
};

export default AdminPage;
