import React, { useState } from 'react';
import ReactDOM from "react-dom";
import ChatWindow from "./ChatWindow.js";

import "./styles.css";

export default function Chat({ socket,userName,room}) {
    // const [messages, setMessage] = useState(room.messages);
    const [newMsg, setNewMsg] = useState("");

    function handleCompose(value) {
        setNewMsg(value)
    };

    function handleNewMessage() {
        if (newMsg != "") {
            const new_msg = { user: userName, type: 'msg', text: newMsg };
            // setMessage(updatedMessages)
            socket.emit("new_msg",new_msg)
            setNewMsg("")

        }

    }

    function onKeyup(e){
        if(e.keyCode === 13) {
            handleNewMessage()
        }
    }

    return (
        <div className="App">
            <ChatWindow messagesList={room.messages} />

            <div className="form-horizontal">
                <input
                    id="box"
                    placeholder="Type enter"
                    onChange={e => handleCompose(e.target.value)}
                    value={newMsg}
                    onKeyUp={onKeyup}
                />
                {/* <button onClick={handleNewMessage} class="btn btn-outline-secondary"> submit</button> */}
            </div>
        </div>
    );

}
