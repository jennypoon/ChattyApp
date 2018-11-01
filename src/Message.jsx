import React, { Component } from 'react';

function Message(props) {
  switch(props.type) {

    case("incomingMessage"):
      return(
        <div className="message">
          <span className="message-username">{props.user}</span>
          <span className="message-content">{props.content}</span>
        </div>
        )
      break;

    default:
      return (
        <div className="message system">
          {props.content}
        </div>
      )
  }
}

export default Message;
