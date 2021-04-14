import React, {Component} from "react";
import Chat from 'chat-react';


export default class MyChat extends Component {
    state = {
      inputValue: '',
      messages: [],
      timestamp: new Date().getTime()
    }
    setInputfoucs = () => {
      this.chat.refs.input.inputFocus();  //set input foucus
    }
    setScrollTop = () => {
      this.chat.refs.message.setScrollTop(1200);  //set scrollTop position
    }
    sendMessage = (v) => {
      const {value} = v;
      if (!value) return;
      const {messages = []} = this.state;
      messages.push(v);
      this.setState({messages, timestamp: new Date().getTime(), inputValue: ''});
    }
    render() {
      const {inputValue, messages, timestamp} = this.state;
      const userInfo = {
        avatar: "http://img.binlive.cn/6.png",
        userId: "59e454ea53107d66ceb0a598",
        name: 'ricky'
      };
      return (
        <Chat
          ref={el => this.chat = el}
          className="my-chat-box"
          dataSource={messages}
          userInfo={userInfo}
          value={inputValue}
          sendMessage={this.sendMessage}
          timestamp={timestamp}
          placeholder="Text here"
          messageListStyle={{width: '100%', height: 0.3 * window.outerHeight}}
        />
      );
    }
  }