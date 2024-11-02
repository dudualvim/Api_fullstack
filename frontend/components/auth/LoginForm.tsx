import React, { useState } from 'react';
import { useAuth } from '../../utils/authProvider';
import styles from '../../styles/LoginForm.module.css';

const LoginForm = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
      
        try {
          await login(email, password);
        } catch (error: any) {
          console.error('Login error:', error);
          setError(
            error.response?.data?.detail || 
            error.message || 
            'Falha no login. Verifique suas credenciais.'
          );
        } finally {
          setIsLoading(false);
        }
      };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>Login</h2>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;