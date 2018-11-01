import React, { Component } from 'react';

function Message(props) {
  let style ={
    color: props.color
  }

  console.log("message props", style)
  switch(props.type) {

    case("incomingMessage"):
      return(
        <div className="message">
          <span className="message-username" style={style}>{props.user}</span>
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
