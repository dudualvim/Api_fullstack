import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/ChatWindow.module.css';

const ChatWindow = ({ empresaId }: { empresaId: number }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Conectando ao WebSocket
    socket.current = new WebSocket(`ws://localhost:8000/ws/${empresaId}`);

    socket.current.onopen = () => {
      console.log('Conectado ao WebSocket');
    };

    socket.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.current.onclose = () => {
      console.log('Desconectado do WebSocket');
    };

    return () => {
      socket.current?.close();
    };
  }, [empresaId]);

  const handleSendMessage = () => {
    if (message.trim() !== '' && socket.current) {
      socket.current.send(message);
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
        <div className={styles.chatWindow}>
            <div className={styles.messageList}>
                {messages.map((msg, index) => (
                <div key={index} className={styles.message}>
                    {msg}
                </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className={styles.messageInput}
                />
                <button onClick={handleSendMessage} className={styles.sendButton}>
                Enviar
                </button>
            </div>
        </div>
    </div>
  );
};

export default ChatWindow;
