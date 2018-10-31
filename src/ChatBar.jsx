import React, {Component} from 'react';

class ChatBar extends Component {

 constructor(props) {
    super(props);
    this.state = {content: ''};

    this.onSubmission = this.onSubmission.bind(this)
    }

  onSubmission(event) {
    event.preventDefault();
    if(event.key === 'Enter') {
      let messageInput = event.target
      let user = this.props.currentUser;
      console.log("messageInput:", messageInput.value);
      this.props.addMessage(messageInput.value, user);
      messageInput.value = "";
    }
  }


  render() {
    return(
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser}
          />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.onSubmission}
        />
    </footer>
    )
  }
}

export default ChatBar;
