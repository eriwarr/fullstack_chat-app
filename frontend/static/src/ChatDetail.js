import {Component} from 'react';
import Cookies from 'js-cookie';

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      const messages = [ ...this.props.messages];
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
        const messages = [ ...this.props.messages];
        const index = messages.findIndex(message => message.id === id);
        messages[index].message = message;
        this.setState({ messages })
      })
  }

  render() {

    return(
      <>
      {this.state.isEditing === this.props.id ? <input type="text" name="edit" onChange={this.handleInput}/> : <p>{this.props.message}</p>}
      {this.state.isEditing === this.props.id ? <button type="button" onClick={() => this.handleEdit(this.props.id, this.props.message)}>SAVE</button> : <button type="button" onClick={() => this.setState({ isEditing: this.props.id})}>EDIT</button>}
      <button type="button" onClick={() => this.handleDelete(this.props.id, this.props.message)}>DELETE</button>
      </>
    )
  }
}

export default ChatDetail;


// <button type="button" onClick={() => this.handleEdit(message.message, message.id)}>EDIT</button><button type="button" onClick={() => this.handleDelete(message.id)}>DELETE</button>
