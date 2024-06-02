import React from 'react';
import LoginBox from '../components/LoginBox';
import styles from '../styles/Login.module.css';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
        <LoginBox />
      </div>
      <div className={styles.branding}>
        Magnesia IT
      </div>
    </div>
  );
}
