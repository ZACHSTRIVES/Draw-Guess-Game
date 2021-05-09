import React from 'react';
import {
  useHistory
} from "react-router-dom";
import "./PromptPage.css";
import logo from '../../static/drawguesslogo.png';

export default function PromptPage({ info }) {
  var history = useHistory();
  function handleReturnLobby() {
    history.push("/")
    history.go()

  }

  return (
    <div className="promptCard">
      <div className="promptCard-top">
        <img src={logo} className="promptCard-logo" alt="prompt card logo"></img>
        <div className="promptCard-top-info">
          {info}
        </div>
      </div>
      <div className="promptCard-bottom text-title" onClick={handleReturnLobby}>
        RETURN LOBBY
      </div>
    </div>
  )
}