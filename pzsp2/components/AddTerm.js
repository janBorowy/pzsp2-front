import React, { useState } from 'react';

const TerminyIOceny = () => {
    const [lista, setLista] = useState([]); // Lista przechowująca pary terminów i ocen
    const [termin, setTermin] = useState(''); // Aktualnie wprowadzany termin
    const [ocena, setOcena] = useState(''); // Aktualnie wybrana ocena

    const handleDodaj = () => {
        if (termin && ocena) {
            setLista([...lista, { termin, ocena }]);
            setTermin(''); // Resetowanie stanu terminu
            setOcena(''); // Resetowanie stanu oceny
        }
    };

    return (
        <div>
            {lista.map((element, index) => (
                <div key={index}>
                    Termin: {element.termin}, Ocena: {element.ocena}
                </div>
            ))}
            <div>
                <input
                    type="text"
                    placeholder="Wpisz termin"
                    value={termin}
                    onChange={e => setTermin(e.target.value)}
                />
                <select value={ocena} onChange={e => setOcena(e.target.value)}>
                    <option value="">Wybierz ocenę</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button onClick={handleDodaj}>Dodaj</button>
            </div>
        </div>
    );
};

export default TerminyIOceny;
