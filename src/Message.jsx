import React, { Component } from 'react';

function Message() {
  return (
    <main className="messages">
      <div className="message">
        <span className="message-username">Anonymous1</span>
        <span className="message-content">I won't be impressed with technology until I can download food.</span>
      </div>
       <Notification/>
    </main>
    )
}

function Notification() {
  return (
  <div className="message system">
    Anonymous1 changed their name to nomnom.
  </div> )
}


export default Message;
