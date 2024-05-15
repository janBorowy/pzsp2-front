import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MyCalendar from '../components/MyCalendar';
import DragCalendar from '../components/DragCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const HomePage = () => {
    const [events, setEvents] = useState([
        {
            title: 'Adam',
            start: new Date(2024, 4, 10, 8, 0, 0),
            end: new Date(2024, 4, 10, 12, 0, 0),
            id: 0
        },
        // Tutaj możesz dodać więcej eventów
    ]);
    const [showConfirm, setShowConfirm] = useState(false); // Stan do pokazywania przycisku

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users`);
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        
        fetchData();
    }, []);

    const onEventResize = (data) => {
        const { event, start, end } = data;
        const updatedEvents = events.map(existingEvent => 
            existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
        );
        setEvents(updatedEvents);
    };
    
    const onEventDrop = (data) => {
        const { event, start, end } = data;
        const updatedEvents = events.map(existingEvent => 
            existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
        );
        setEvents(updatedEvents);
    };

    const handleSelectSlot = (event) => {
        console.log("Wybrano slot:", event);
        setShowConfirm(true);  // Pokaż przycisk po kliknięciu na slot
    };

    return (
        <Layout>
            <h1>Strona główna</h1>
            <p>Witaj na stronie głównej!</p>
            <div style={{ height: 800 }}>
                <DragCalendar onSelectSlot={handleSelectSlot} />
                {showConfirm && (
                    <button style={{
                        position: 'fixed',
                        right: '20px',
                        bottom: '20px',
                        padding: '10px 20px',
                        zIndex: 1000,
                        cursor: 'pointer'
                    }}>Zatwierdź</button>
                )}
            </div>
        </Layout>
    );
};

export default HomePage;
