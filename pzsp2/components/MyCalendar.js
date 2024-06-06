import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventComponent from './EventComponent'; 

const localizer = momentLocalizer(moment);

const MyCalendar = ({ onSelectSlot }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const login = localStorage.getItem('login');
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8080/schedules/${login}`,  {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                const formattedEvents = data.timeSlots.map(slot => {
                    let title;
                    if (slot.isUserSlot) {
                        if (slot.numberOfUsers === 1) {
                            title = login;
                        }
                        else {
                            if (slot.numberOfUsers === 2) {
                            title = `${login} + ${slot.numberOfUsers - 1} osoba`;}
                            else {
                                title = `${login} + ${slot.numberOfUsers - 1} osoby`;
                            }
                        }
                    } else {
                        title = slot.numberOfUsers === 1 ? `${slot.numberOfUsers} osoba` : `${slot.numberOfUsers} osoby`;
                    }

                    return {
                        id: slot.id,
                        title: title,
                        start: new Date(slot.startTime),
                        end: new Date(new Date(slot.startTime).getTime() + slot.baseSlotQuantity * data.slotLength * 60000),
                        baseSlotQuantity: slot.baseSlotQuantity,
                        lastMarketPrice: slot.lastMarketPrice,
                        userLogin: slot.users.map(user => user.login).join(', '),
                        numberOfUsers: slot.numberOfUsers,
                        scheduleId: slot.scheduleId,
                        isUserSlot: slot.isUserSlot
                    };
                });
                console.log(data);
                console.log('Events fetched:', formattedEvents);
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const eventStyleGetter = (event) => {
        let backgroundColor = event.isUserSlot ? '#4CAF50' : 'gray';
        let color = 'white';
        let border = event.isUserSlot ? '2px solid #388E3C' : '2px solid #616161'; // Zielone dla użytkownika, szare dla innych
        return {
            style: {
                backgroundColor: backgroundColor,
                color: color,
                border: border,
                borderRadius: '5px',
                padding: '2px'
            }
        };
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
                style={{ margin: '50px' }}
                min={new Date().setHours(6, 0, 0)}
                max={new Date().setHours(22, 0, 0)}
                views={{ month: false, week: true, day: true, agenda: true }}
                defaultView="week"
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: EventComponent
                }}
            />
        </div>
    );
};

export default MyCalendar;
