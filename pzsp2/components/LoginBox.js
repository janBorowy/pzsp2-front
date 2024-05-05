import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Import useRouter
import styles from '../styles/LoginBox.module.css';

function LoginBox() {
  const router = useRouter();  // Użycie hooka useRouter
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Logika logowania - tutaj umieść sprawdzenie danych logowania

    // Zakładając, że logowanie jest udane, przekieruj do strony głównej
    router.push('/');
  };

  return (
    <div className={styles.loginBox}>
      <h2>Welcome</h2>
      <h3>Sign In</h3>
      <form onSubmit={handleLogin}>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          className={styles.input}
          value={userId}
          placeholder="Enter your User ID"
          onChange={(e) => setUserId(e.target.value)}
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
