import React, { useState } from 'react';
import ChatWindow from "./ChatWindow.js";

import "./styles.css";

import useSound from 'use-sound';

import sendSfx from '../sounds/send.wav';

export default function Chat({ socket, userName, room }) {
  const [newMsg, setNewMsg] = useState("");
  const [send] = useSound(sendSfx);

  function handleCompose(value) {
    setNewMsg(value)
  };

  function handleNewMessage() {
    send();
    if (newMsg !== "") {
      socket.emit("new_msg", newMsg)
      setNewMsg("")
    }
  }

  function onKeyup(e) {
    if (e.keyCode === 13) {
      handleNewMessage(newMsg)
    }
  }

  return (
    <div className="chat-box">
      <ChatWindow messagesList={room.messages} />
      <div className="chat-composer">
        <input
          className="form-control"
          placeholder="Type & hit enter"
          onChange={e => handleCompose(e.target.value)}
          value={newMsg}
          onKeyUp={onKeyup}
        />
      </div>
    </div>
  );
}

