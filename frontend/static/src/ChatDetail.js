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
    const username = localStorage.getItem('user');
    const message = this.props.message;


    return(


      <li className= {username === message.owner ? "out" : "in"}>
        <div className="chat-img">
          testing
        </div>
        <div className="chat-body">
					<div className="chat-message">
						<h5>{message.owner.toUpperCase()}</h5>
						<p>{message.message}</p>
					</div>
				</div>
      </li>
    )
  }
}

export default ChatDetail;
