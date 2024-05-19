import styles from '../styles/Navbar.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useRouter} from "next/router";

const Navbar = () => {
    const router = useRouter()
    const [currency, setCurrency] = useState(0);

    useEffect(() => {
        // Fetch the currency value from an API or set it to a hardcoded value for now
        const fetchCurrency = async () => {
            // Example fetch from an API
            // const response = await fetch('/api/currency');
            // const data = await response.json();
            // setCurrency(data.value);

            // Hardcoded value for demonstration
            setCurrency(100);
        };

        fetchCurrency();
    }, []);

    async function logOut(e) {
        localStorage.removeItem("token")
        await router.push("/login")
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <img src="/logo.jpg" alt="Home Icon" className={styles.icon} /> {/* Zakładam, że ikona jest dostępna lokalnie */}
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/oferty" className={styles.link}>Oferty</Link>
            </div>
            <div className={styles.right}>
                <div className={styles.currency}>
                    <img src="/money.png" alt="Money Icon" className={styles.moneyIcon} />
                    <span className={styles.currencyValue}>{currency}</span>
                </div>
                <button className={styles.button}>Konto</button>
                <button className={styles.button} onClick={logOut}>Wyloguj</button>
            </div>
        </nav>
    );
};

export default Navbar;
