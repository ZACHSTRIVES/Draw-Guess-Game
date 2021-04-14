import React, { Component } from "react";

// we are using class component here bcoz functional components cant use react life cycle hooks such as componentDidUpdate
export default class ChatWindow extends Component {
  // if this component received new props, move scroll chat window
  // to view latest message
  componentDidUpdate = (prevProps, prevState) => {
    // if component received new props
    if (this.props.messagesList !== prevProps.messagesList) {
      // call ref and scroll
      this.messageListEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    // messagesList the got the messages stored in state
    // destructuring
    const { messagesList } = this.props;
    return (
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
            {/* define ref and call it if component is updated */}
            <div
              className="reference"
              ref={node => (this.messageListEnd = node)}
            />
          </div>
        </div>
      </div>
    );
  }
}
