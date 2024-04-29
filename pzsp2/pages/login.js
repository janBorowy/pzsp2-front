import React from 'react';
import LoginBox from '../components/LoginBox';
import Image from 'next/image'; // Importuj komponent Image z Next.js
import styles from '../styles/Login.module.css'; // Importuj stworzony plik CSS

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
        <LoginBox />
      </div>
      <div className={styles.rightSide}>
        {/* Tutaj można wstawić obrazek, na przykład z lokalnych zasobów lub z URL */}
        {/* <Image src="/a.png" alt="Image description" width={300} height={200} layout="responsive" /> */}
      </div>
      <div className={styles.branding}>
        Magnesia IT
      </div>
    </div>
  );
}
