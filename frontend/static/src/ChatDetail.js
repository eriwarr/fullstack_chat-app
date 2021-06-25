import {Component} from 'react';
import Cookies from 'js-cookie';

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      message: this.props.message.message,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleInput = this.handleInput.bind(this);

  }

  handleInput(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  handleEdit() {
    this.setState({isEditing: false});
    const message = this.props.message;
    message.message = this.state.message;
    this.props.handleUpdate(message);

  }

  render() {
    const message = this.props.message;
    return(
      <li className='list'>
        <h6>{message.owner.toUpperCase()}</h6>

        {
          this.state.isEditing
          ? <textarea type="text" name="message" value={this.state.message} onChange={this.handleInput}></textarea>
          :  <p>{message.message}</p>
        }

        <time>{this.props.time}</time>

        {
          this.state.isEditing
          ? <button className ="detail-button" type="button" onClick={this.handleEdit}>SAVE</button>
          : message.has_owner_permissions && <button className ="detail-button" type="button" onClick={() => this.setState({ isEditing: true})}>EDIT</button>
        }

        {message.has_owner_permissions && <button className ="detail-button" type="button" onClick={() => this.props.handleDelete(message.id)}>DELETE</button>}

      </li>
    )
  }
}

export default ChatDetail;
