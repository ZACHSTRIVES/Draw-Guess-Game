import React from "react";
import "./chat.css";

export default function ChatWindow({ messagesList }) {
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  return (
    <div className="chat-window">
      <div className="messages">
        {Array.isArray(messagesList) &&
          messagesList.map((message, index) => {
            if (message.type === "info") {
              return (
                <p key={index} className="info-in msg-margin">
                  {message.content}
                </p>
              );
            }
            else if (message.type === "in") {
              return (
                <p key={index} className="info-in msg-margin">
                  {message.user} has entered the room
                </p>
              );
            } else if (message.type === "out") {
              return (
                <p key={index} className="info-out msg-margin">
                  {message.user} has left game
                </p>
              );
            } else if (message.type === "ans") {
              return (
                <p key={index} className="answer msg-margin">
                  {message.user} got the right answer!
                </p>
              );
            } else {
              return (
                <p key={index} className="message msg-margin">
                  <div className="user">{message.user}</div>
                  <div className="text">{message.text}</div>
                </p>
              );
            }
          })}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
}
