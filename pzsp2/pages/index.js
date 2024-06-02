import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import MyCalendar from '../components/MyCalendar';
import WantOfferPanel from '../components/WantOfferPanel';
import CanOfferPanel from '../components/CanOfferPanel';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DragCalendar from '../components/DragCalendar';
import {useRouter} from "next/router";
import styles from "../styles/index.module.css";

const HomePage = () => {
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [optimizationProcess, setOptimizationProcess] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const login = localStorage.getItem('login');
            setIsAdmin(localStorage.getItem('isAdmin') === 'true');
            console.log(isAdmin);
            if (!token) {
                await router.push("/notLoggedInPage");
                return;
            }

            try {
                console.log('Fetching data...');
                const response = await fetch(`http://localhost:8080/optimizationProcess/nearest/${login}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log('Data fetched:', data);
                setOptimizationProcess(data);
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
        setSelectedSlot(event);
        setShowConfirm(true);
    };

    const handleOfferClose = () => {
        setShowConfirm(false);
        setSelectedSlot(null);
    };

    return (
        <Layout>
            <div className={styles.ofertyHeader}>
                <h1 className={styles.title}>Grafik</h1>
            </div>
            {optimizationProcess && (
                <div className={styles.offerDeadline}>
                    <p className={styles.offerDeadlineText}>Zbieranie ofert do: {new Date(optimizationProcess.offerAcceptanceDeadline).toLocaleString()}</p>
                </div>
            )}
            <div style={{ height: 800, marginBottom: 100}}>
                {isAdmin === true ? (
                    <DragCalendar
                        events={events}
                        onSelectSlot={handleSelectSlot}
                        onEventDrop={onEventDrop}
                        onEventResize={onEventResize}
                        optimizationProcess={optimizationProcess}
                    />
                ) : (
                    <MyCalendar
                        events={events}
                        onSelectSlot={handleSelectSlot}
                        onEventDrop={onEventDrop}
                        onEventResize={onEventResize}
                    />
                )}
                {showConfirm && selectedSlot && optimizationProcess && (
                    selectedSlot.isUserSlot ? (
                        <WantOfferPanel 
                            onClose={handleOfferClose} 
                            slot={selectedSlot}
                            optimizationProcess={optimizationProcess}
                        />
                    ) : (
                        <CanOfferPanel
                            onClose={handleOfferClose}
                            slot={selectedSlot}
                            optimizationProcess={optimizationProcess}
                        />
                    )
                )}
            </div>
        </Layout>
    );
};

export default HomePage;
