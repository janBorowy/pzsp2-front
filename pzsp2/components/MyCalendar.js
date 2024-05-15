import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ onSelectSlot }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const hardcodedEvents = [
                {
                    id: 1,
                    title: "Adam, Eve, John",
                    start: "2024-05-15T09:00:00",
                    end: "2024-05-15T13:00:00",
                    participants: ['Adam', 'Eve', 'John']
                },
                {
                    id: 2,
                    title: "Alice, Bob",
                    start: "2024-05-12T09:00:00",
                    end: "2024-05-12T13:00:00",
                    participants: ['Alice', 'Bob']
                },
                {
                    id: 3,
                    title: "Clara, Dave",
                    start: "2024-05-13T08:00:00",
                    end: "2024-05-13T16:00:00",
                    participants: ['Clara', 'Dave']
                }
            ];

            const formattedEvents = hardcodedEvents.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
            }));
            setEvents(formattedEvents);
        };

        fetchEvents();
    }, []);

    const eventStyleGetter = (event) => {
        let style = {};
        if (event.participants && Array.isArray(event.participants) && event.participants.includes('Adam')) {
            style = {
                style: {
                    backgroundColor: 'green',
                    color: 'white',
                    borderRadius: '0px',
                    border: 'none'
                }
            };
        }
        return style;
    };

    const handleSelectEvent = event => {
        onSelectSlot(event);
        console.log('Event details:', event);
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: '100px' }}
                min={new Date().setHours(6, 0, 0)}
                max={new Date().setHours(22, 0, 0)}
                defaultView="week"
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
};

export default MyCalendar;
