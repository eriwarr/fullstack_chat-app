import {Component} from 'react';
import MessageForm from './MessageForm';
import ChatDetail from './ChatDetail';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: '',
    }
}
  componentDidMount() {

    fetch('api/v1/chat/')
    .then(response => response.json())
    .then(data => this.setState({ messages: data }));
    fetch('rest-auth/user/')
    .then(response => response.json())
    .then(data => this.setState({ user: data.username}));
  }

  //   <ChatDetail messageId={this.props.message.id} message={message.message}/>
  //   <p>{message.time}</p>

  render() {

    const messageDisplay = this.state.messages.map((message) => (
      <li className='list'key={message.id}>
        <p>{message.owner}</p>
        {this.state.user === message.owner ? <ChatDetail id={message.id} message={message.message} messages={this.state.messages}/> : <p>{message.message}</p>}
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


// <button type="button" onClick={() => this.handleEdit(message.message, message.id)}>EDIT</button><button type="button" onClick={() => this.handleDelete(message.id)}>DELETE</button>
