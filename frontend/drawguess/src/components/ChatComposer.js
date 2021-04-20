import React, { useState } from 'react';


export default function ChatComposer({sub}) {
  const[newMsg, setNewMsg] = useState("");

  function handleSubmit() {
    sub(newMsg)
  };

  function handleCompose(value) {
    setNewMsg(value)
  };

    return (
      <div className="chat-composer">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            placeholder="Type & hit enter"
            onChange={e=>handleCompose(e.target.value)}
            value={newMsg}
          />
        </form>
      </div>
    )
}