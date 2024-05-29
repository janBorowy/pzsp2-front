// OptimizerPanel.js
import React, { useState } from 'react';
import styles from '../styles/OptimizerPanel.module.css';

const OptimizerPanel = ({ onSubmit, onClose }) => {
    const [offerAcceptanceDeadline, setOfferAcceptanceDeadline] = useState('');
    const [optimizationTime, setOptimizationTime] = useState('');

    const handleSubmit = async () => {
        const formattedOfferAcceptanceDeadline = new Date(offerAcceptanceDeadline).toISOString();
        const formattedOptimizationTime = new Date(optimizationTime).toISOString();
        const data = { offerAcceptanceDeadline: formattedOfferAcceptanceDeadline, optimizationTime: formattedOptimizationTime };
        await onSubmit(data);
        onClose();
    };

    return (
        <div className={styles.panel}>
            <div className={styles.panelContent}>
                <label>
                    Deadline zbierania ofert:
                    <input type="datetime-local" value={offerAcceptanceDeadline} onChange={(e) => setOfferAcceptanceDeadline(e.target.value)} />
                </label>
                <label>
                    Data optymalizacji:
                    <input type="datetime-local" value={optimizationTime} onChange={(e) => setOptimizationTime(e.target.value)} />
                </label>
                <button className={styles.button} onClick={handleSubmit}>Zatwierdź</button>
                <button className={styles.button} onClick={onClose}>Zamknij</button>
            </div>
        </div>
    );
};

export default OptimizerPanel;
