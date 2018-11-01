import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      value: ''
    };

    this.onSubmission = this.onSubmission.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  onSubmission(event) {
    event.preventDefault();

    if(event.key === 'Enter') {
      let messageInput = event.target
      let user = this.props.currentUser;
      this.props.addMessage(messageInput.value, user);
      messageInput.value = "";
    }
  }

  handleUserChange(event) {
    event.preventDefault();

      if(event.key === 'Enter') {
        let newUser = event.target
        this.setState({value: newUser.value});
        this.props.changeUser(newUser.value)
    }
  }


  render() {
    return(
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser}
          onKeyUp={this.handleUserChange}

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
