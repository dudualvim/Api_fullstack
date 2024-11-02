import React from 'react';
import ChatWindow from '../components/chat/ChatWindow';
import { useAuth } from '../utils/authProvider';

const OperadorPage = () => {
  const { userRole } = useAuth();

  if (userRole !== 'operador') {
    return <p>Você não tem permissão para acessar esta página.</p>;
  }

  return (
    <div>
      <ChatWindow empresaId={1} />
    </div>
  );
};

export default OperadorPage;
