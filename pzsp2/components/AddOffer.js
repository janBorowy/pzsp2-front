import React, { useState } from 'react';
import styles from '../styles/AddOffer.module.css';
import AddPreferedDate from './AddPreferedDate';

const AddOffer = ({ close, submitOffer }) => {
    const [myDate, setMyDate] = useState('');
    const [list, setList] = useState([]);

    const handleSubmit = () => {
        const offerData = {
            myDate,
            preferredDates: list
        };
        submitOffer(offerData);
        close();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Termin, który chcesz oddać</h2>
                <select value={myDate} className={styles.select} onChange={e => setMyDate(e.target.value)}>
                    <option value="">Wybierz termin</option>
                    <option value="środa 12-15">środa 12-15</option>
                    <option value="czwartek 12-15">czwartek 12-15</option>
                </select>
                <h2>Terminy, które możesz wziąć</h2>
                <AddPreferedDate list={list} setList={setList} />
                <button onClick={handleSubmit} className={styles.closeButton}>Zatwierdź</button>
            </div>
        </div>
    );
};

export default AddOffer;
