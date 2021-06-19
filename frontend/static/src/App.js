import './App.css';
import { Component } from 'react';
import Cookies from 'js-cookie';

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
        <button type="submit">Send</button>
      </form>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    fetch('api/v1/chat/')
    .then(response => response.json())
    .then(data => this.setState({ messages: data }));
  }

  render() {
    const messageDisplay = this.state.messages.map((message) => (
        <li className="list" key={message.id}>
          <p>{message.message}</p>
          <p>{message.time}</p>
        </li>
    ))
  return (
    <div className="App">
      <div className="App-header">
        <h1>My Awesome Chat App</h1>
        <div className="chat-box">
          {messageDisplay}
        </div>
        <div className="message-box">
          <MessageForm/>
        </div>
      </div>
    </div>

  );
}
}
export default App;
