import {Component} from 'react';
import MessageForm from './MessageForm';
import Cookies from 'js-cookie';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isEditing: null,
      edit: '',
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInput(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDelete(id) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    }

    fetch(`/api/v1/chat/${id}/`, options)
    .then(response => {
      const messages = [ ...this.state.messages];
      const index = messages.findIndex(message => message.id === id);
      messages.splice(index, 1);
      this.setState({ messages });
    })

  }

  handleEdit(id, message) {
    this.setState({isEditing: null});


    const currentMessage = {
      message: this.state.edit,
    }
      console.log(id)
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(currentMessage),
    }
    fetch(`/api/v1/chat/${id}/`, options)
      .then(response => {
        const messages = [ ...this.state.messages];
        const index = messages.findIndex(message => message.id === id);
        messages[index].message = message;
        this.setState({ messages })
      })
  }

  componentDidMount() {
    fetch('api/v1/chat/')
    .then(response => response.json())
    .then(data => this.setState({ messages: data }));
  }

  render() {
    const messageDisplay = this.state.messages.map((message) => (
      <li className='list'key={message.id}>
        <p>{message.username}</p>
        {this.state.isEditing === message.id ? <input type="text" name="edit" onChange={this.handleInput}/> : <p>{message.message}</p>}
        <p>{message.time}</p>
        {this.state.isEditing === message.id ? <button type="button" onClick={() => this.handleEdit(message.id)}>SAVE</button> : <button type="button" onClick={() => this.setState({ isEditing: message.id})}>EDIT</button>}
        <button type="button" onClick={() => this.handleDelete(message.id, message.message)}>DELETE</button>
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
