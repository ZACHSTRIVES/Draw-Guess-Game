import React from 'react';
import Game from './gameRoom';
import '../App.css';
import {
  Redirect, useLocation, useParams

} from "react-router-dom";

export default function GameExcessive({ socket, userName }) {
  let location = useLocation();
  const [loading, setLoading] = React.useState(true);
  const [roomInfo, setRoomInfo] = React.useState(null);
  const { id } = useParams();
  const [roomFull, setRoomFull] = React.useState(false);
  const [roomNull, setRoomNull] = React.useState(false);

  React.useEffect(() => {
    const data={roomID:id,userName:userName};
    socket.emit("getRoomInfo", data);
  }, []);

  React.useEffect(() => {
    socket.on('roomFull', () => {
      setRoomFull(true);
      setLoading(false);
    })

  }, []);


  React.useEffect(() => {
    socket.on('setRoomInfo', (data) => {
      if(data){
        setRoomInfo(data);
        setLoading(false);
      }else{
        setRoomNull(true);
        setLoading(false)

      }


    })
  }, []);


  return (
    <div>
      {(() => {
        if (userName === null) {  //如果没有登陆， 去登陆页面
          return <Redirect to="/login" />
        } else if (loading) {
          return (<div className="App main-background">
            loading...
          </div>)
        } else if (roomNull) {
          return (<div> 房间不存在...</div>)
        } else if (roomFull) {
          return (<div>房间已满。。。 </div>)
        } else {
          return(
          <Game socket={socket} userName={userName} init_room={roomInfo}></Game>)
        }

      })()}
    </div>
  )


}