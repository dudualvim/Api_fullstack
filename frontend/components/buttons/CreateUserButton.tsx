import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/SuperAdminPage.module.css';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  empresa_id: number | null;
}

const CreateUserButton = ({ onUserCreated }: { onUserCreated: () => void }) => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    role: '',
    empresa_id: null,
  });

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/usuario/register', userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(response.data.msg);
      setShowCreateUser(false);
      onUserCreated();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Falha ao criar usuário');
    }
  };

  return (
    <div>
        <button className={styles.button} onClick={() => setShowCreateUser(!showCreateUser)}>Criar Usuário</button>
            {showCreateUser && (
                <div className={styles.createForm}>
                <input type="text" placeholder="Nome" onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                <input type="text" placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                <input type="password" placeholder="Senha" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                <select className={styles.selectInput} onChange={(e) => setUserData({ ...userData, role: e.target.value })}>
                    <option value="">Selecione uma função</option>
                    <option value="admin">Admin</option>
                    <option value="operador">Operador</option>
                    <option value="superadmin">Superadmin</option>
                </select>
                <input type="number" placeholder="ID da Empresa" onChange={(e) => setUserData({ ...userData, empresa_id: parseInt(e.target.value) })} />
                <button className={styles.confirmButton} onClick={handleCreateUser}>Confirmar</button>
                </div>
            )}
    </div>
  );
};

export default CreateUserButton;