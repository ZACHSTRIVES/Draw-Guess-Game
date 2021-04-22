import React, { useState } from 'react';

export default function ChatWindow({messagesList}) {
  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.props.messagesList !== prevProps.messagesList) {
  //     this.messageListEnd.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  

  
    return(
      <div className="chat-window">
        <div className="box">
          <div className="inner">
            {Array.isArray(messagesList) &&
              messagesList.map((message, index) => {
                if (message.type === "in") {
                  return (
                    <p key={index} className="message">
                      {message.user} has enter the room
                    </p>
                  )
                }
                else if (message.type === "out") {
                  return (
                    <p key={index} className="message">
                      {message.user} has left room
                    </p>
                  )
                }
                else if (message.type === "ans") {
                  return (
                    <p key={index} className="answer">
                      {message.user} got right answer!
                    </p>
                  )
                }
                else {
                  return (
                    <p key={index} className="message">
                      {message.user} : {message.text}
                    </p>
                  )
                }
              })
            }
            {/* <div
              className="reference"
              ref={node => (this.messageListEnd = node)}
            /> */}
          </div>
        </div>
      </div>
    )
}
