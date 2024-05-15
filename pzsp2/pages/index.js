import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MyCalendar from '../components/MyCalendar';
import WantOfferPanel from '../components/WantOfferPanel';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from '../styles/WantOfferPanel.module.css';
import DragCalendar from '../components/DragCalendar';

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
                const response = await fetch('http://localhost:8080/api/users');
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

    const handleOfferClose = () => {
        setShowConfirm(false);
    };

    return (
        <Layout>
            <h1>Strona główna</h1>
            <p>Witaj na stronie głównej!</p>
            <div style={{ height: 800 }}>
                <MyCalendar onSelectSlot={handleSelectSlot} />
                {showConfirm && (
                    <WantOfferPanel onClose={handleOfferClose} />
                )}
            </div>
            <DragCalendar />
        </Layout>
    );
};

export default HomePage;
