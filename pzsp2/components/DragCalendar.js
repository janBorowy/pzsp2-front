import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import styles from '../styles/DragCalendar.module.css';
import OptimizerPanel from './OptimizerPanel';

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);

const DragCalendar = () => {
    const [events, setEvents] = useState([]);
    const [slotLength, setSlotLength] = useState(null);
    const [showOptimizerPanel, setShowOptimizerPanel] = useState(false);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        const login = localStorage.getItem('login');
        if (!login) {
            console.error('No login found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/schedules/${login}`);

            if (!response.ok) {
                throw new Error('Failed to fetch slots');
            }

            const data = await response.json();
            const formattedEvents = data.timeSlots.map(slot => ({
                id: slot.id,
                title: slot.users.map(user => user.login).join(', '),
                start: new Date(slot.startTime),
                end: new Date(new Date(slot.startTime).getTime() + slot.baseSlotQuantity * data.slotLength * 60000),
                baseSlotQuantity: slot.baseSlotQuantity,
                lastMarketPrice: slot.lastMarketPrice,
                login: slot.users.map(user => user.login).join(', '),
                scheduleId: slot.scheduleId
            }));
            setSlotLength(data.slotLength);
            setEvents(formattedEvents);
            console.log('Slots fetched:', formattedEvents);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && slotLength !== null) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const jsonEvents = JSON.parse(content);
                const formattedEvents = jsonEvents.map(event => ({
                    id: event.id,
                    // title: event.userLogin,
                    title: event.users.map(user => user.userName).join(', '),
                    start: new Date(event.startTime),
                    end: new Date(new Date(event.startTime).getTime() + event.baseSlotQuantity * slotLength * 60000),
                    lastMarketPrice: event.lastMarketPrice,
                    // userLogin: event.userLogin,
                    users: event.users,
                    scheduleId: event.scheduleId
                }));
                setEvents(formattedEvents);
            };
            reader.readAsText(file);
        }
    };

    const handleButtonClick = () => {
        const slotLengthInput = prompt("Podaj długość slotu (w minutach):");
        const parsedSlotLength = parseInt(slotLengthInput, 10);
        if (!isNaN(parsedSlotLength)) {
            setSlotLength(parsedSlotLength);
            document.getElementById('fileInput').click();
        } else {
            alert("Proszę podać prawidłową liczbę.");
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
            baseSlotQuantity: (event.end.getTime() - event.start.getTime()) / (slotLength * 60000),
            lastMarketPrice: event.lastMarketPrice,
            numberOfUsers: 0, //event.users.length,
            isUserSlot: true,
            users: event.users,
            scheduleId: event.scheduleId
        }));

        try {
            console.log(eventsToSend);
            const response = await fetch('http://localhost:8080/timeslots/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventsToSend)
            });
            if (!response.ok) {
                throw new Error('Failed to send schedule');
            }
            const data = await response.json();
            console.log('Schedule sent to backend:', data);

            if (data.length > 0 && data[0].scheduleId) {
                const scheduleId = data[0].scheduleId;
                await updateScheduleLength(scheduleId, slotLength, token);
            }
        } catch (error) {
            console.error('Error sending schedule to backend:', error);
        }
    };

    const updateScheduleLength = async (scheduleId, slotLength, token) => {
        try {
            const response = await fetch(`http://localhost:8080/schedules`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: scheduleId,
                    slotLength: slotLength
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update schedule length');
            }
            const data = await response.json();
            console.log('Schedule length updated:', data);
        } catch (error) {
            console.error('Error updating schedule length:', error);
        }
    };

    const onEventDrop = ({ event, start, end }) => {
        const updatedEvent = { ...event, start, end };
        setEvents(prevEvents =>
            prevEvents.map(evt => evt.id === event.id ? updatedEvent : evt)
        );
    };

    const eventPropGetter = (event) => {
        return {
            style: {
                backgroundColor: '#4CAF50',
            },
        };
    };

    const handleOptimizerSubmit = async (data) => {
        // Implement the logic to handle form submission and make a POST request
        const login = localStorage.getItem('login');
        if (!login) {
            console.error('No login found');
            return;
        }
        console.log("Submitted data:", data);
        try {
            const response = await fetch(`http://localhost:8080/optimizationProcess/${login}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Failed to submit optimizer data');
            }
            const result = await response.json();
            console.log('Optimizer data submitted:', result);
        } catch (error) {
            console.error('Error submitting optimizer data:', error);
        }
    };

    return (
        <div>
            <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button className={styles.button} onClick={handleButtonClick}>Wstaw grafik</button>
            <button className={styles.button} onClick={sendScheduleToBackend}>Zatwierdź grafik</button>
            <button className={styles.button} onClick={() => setShowOptimizerPanel(true)}>Ustaw optymalizator</button>
            <DraggableCalendar
                localizer={localizer}
                events={events}
                onEventDrop={onEventDrop}
                draggableAccessor={() => true}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventPropGetter}
                style={{ margin: '100px' }}
                min={new Date().setHours(6, 0, 0)}
                max={new Date().setHours(22, 0, 0)}
                defaultView="week"
            />
            {showOptimizerPanel && (
                <OptimizerPanel
                    onSubmit={handleOptimizerSubmit}
                    onClose={() => setShowOptimizerPanel(false)}
                />
            )}
        </div>
    );
};

export default DragCalendar;
