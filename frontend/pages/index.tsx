// pages/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LoginForm.module.css';

const HomePage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
        <div className={styles.loginBox}>
            <h1 className={styles.title}>Bem Vindo!</h1>
            <button
                onClick={handleLoginRedirect}
                className={styles.button}
            >
                Fazer Login
            </button>
        </div>
    </div>
);
};

export default HomePage;
