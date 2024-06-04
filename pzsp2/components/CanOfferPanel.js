import React, { useState } from 'react';
import styles from '../styles/CanOfferPanel.module.css';

const CanOfferPanel = ({ onClose, slot, optimizationProcess }) => {
    const [price, setPrice] = useState('');

    const handleSubmit = async () => {
        try {
            const login = localStorage.getItem('login');
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/tradeOffers/${login}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    price,
                    timeSlotId: slot.id,
                    ifWantOffer: false,
                    optimizationProcessId: optimizationProcess.id // Dodanie danych slotu do ciała żądania
                })
            });
            if (response.ok) {
                console.log('Offer submitted successfully');
                onClose();
            } else {
                console.error('Failed to submit offer');
                onClose();
            }
        } catch (error) {
            console.error('Error submitting offer:', error);
            onClose();
        }
    };

    return (
        <div className={styles.offer}>
            <button className={styles.close} onClick={onClose}>X</button>
            <h2>Oferta Can</h2>
            <label>
                Cena:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit}>Zatwierdź</button>
        </div>
    );
};

export default CanOfferPanel;
