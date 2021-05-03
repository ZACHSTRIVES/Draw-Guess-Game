import React from 'react';
import Game from './gameRoom';
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
    socket.emit("getRoomInfo", id)
  }, []);

  React.useEffect(() => {
    socket.on('roomFull', () => {
      setRoomFull(true)
      setLoading(false)
    })

  }, []);


  React.useEffect(() => {
    socket.on('setRoomInfo', (data) => {

      if (data) {
        var flag = false
        data.scoreBoard.forEach(item => {
          if (userName === item.userName) {
            console.log("35")
            flag = true // 对象里的唯一标识id
          }

        })
        if (flag === false) {
          socket.emit("joinRoomViaURL", data.roomID)
          console.log("45")
        } else{
          setRoomInfo(data)
          setLoading(false)
        }

      } else {
        setRoomNull(true)
        setLoading(false)
        console.log("51")
      }

    })
  }, []);


  return (
    <div>
      {(() => {
        if (userName === null) {  //如果没有登陆， 去登陆页面
          return <Redirect to="/login" />
        } else if (loading) {
          return (<div className="App game-room">
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