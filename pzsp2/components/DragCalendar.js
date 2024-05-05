import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);

const DragCalendar = () => {
    const [events, setEvents] = useState([]);

    const DraggableCalendar = withDragAndDrop(Calendar);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const jsonEvents = JSON.parse(content);
                const formattedEvents = jsonEvents.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end)
                }));
                setEvents(formattedEvents);
            };
            reader.readAsText(file);
        }
    };

    const onEventDrop = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        const idx = events.indexOf(event);
        const updatedEvent = { ...event, start, end };

        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        setEvents(nextEvents);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
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
