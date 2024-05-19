import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MyCalendar from '../components/MyCalendar';
import WantOfferPanel from '../components/WantOfferPanel';
import CanOfferPanel from '../components/CanOfferPanel';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from '../styles/WantOfferPanel.module.css';
import DragCalendar from '../components/DragCalendar';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [role, setRole] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userRole = localStorage.getItem('role'); // Pobieramy rolę użytkownika z localStorage

            setRole(userRole); // Ustawiamy rolę w stanie

            try {
              console.log('Fetching data...');
                const response = await fetch('http://localhost:8080/schedules/admin', {
                    // headers: {
                    //     'Authorization': `Bearer ${token}`
                    // }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log('Data fetched:', data);
                setEvents(data.events);
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
        setSelectedSlot(event); // Ustawienie wybranego slotu
        setShowConfirm(true);
    };

    const handleOfferClose = () => {
        setShowConfirm(false);
        setSelectedSlot(null); // Czyszczenie wybranego slotu przy zamykaniu
    };

    return (
        <Layout>
            {/* <h1>Strona główna</h1>
            <p>Witaj na stronie głównej!</p> */}
            <div style={{ height: 800 }}>
                {role === 'admin' ? (
                    <DragCalendar
                        events={events}
                        onSelectSlot={handleSelectSlot}
                        onEventDrop={onEventDrop}
                        onEventResize={onEventResize}
                    />
                ) : (
                    <MyCalendar
                        events={events}
                        onSelectSlot={handleSelectSlot}
                        onEventDrop={onEventDrop}
                        onEventResize={onEventResize}
                    />
                )}
                {showConfirm && selectedSlot && (
                    selectedSlot.isUserSlot ? (
                        <WantOfferPanel 
                            onClose={handleOfferClose} 
                            slot={selectedSlot}
                        />
                    ) : (
                        <CanOfferPanel
                            onClose={handleOfferClose}
                            slot={selectedSlot}
                        />
                    )
                )}
            </div>
        </Layout>
    );
};

export default HomePage;
