import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import DodajOferteModal from '../components/AddOffer';
import styles from '../styles/Oferty.module.css';

const Oferty = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [offers, setOffers] = useState([]);
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
        const fetchOffers = async () => {
            if (!login || !token) return;

            try {
                const response = await fetch(`http://localhost:8080/tradeOffers/all/${login}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch offers');
                }

                const data = await response.json();
                console.log(data);
                setOffers(data);
            } catch (error) {
                console.error('Failed to fetch offers:', error);
            }
        };

        fetchOffers();
    }, [login, token]);

    const closeModal = () => setModalOpen(false);

    const handleNewOffer = (newOffer) => {
        setOffers([...offers, newOffer]);
        closeModal();
    };

    const handleDeleteOffer = async (offerId) => {
        if (!login || !token) return;

        try {
            const response = await fetch(`http://localhost:8080/tradeOffers/${offerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete offer');
            }

            setOffers(offers.filter(offer => offer.id !== offerId));
        } catch (error) {
            console.error('Failed to delete offer:', error);
        }
    };

    const renderOffersByStatus = (status) => {
        return offers
            .filter(offer => offer.status === status)
            .map(offer => (
                <div key={offer.id} className={styles.offerItem}>
                    {status === 'ACTIVE' && (
                        <button className={styles.deleteButton} onClick={() => handleDeleteOffer(offer.id)}>X</button>
                    )}
                    <h3>{offer.ifWantOffer ? 'Oferta Want' : 'Oferta Can'} {offer.id}</h3>
                    <p><strong>Data rozpoczęcia:</strong> {new Date(offer.timeSlot.startTime).toLocaleString()}</p>
                    <p><strong>Właściciel:</strong> {offer.userOwner.name} {offer.userOwner.surname}</p>
                    <p><strong>Timeslot ID:</strong> {offer.timeSlot.id}</p>
                    {status !== 'ACTIVE' && <p><strong>Cena:</strong> {offer.price} PLN</p>}
                </div>
            ));
    };

    return (
        <Layout>
            <div className={styles.ofertyHeader}>
                <h1 className={styles.title}>Oferty</h1>
            </div>
            {isModalOpen && <DodajOferteModal close={closeModal} submitOffer={handleNewOffer} />}
            <div className={styles.offersContainer}>
                <div className={styles.offersSection}>
                    <h2>Aktywne</h2>
                    <div className={styles.offersList}>
                        {renderOffersByStatus('ACTIVE')}
                    </div>
                </div>
                <div className={styles.offersSection}>
                    <h2>Zrealizowane Pozytywnie</h2>
                    <div className={styles.offersList}>
                        {renderOffersByStatus('POSITIVE_REALIZED')}
                    </div>
                </div>
                <div className={styles.offersSection}>
                    <h2>Zrealizowane Negatywnie</h2>
                    <div className={styles.offersList}>
                        {renderOffersByStatus('NEGATIVE_REALIZED')}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Oferty;
