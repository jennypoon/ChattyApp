import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



const data =
{
  "currentUser": {"name": "Bob"},
  "messages": [
  {
    id: 1,
    type: "incomingMessage",
    content: "I won't be impressed with technology until I can download food.",
    username: "Anonymous1"
  },
  {
    id: 2,
    type: "incomingNotification",
    content: "Anonymous1 changed their name to nomnom",
  },
  // {
  //   id: 13,
  //   type: "incomingMessage",
  //   content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
  //   username: "Anonymous2"
  // },
  // {
  //   id: 4,
  //   type: "incomingMessage",
  //   content: "...",
  //   username: "nomnom"
  // },
  // {
  //   id: 5,
  //   type: "incomingMessage",
  //   content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
  //   username: "Anonymous2"
  // },
  // {
  //   id: 6,
  //   type: "incomingMessage",
  //   content: "This isn't funny. You're not funny",
  //   username: "nomnom"
  // },
  // {
  //   id: 7,
  //   type: "incomingNotification",
  //   content: "Anonymous2 changed their name to NotFunny",
  // },
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

    this.state = {
      currentUser: data.currentUser,
      messages: data.messages
    }

    this.addMessage = this.addMessage.bind(this)

}

addMessage(message, user) {
  const newMessage = {
    id: this.state.messages.length + 1,
    type: "incomingMessage",
    content: message,
    username: user
  }

  console.log("newMessages in AddMessage:", newMessages)

  const newMessages = this.state.messages.concat(newMessage)
  console.log("Messaged recieved!")
  console.log("newMessages", newMessages)
  this.setState({messages: newMessages})

  }



// componentDidMount() {
//   console.log("componentDidMount <App />");
//   setTimeout(() => {
//     console.log("Simulating incoming message");
//     // Add a new message to the list of messages in the data store
//     const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type: "incomingMessage" };
//     const newMessages = this.state.messages.concat(newMessage)
//     // Update the state of the app component.
//     // Calling setState will trigger a call to render() in App and all child components.
//     this.setState({messages: newMessages})

//   }, 3000);
// }


  render() {
    console.log("current state after render", this.state)
    return (
      <div>
        <Navbar />
        <MessageList currentMessage={ this.state.messages }/>
        <ChatBar addMessage={ this.addMessage } currentUser={ this.state.currentUser.name } />
      </div>
    )
  }
}

export default App;
