import styles from '../styles/Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <img src="/icon.png" alt="Home Icon" className={styles.icon} /> {/* Zakładam, że ikona jest dostępna lokalnie */}
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/oferty" className={styles.link}>Oferty</Link>
            </div>
            <div className={styles.right}>
                <button className={styles.button}>Konto</button>
            </div>
        </nav>
    );
};

export default Navbar;
