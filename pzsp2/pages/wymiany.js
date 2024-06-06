import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Wymiany.module.css';

const Wymiany = () => {
    const [trades, setTrades] = useState([]);
    const [login, setLogin] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchCredentials = () => {
            const login = localStorage.getItem('login');
            const token = localStorage.getItem('token');
            setLogin(login);
            setToken(token);
        };

        fetchCredentials();
    }, []);

    useEffect(() => {
        const fetchTrades = async () => {
            if (!login || !token) return;

            try {
                const response = await fetch(`http://localhost:8080/trade/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch trades');
                }

                const data = await response.json();
                console.log(data);
                const tradeDetails = await Promise.all(data.map(async trade => {
                    const buyerResponse = await fetch(`http://localhost:8080/tradeoffers/${trade.buyer_offer_id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const buyerData = await buyerResponse.json();

                    const sellerResponse = await fetch(`http://localhost:8080/tradeoffers/${trade.seller_offer_id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const sellerData = await sellerResponse.json();

                    return { ...trade, buyerOffer: buyerData, sellerOffer: sellerData };
                }));

                setTrades(tradeDetails);
            } catch (error) {
                console.error('Failed to fetch trades:', error);
            }
        };

        fetchTrades();
    }, [login, token]);

    const renderTradeDetails = (trade) => (
        <div key={trade.id} className={styles.tradeItem}>
            <h3>Trade ID: {trade.id}</h3>
            <p><strong>Final Price:</strong> {trade.final_price} PLN</p>
            <p><strong>Timestamp:</strong> {new Date(trade.timestamp).toLocaleString()}</p>
            <div>
                <h4>Buyer Offer</h4>
                <p><strong>Offer ID:</strong> {trade.buyerOffer.id}</p>
                <p><strong>Owner:</strong> {trade.buyerOffer.userOwner.name} {trade.buyerOffer.userOwner.surname}</p>
                <p><strong>Price:</strong> {trade.buyerOffer.price} PLN</p>
            </div>
            <div>
                <h4>Seller Offer</h4>
                <p><strong>Offer ID:</strong> {trade.sellerOffer.id}</p>
                <p><strong>Owner:</strong> {trade.sellerOffer.userOwner.name} {trade.sellerOffer.userOwner.surname}</p>
                <p><strong>Price:</strong> {trade.sellerOffer.price} PLN</p>
            </div>
        </div>
    );

    return (
        <Layout>
            <div className={styles.tradesHeader}>
                <h1 className={styles.title}>Wymiany</h1>
            </div>
            <div className={styles.tradesContainer}>
                <div className={styles.tradesList}>
                    {trades.map(renderTradeDetails)}
                </div>
            </div>
        </Layout>
    );
};

export default Wymiany;
