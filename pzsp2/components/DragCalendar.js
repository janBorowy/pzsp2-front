import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);

const DragCalendar = () => {
    const [events, setEvents] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const jsonEvents = JSON.parse(content);
                const formattedEvents = jsonEvents.map(event => ({
                    id: event.id,
                    title: event.userLogin,
                    start: new Date(event.startTime),
                    end: new Date(new Date(event.startTime).getTime() + event.baseSlotQuantity * 60000),
                    lastMarketPrice: event.lastMarketPrice,
                    userLogin: event.userLogin,
                    scheduleId: event.scheduleId
                }));
                setEvents(formattedEvents);
            };
            reader.readAsText(file);
        }
    };

    const sendScheduleToBackend = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const eventsToSend = events.map(event => ({
            id: 0,
            startTime: event.start.toISOString(),
            baseSlotQuantity: (event.end.getTime() - event.start.getTime()) / 60000,
            lastMarketPrice: 0,
            userLogin: event.userLogin,
            scheduleId: 0
        }));

        try {
            console.log(eventsToSend);
            const response = await fetch('http://localhost:8080/timeslots/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Dodanie tokena do nagłówka
                },
                body: JSON.stringify(eventsToSend) // Konwersja obiektu do JSON string bez pól 'title' i 'end'
            });
            if (!response.ok) {
                throw new Error('Failed to send schedule');
            }
            const data = await response.json();
            console.log('Schedule sent to backend:', data);
        } catch (error) {
            console.error('Error sending schedule to backend:', error);
        }
    };

    const onEventDrop = ({ event, start, end }) => {
        const updatedEvent = { ...event, start, end };
        setEvents(events.map(evt => evt.id === event.id ? updatedEvent : evt));
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={sendScheduleToBackend}>Zatwierdź grafik</button>
            <DraggableCalendar
                localizer={localizer}
                events={events}
                onEventDrop={onEventDrop}
                resizable
                startAccessor="start"
                endAccessor="end"
                style={{ margin: '100px' }}
                min={new Date().setHours(6, 0, 0)}
                max={new Date().setHours(22, 0, 0)}
                defaultView="week"
            />
        </div>
    );
};

export default DragCalendar;
