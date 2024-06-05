import styles from '../styles/Navbar.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();
    const [currency, setCurrency] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchCurrency = async () => {
            const login = localStorage.getItem('login');
            const token = localStorage.getItem('token');
            
            if (!login || !token) {
                console.error('Login or token not found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/users/${login}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setCurrency(data.balance);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchCurrency();

        const checkAdmin = () => {
            const isAdminValue = localStorage.getItem("isAdmin") === 'true';
            setIsAdmin(isAdminValue);
        };

        checkAdmin();
    }, []);

    const logOut = async (e) => {
        localStorage.removeItem("token");
        await router.push("/login");
    };

    const goToAccount = () => {
        router.push('/account');
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <img src="/logo.jpg" alt="Home Icon" className={styles.icon} />
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/oferty" className={styles.link}>Oferty</Link>
                {/* <Link href="/wymiany" className={styles.link}>Wymiany</Link> */}
            </div>
            <div className={styles.right}>
                {!isAdmin && (
                    <div className={styles.currency}>
                        <img src="/money.png" alt="Money Icon" className={styles.moneyIcon} />
                        <span className={styles.currencyValue}>{currency} PLN</span>
                    </div>
                )}
                <button className={styles.button} onClick={goToAccount}>Konto</button>
                <button className={styles.button} onClick={logOut}>Wyloguj</button>
            </div>
        </nav>
    );
};

export default Navbar;
