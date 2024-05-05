// pages/index.js
import React, { useState } from 'react';
import Layout from '../components/Layout';
import DodajOferteModal from '../components/AddOffer';
import styles from '../styles/Oferty.module.css';

const Oferty = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <Layout>
            <div className={styles.ofertyHeader}>
                <h1 className={styles.title}>Oferty</h1>
                <button className={styles.button1} onClick={openModal}>Dodaj Ofertę</button>
                <button className={styles.button2}>Optymalizuj</button>
            </div>
            {isModalOpen && <DodajOferteModal close={closeModal} />}
        </Layout>
    );
};

export default Oferty;
