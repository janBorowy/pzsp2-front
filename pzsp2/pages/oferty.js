import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import DodajOferteModal from '../components/AddOffer';
import styles from '../styles/Oferty.module.css';

const Oferty = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [offers, setOffers] = useState([]);
    const login = localStorage.getItem('login');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchOffers = async () => {
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
                setOffers(data);
            } catch (error) {
                console.error('Failed to fetch offers:', error);
            }
        };

        if (login && token) {
            fetchOffers();
        }
    }, [login, token]);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleNewOffer = (newOffer) => {
        setOffers([...offers, newOffer]);
        closeModal();
    };

    return (
        <Layout>
            <div className={styles.ofertyHeader}>
                <h1 className={styles.title}>Oferty</h1>
                {/* <button className={styles.button1} onClick={openModal}>Dodaj Ofertę</button>
                <button className={styles.button2}>Optymalizuj</button> */}
            </div>
            {isModalOpen && <DodajOferteModal close={closeModal} submitOffer={handleNewOffer} />}
            <div className={styles.offersList}>
                {offers.map((offer) => (
                    <div key={offer.id} className={styles.offerItem}>
                        <h3>{offer.ifWantOffer ? 'Oferta Want' : 'Oferta Can'} {offer.id}</h3>
                        <p><strong>Data rozpoczęcia:</strong> {new Date(offer.timeSlot.startTime).toLocaleString()}</p>
                        <p><strong>Właściciel:</strong> {offer.userOwner.name} {offer.userOwner.surname}</p>
                        <p><strong>Timeslot ID:</strong> {offer.timeSlot.id}</p>
                        <p><strong>Cena:</strong> {offer.price} PLN</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Oferty;
