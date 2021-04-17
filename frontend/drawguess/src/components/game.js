import React from 'react';
import Game from './gameRoom';
import {
    Redirect,useLocation
  
  } from "react-router-dom";

  export default function GameExcessive({socket,userName}){
    let location = useLocation();
    const [roomInfo, setRoomInfo] = React.useState(location.query)

    return(
        <div>
        {roomInfo===null?<h1>我是一个加载动画...</h1>:<Game socket={socket} userName={userName} init_room={roomInfo}></Game>}
        </div>
        )

  }