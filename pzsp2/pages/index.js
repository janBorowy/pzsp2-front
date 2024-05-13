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

    const [showConfirm, setShowConfirm] = useState(false); // Stan do pokazywania przycisku

    const handleSelectSlot = (event) => {
        console.log("Wybrano slot:", event);
        setShowConfirm(true);  // Pokaż przycisk po kliknięciu na slot
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8080/api/users`);
    //             const data = await response.json();
    //             console.log(data);
    //         } catch (error) {
    //             console.error('Failed to fetch data:', error);
    //         }
    //     };
        
    //     fetchData();
    // }, []);
    
    return (
        <Layout>
            <h1>Strona główna</h1>
            <p>Witaj na stronie głównej!</p>
            <div style={{ height: 800 }}>
                <MyCalendar onSelectSlot={handleSelectSlot} />
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
                {/* <DragCalendar/> */}

            </div>
        </Layout>
    );
};

export default HomePage;
