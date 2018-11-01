import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      usersConnected: 0
    };

    this.addMessage = this.addMessage.bind(this)
    this.changeUser = this.changeUser.bind(this)

}

addMessage(message, user) {
  console.log("Messaged recieved!")

  const newMessage = {
    type: "incomingMessage",
    content: message,
    username: user
  }

  this.socket.send(JSON.stringify(newMessage));

}

changeUser(user) {
  // console.log("Change User - user:", user)
  this.setState({currentUser: {name: user}})

  this.socket.send(JSON.stringify({
    type: 'incomingNotification',
    content: this.state.currentUser.name + ' has changed their name to ' + user,
    newName: user
  }))

}

componentDidMount() {
  this.socket = new WebSocket("ws://localhost:3001/");

  this.socket.onopen = (event) => {
    console.log("Connected to server");
  };

  this.socket.onmessage = (message) => {
    console.log("Socket message", message)

    let wsEvent = JSON.parse(message.data);

    switch(wsEvent.type) {

      case ("totalUserValue"):
        // const newUser = {
        //   type: "incomingNotification",
        //   content: `${this.state.currentUser.name} has joined`
        // }

        // const newMsg = this.state.messages.concat(newUser)

        this.setState({
          usersConnected: wsEvent.content,
          // messages: newMsg
        })
        break;

      default:
        // For Notifications and New Messages
        const newMessages = this.state.messages.concat(wsEvent)
        this.setState({messages: newMessages})
    }
  }
}


  render() {
    console.log("current state after render", this.state)
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-userscount">Users connected:{ this.state.usersConnected }</span>
        </nav>
        <MessageList currentMessage={ this.state.messages }/>
        <ChatBar changeUser={ this.changeUser } addMessage={ this.addMessage } currentUser={ this.state.currentUser.name } />
      </div>
    )
  }
}

export default App;
