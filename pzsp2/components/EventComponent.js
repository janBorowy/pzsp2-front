import React from 'react';
import styles from '../styles/EventComponent.module.css';

const EventComponent = ({ event }) => (
  <div className={styles.eventContainer}>
    <div className={styles.eventTitle}>{event.title}</div>
    {event.lastMarketPrice !== 0 && (
      <div className={styles.eventPrice}>Cena: {event.lastMarketPrice}</div>
    )}
  </div>
);

export default EventComponent;
