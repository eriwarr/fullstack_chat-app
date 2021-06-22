import Cookies from 'js-cookie';
import { Component } from 'react';
import './App.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  sendMessage(event) {
    // event.preventDefault();
    // this.setState({ messages: '' })

    const currentMessage = {
        message: this.state.messages,
    }

    const options = {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(currentMessage),
    }
    fetch('/api/v1/chat/', options)
      .then(response => response.json());
}
  render() {

    return (
      <form onSubmit= {this.sendMessage}>
        <textarea className="form-input" name="messages" value={this.state.messages} placeholder="Start your messge" onChange={this.handleInput}></textarea>
        <button className="send-button" type="submit">Send</button>
      </form>
    )
  }
}

export default MessageForm;
