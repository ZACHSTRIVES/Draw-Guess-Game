import React from 'react';
import Game from './gameRoom';
import '../App.css';
import PromptPage from './PromptPage/PromptPage';
import {
  Redirect, useParams

} from "react-router-dom";

export default function GameExcessive({ socket, userName }) {
  const [loading, setLoading] = React.useState(true);
  const [roomInfo, setRoomInfo] = React.useState(null);
  const { id } = useParams();
  const [roomFull, setRoomFull] = React.useState(false);
  const [roomNull, setRoomNull] = React.useState(false);

  React.useEffect(() => {
    const data = { roomID: id, userName: userName };
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
      if (data) {
        setRoomInfo(data);
        setLoading(false);
      } else {
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
            <PromptPage></PromptPage>
          </div>)
        } else if (roomNull) {
          return (
            <div className="App">
              <header className="App-header main-background">
                <PromptPage info={"Room does not exist!"}></PromptPage>
              </header>
            </div>
          )
        } else if (roomFull) {
          return (
            <div className="App">
              <header className="App-header main-background">
                <PromptPage info={"The room is full!"}></PromptPage>
              </header>
            </div>

          )
        } else {
          return (
            <Game socket={socket} userName={userName} init_room={roomInfo}></Game>)
        }
      })()}
    </div>
  )


}