import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


// const data =
// {
//   "currentUser": {"name": "Bob"},
//   "messages": [
//   {
//     id: 1,
//     type: "incomingMessage",
//     content: "I won't be impressed with technology until I can download food.",
//     username: "Anonymous1"
//   },
//   {
//     id: 2,
//     type: "incomingNotification",
//     content: "Anonymous1 changed their name to nomnom",
//   },
//   // {
//   //   id: 13,
//   //   type: "incomingMessage",
//   //   content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
//   //   username: "Anonymous2"
//   // },
//   // {
//   //   id: 4,
//   //   type: "incomingMessage",
//   //   content: "...",
//   //   username: "nomnom"
//   // },
//   // {
//   //   id: 5,
//   //   type: "incomingMessage",
//   //   content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
//   //   username: "Anonymous2"
//   // },
//   // {
//   //   id: 6,
//   //   type: "incomingMessage",
//   //   content: "This isn't funny. You're not funny",
//   //   username: "nomnom"
//   // },
//   // {
//   //   id: 7,
//   //   type: "incomingNotification",
//   //   content: "Anonymous2 changed their name to NotFunny",
//   // },
//   ]

// }


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

    this.state = {
      currentUser: {name: "Bob"}, //data.currentUser,
      messages: []
    };

    this.addMessage = this.addMessage.bind(this)
    this.changeUser = this.changeUser.bind(this)

}

addMessage(message, user) {
  console.log("Messaged recieved!")

  const newMessage = {
    // id: this.state.messages.length + 1,
    type: "incomingMessage",
    content: message,
    username: user
  }

  this.socket.send(JSON.stringify(newMessage));

}

changeUser(user) {
  console.log("Change User - user:", user)
  console.log("this state currentusername", this.state.currentUser.name)
  this.setState({currentUser: {name: user}})

  this.socket.send(JSON.stringify({
    type: 'incomingNotification',
    content: this.state.currentUser.name + ' has changed their name to ' + user
  }))

}

componentDidMount() {
  this.socket = new WebSocket("ws://localhost:3001/");

  this.socket.onopen = (event) => {
    console.log("Connected to server");
  };

  this.socket.onmessage = (message) => {
    console.log("Socket message", message)

    let messageWithId = JSON.parse(message.data);
    console.log("message from WS Server", messageWithId)

    const newMessages = this.state.messages.concat(messageWithId)
    this.setState({messages: newMessages})

  }

}


  render() {
    console.log("current state after render", this.state)
    return (
      <div>
        <Navbar />
        <MessageList currentMessage={ this.state.messages }/>
        <ChatBar changeUser={ this.changeUser } addMessage={ this.addMessage } currentUser={ this.state.currentUser.name } />
      </div>
    )
  }
}

export default App;
