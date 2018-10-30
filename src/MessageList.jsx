import Notification from './Notification.jsx';
import Message from './Message.jsx';
import React, { Component } from 'react';

class MessageList extends Component {
  render() {
    const message = this.props.currentMessage.map(message => {
      return < Message
        user={message.username}
        content={message.content} />
    })

    return (
      <main className="messages">
          { message }
      </main>
      )

  }
}

export default MessageList;