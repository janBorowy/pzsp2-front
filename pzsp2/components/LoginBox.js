import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Import useRouter
import styles from '../styles/LoginBox.module.css';

function LoginBox() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem('token', data.token);
      await router.push('/');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className={styles.loginBox}>
      <h2>Welcome</h2>
      <h3>Sign In</h3>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          className={styles.input}
          value={login}
          placeholder="Enter your User ID"
          onChange={(e) => setLogin(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={password}
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginBox;