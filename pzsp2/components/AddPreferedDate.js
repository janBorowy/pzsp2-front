import React, { useState } from 'react';

const AddPreferedDate = ({ list, setList }) => {
    const [date, setDate] = useState(''); 
    const [rating, setRating] = useState('');

    const handleDodaj = () => {
        if (date && rating && list.length < 3) {
            setList([...list, { date, rating }]);
            setDate(''); 
            setRating(''); 
        }
    };

    return (
        <div>
            {list.map((element, index) => (
                <div key={index}>
                    Termin: {element.date}, Cena: {element.rating}
                </div>
            ))}
            {list.length < 3 && (
                <div>
                    <select value={date} onChange={e => setDate(e.target.value)}>
                        <option value="">Wybierz termin</option>
                        <option value="środa 12-15">środa 12-15</option>
                        <option value="czwartek 12-18">czwartek 12-18</option>
                    </select>
                    <label htmlFor="rating">Wpisz cenę: </label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                    />
                    <button onClick={handleDodaj}>Dodaj</button>
                </div>
            )}
        </div>
    );
};

export default AddPreferedDate;
