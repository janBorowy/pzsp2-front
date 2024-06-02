import React, { useState } from 'react';
import styles from '../styles/WantOfferPanel.module.css';

const WantOfferPanel = ({ onClose, slot, optimizationProcess }) => {
    const [price, setPrice] = useState('');
    const [isWantOffer, setIsWantOffer] = useState(true);

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
                    ifWantOffer: isWantOffer,
                    optimizationProcessId: optimizationProcess.id
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
            <h2>Oferta Want</h2>
            <label>
                Cena:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <div className={styles.controls}>
                <button onClick={handleSubmit}>Zatwierdź</button>
                <label className={styles.switch}>
                    Oferta CanDown
                    <input
                        type="checkbox"
                        checked={!isWantOffer}
                        onChange={(e) => setIsWantOffer(!e.target.checked)} // Odwróć logikę
                    />
                </label>
            </div>
        </div>
    );
};

export default WantOfferPanel;
