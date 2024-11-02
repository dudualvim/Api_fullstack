// pages/chat/MessagingPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/authProvider';
import UserList from '../components/chat/UserList';
import ChatWindow from '../components/chat/ChatWindow';
import styles from '../../styles/SuperAdminPage.module.css';

const MessagingPage = () => {
  const { isAuthenticated, userRole } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    if (isAuthenticated && userRole === 'operador') {
      fetchAdmins();
    }
  }, [isAuthenticated, userRole]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8000/usuario/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const adminsList = response.data.filter(
        (user) => user.role === 'admin' || user.role === 'superadmin'
      );
      setAdmins(adminsList);
    } catch (error) {
      console.error('Erro ao buscar admins:', error);
      alert('Erro ao buscar admins disponíveis.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mensageria - Operador/Admin</h1>
      <div className={styles.messagingContent}>
        <div className={styles.sidebar}>
          <h3>Admins Disponíveis</h3>
          <UserList users={admins} onSelectUser={(user) => setSelectedAdmin(user)} />
        </div>
        <div className={styles.chatContainer}>
          {selectedAdmin ? (
            <ChatWindow empresaId={selectedAdmin?.empresaId} />
          ) : (
            <p className={styles.placeholderText}>Selecione um admin para iniciar a conversa</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
