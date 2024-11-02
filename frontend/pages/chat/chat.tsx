import { useState } from 'react';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    setMessages([...messages, message]);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua mensagem"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">
        Enviar
      </button>
    </div>
  );
};

export default ChatPage;
