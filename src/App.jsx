import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



const data =
{
  "currentUser": {"name": "Bob"},
  "messages": [
    {
      "username": "Bob",
      "content": "Has anyone seen my marbles?"
    },
    {
      "username": "Anonymous",
      "content": "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}


function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  )
}


class App extends Component {

constructor(props) {
    super(props);

    this.state = { data }
}

  render() {
    return (
      <div>
        <Navbar />
        <MessageList currentMessage={ this.state.data.messages }/>
        <ChatBar currentUser={ this.state.data.currentUser.name } />
      </div>
    )
  }
}

export default App;
