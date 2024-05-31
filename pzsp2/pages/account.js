import React, { useEffect, useState } from 'react';
import styles from '../styles/Account.module.css';
import Layout from '../components/Layout';

const Account = () => {
    const [userData, setUserData] = useState(null);
    const login = localStorage.getItem('login');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
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
                setUserData(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        if (login && token) {
            fetchUserData();
        }
    }, [login, token]);

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <Layout>
                <div className={styles.container}>
            <h1 className={styles.title}>Account Details</h1>
            <div className={styles.details}>
                <p><strong>Login:</strong> {userData.login}</p>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Surname:</strong> {userData.surname}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Balance:</strong> {userData.balance}</p>
                <p><strong>Admin:</strong> {userData.ifAdmin ? 'Yes' : 'No'}</p>
                <p><strong>Group ID:</strong> {userData.groupId}</p>
            </div>
        </div>
        </Layout>
    );
};

export default Account;
