import React from 'react';
import PublicRoomCard from './publicRoom';
import PrivateRoomCard from './privateRoom';



export default function Public({rooms,joinRoom}) {
    var publicRooms=[]
    var privateRooms=[]
    for(const [index, value] of rooms.entries()){
      if(value.roomType==="Public"){
        publicRooms.push(value)
      }else if(value.roomType==="Private"){
        privateRooms.push(value)
      }
    }

    return (
        <div>
          <div className="room_title">Public Rooms</div>
        <ul>
            {publicRooms.map((room) => 
            <div onClick={() => joinRoom(room.roomID)}>
             <PublicRoomCard room={room}></PublicRoomCard>
             </div>
            )}
        </ul>

        <div className="room_title">Private Rooms</div>
        <ul>
            {privateRooms.map((room) => 
            <PrivateRoomCard room={room} joinRoom={joinRoom}></PrivateRoomCard>
            
             
            )}
        </ul>
        </div>
        
        

        
      );
    }