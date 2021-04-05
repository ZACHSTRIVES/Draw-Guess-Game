import React from 'react';
import styles from './room.css';



export default function Public({rooms}) {
    console.log(rooms)
    return (
        <ul>
            {rooms.map((room, index) => 
            <li key={index}>
                <div class={styles.topColumn}>
                    {room.name}
                </div>
                <div class={styles.topColumn}>
                    {room.number}
                </div>
                <div class={styles.subColumn}>
                    {room.player}
                </div>
            </li>)}
        </ul>
      );
    }