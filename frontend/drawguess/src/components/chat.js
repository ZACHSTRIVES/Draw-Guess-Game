import React, { useState } from 'react';
import ReactDOM from "react-dom";
import ChatWindow from "./ChatWindow.js";

import "./styles.css";

import useSound from 'use-sound';

//import ClickonSfx from '../../../sounds/Clickon.wav';
import sendSfx from '../sounds/send.wav';



export default function Chat({ socket,userName,room}) {
    // const [messages, setMessage] = useState(room.messages);
    const [newMsg, setNewMsg] = useState("");

    
    const [send] = useSound(sendSfx);


    function handleCompose(value) {
        setNewMsg(value)
     
    };

    function handleNewMessage() {
        if (newMsg != "") {
            socket.emit("new_msg",newMsg)
            setNewMsg("")
        }
        send();

    }

    return (
        <div className="App">
            <ChatWindow messagesList={room.messages} />

            <div className="chat-composer">

                <input
                    className="form-control"
                    placeholder="Type & hit enter"
                    onChange={e => handleCompose(e.target.value)}
                    value={newMsg}
                />
                <button onClick={handleNewMessage}> submit</button>

            </div>
        </div>
    );

}
