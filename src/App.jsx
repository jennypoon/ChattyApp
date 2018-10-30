import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import Notification from './Message.jsx';


function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  )
}


class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Message/>
        <ChatBar />
      </div>
    )
  }
}

export default App;
