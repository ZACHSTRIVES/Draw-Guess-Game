import React, { useState } from 'react';
import ReactDOM from "react-dom";
import ChatWindow from "./ChatWindow.js";
import ChatComposer from "./ChatComposer.js";
import "./styles.css";

export default function Chat({userName}) {
  const[messages, setMessage] = useState([
    {   id: 0,
        user: "john",
        type: 'msg',
        text: "First stored message",
    },
    {   id: 1,
        user: "json",
        type: 'msg',
        text: "hahaha",
    },
    {   id: 2,
        user: "kido",
        type: 'ans',
        text: "vodka",
    },
    {   id: 3,
        user: "batto",
        type: 'in',
    },]);
   
    function handleNewMessage(msg){
      var new_msg={user:userName,type:'msg',text:msg}
      let updatedMessages = [...messages, new_msg];
      // update state
      setMessage(updatedMessages)

    }


    return (
      <div className="App">
        {/* send stored messages as props to chat window */}
        <ChatWindow messagesList={messages} />
        {/* send submitted props to chat composer */}
        <ChatComposer sub={handleNewMessage}/>
      </div>
    );
      
  }



  

    
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

