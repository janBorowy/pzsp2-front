// components/AddOffer.js
import React from 'react';
import styles from '../styles/AddOffer.module.css'; // załóżmy, że masz już odpowiednie style CSS
import AddTerm from './AddTerm';

const AddOffer = ({ close }) => {

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Termin, który chcesz oddać</h2>
                <select className={styles.select}>
                    <option>Wybierz termin</option>
                    {123}
                </select>
                <h2>Terminy, które możesz wziąć</h2>
                {/* <form className={styles.form}>
                    <input type="date" className={styles.input} />
                    <input type="number" className={styles.input} min="1" max="5" placeholder="Ocena" />
                    <button type="button" className={styles.addButton}>Dodaj termin</button>
                </form> */}
                <AddTerm/>
                <button onClick={close} className={styles.closeButton}>Zatwierdź</button>
            </div>
        </div>
    );
};

export default AddOffer;
