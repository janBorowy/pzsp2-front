import React, { useState } from 'react';
import Layout from '../components/Layout';
import DodajOferteModal from '../components/AddOffer';
import styles from '../styles/Oferty.module.css';

const Oferty = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [offers, setOffers] = useState([]);

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
                <button className={styles.button1} onClick={openModal}>Dodaj Ofertę</button>
                <button className={styles.button2}>Optymalizuj</button>
            </div>
            {isModalOpen && <DodajOferteModal close={closeModal} submitOffer={handleNewOffer} />}
            <div className={styles.offersList}>
                {offers.map((offer, index) => (
                    <div key={index}>
                        <h3>Moje terminy do oddania:</h3>
                        <p>{offer.myDate}</p>
                        <h4>Preferowane terminy:</h4>
                        {offer.preferredDates.map((date, idx) => (
                            <p key={idx}>Termin: {date.date}, Ocena: {date.rating}</p>
                        ))}
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Oferty;
