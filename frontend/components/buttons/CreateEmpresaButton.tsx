import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/SuperAdminPage.module.css';

interface EmpresaData {
  name: string;
  address: string;
  phone: string;
  email: string;
  cnpj: string;
}

const CreateEmpresaButton = ({ onEmpresaCreated }: { onEmpresaCreated: () => void }) => {
  const [showCreateEmpresa, setShowCreateEmpresa] = useState(false);
  const [empresaData, setEmpresaData] = useState<EmpresaData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    cnpj: '',
  });

  const handleCreateEmpresa = async () => {
    try {
      const response = await axios.post('http://localhost:8000/empresa/register', empresaData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(response.data.msg);
      setShowCreateEmpresa(false);
      onEmpresaCreated();
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      alert('Falha ao criar empresa');
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={() => setShowCreateEmpresa(!showCreateEmpresa)}>Criar Empresa</button>
      {showCreateEmpresa && (
        <div className={styles.createForm}>
          <input type="text" placeholder="Nome" onChange={(e) => setEmpresaData({ ...empresaData, name: e.target.value })} />
          <input type="text" placeholder="Endereço" onChange={(e) => setEmpresaData({ ...empresaData, address: e.target.value })} />
          <input type="text" placeholder="Telefone" onChange={(e) => setEmpresaData({ ...empresaData, phone: e.target.value })} />
          <input type="text" placeholder="Email" onChange={(e) => setEmpresaData({ ...empresaData, email: e.target.value })} />
          <input type="text" placeholder="CNPJ" onChange={(e) => setEmpresaData({ ...empresaData, cnpj: e.target.value })} />
          <button className={styles.confirmButton} onClick={handleCreateEmpresa}>Confirmar</button>
        </div>
      )}
    </div>
  );
};

export default CreateEmpresaButton;
