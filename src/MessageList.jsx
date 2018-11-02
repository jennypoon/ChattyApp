import Message from './Message.jsx';
import React, { Component } from 'react';

class MessageList extends Component {

  render() {
    const message = this.props.currentMessage.map(message => {
      return < Message
        key={message.id}
        user={message.username}
        content={message.content}
        type={message.type}
        color={message.color}
        />
    })

    return (
      <main className="messages">
          { message }
      </main>
      )

  }
}


export default MessageList;