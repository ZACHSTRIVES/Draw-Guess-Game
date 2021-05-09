import React from 'react';
import PublicRoomCard from './publicRoom';
import PrivateRoomCard from './privateRoom';
import './roomList.css';

export default function Public({ rooms, joinRoom, show }) {
  var publicRooms = []
  var privateRooms = []
  for (const [index, value] of rooms.entries()) {
    if (value.roomType === "Public") {
      publicRooms.push(value)
    } else if (value.roomType === "Private") {
      privateRooms.push(value)
    }
  }

  return (
    <div className="room-list">
      {show !== "Private" &&
        <ul>
          {publicRooms.map((room) =>
            <div onClick={() => joinRoom(room.roomID)}>
              <PublicRoomCard room={room}></PublicRoomCard>
            </div>
          )}
        </ul>
      }
      {show !== "Public" &&
        <ul>
          {privateRooms.map((room) =>
            <PrivateRoomCard room={room} joinRoom={joinRoom}></PrivateRoomCard>
          )}
        </ul>
      }
    </div>
  );
}