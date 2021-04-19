import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChatWindow from "./ChatWindow";
import ChatComposer from "./ChatComposer";
import "./styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: [
            // {   id: 0,
            //     user: "john",
            //     type: 'msg',
            //     text: "First stored message",
            // },
            // {   id: 1,
            //     user: "json",
            //     type: 'msg',
            //     text: "hahaha",
            // },
            // {   id: 2,
            //     user: "kido",
            //     type: 'ans',
            //     text: "vodka",
            // },
            // {   id: 3,
            //     user: "batto",
            //     type: 'in',
            // },
          ]
    };

  
  }


  // if new message was submitted from child component // process
  submitted = getNewMessage => {
    if (getNewMessage !== "") {
      // match the state format
      const newMessage = { text: getNewMessage };
      // merge new message in copy of state stored messages
      let updatedMessages = [...this.state.messages, newMessage];
      // update state
      this.setState({
        messages: updatedMessages
      });
    }
  };

  render() {
    return (
      <div className="App">
        {/* send stored messages as props to chat window */}
        <ChatWindow messagesList={this.state.messages} />
        {/* send submitted props to chat composer */}
        <ChatComposer submitted={this.submitted} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

