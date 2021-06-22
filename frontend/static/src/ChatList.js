import {Component} from 'react';
import MessageForm from './MessageForm';

class ChatList extends Component {
  constructor(props) {
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
      <li className='list'key={message.id}>
        <p>{message.user}</p>
        <p>{message.message}</p>
        <p>{message.time}</p>
      </li>
    ))

    return(
      <>
      <div className="chat-box">
        {messageDisplay}
      </div>
      <div className="message-box">
        <MessageForm/>
      </div>
    </>
    )
  }
}

export default ChatList;
