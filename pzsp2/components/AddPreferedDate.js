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
                    Termin: {element.date}, Ocena: {element.rating}
                </div>
            ))}
            {list.length < 3 && (
                <div>
                    <select value={date} onChange={e => setDate(e.target.value)}>
                        <option value="">Wybierz termin</option>
                        <option value="środa">środa</option>
                        <option value="czwartek">czwartek</option>
                    </select>
                    <select value={rating} onChange={e => setRating(e.target.value)}>
                        <option value="">Wybierz ocenę</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button onClick={handleDodaj}>Dodaj</button>
                </div>
            )}
        </div>
    );
};

export default AddPreferedDate;
