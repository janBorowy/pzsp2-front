import React, { useState } from 'react';
import styles from '../styles/WantOfferPanel.module.css';

const WantOfferPanel = ({ onClose }) => {
    const [price, setPrice] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/offer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ price })
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
            <h2>Oferta want</h2>
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

export default WantOfferPanel;
