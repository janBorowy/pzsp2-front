import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MyCalendar from '../components/MyCalendar';
import DragCalendar from '../components/DragCalendar';

const HomePage = () => {
    const localizer = momentLocalizer(moment);

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

    const DraggableCalendar = withDragAndDrop(Calendar);
    const [events, setEvents] = useState([
        {
            title: 'Adam',
            start: new Date(2024, 4, 10, 8, 0, 0),
            end: new Date(2024, 4, 10, 12, 0, 0),
            id: 0
        },
        // Tutaj możesz dodać więcej eventów
    ]);
    
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
    
    return (
        <Layout>
            <h1>Strona główna</h1>
            <p>Witaj na stronie głównej!</p>
            <div style={{ height: 800 }}>
                {/* <MyCalendar/> */}
                <DragCalendar/>

            </div>
        </Layout>
    );
};

export default HomePage;
