import { Component } from 'react';
import MessageForm from './MessageForm';
import ChatDetail from './ChatDetail';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: '',
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.retreieveMessages = setInterval(this.fetchData, 1000);
  }

  componnentWillUnmount() {
    clearInterval(this.retreieveMessages);
  }

  fetchData() {
    fetch('api/v1/chat/')
    .then(response => response.json())
    .then(data => this.setState({ messages: data }));
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

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const messages = [ ...this.state.messages];
      const index = messages.findIndex(message => message.id === id);
      messages.splice(index, 1);
      this.setState({ messages });
    });

  }

  handleUpdate(message) {

    const id = message.id;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(message),
    }
    fetch(`/api/v1/chat/${id}/`, options)
      .then(response => {

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const messages = [ ...this.state.messages];
        const index = messages.findIndex(message => message.id === id);
        messages[index] = message;
        this.setState({ messages });
      });
  }

  render() {

    const messageDisplay = this.state.messages.map((message) => (
      <ChatDetail key={message.id} message={message} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
    ))

    return(
      <>
      <div className="container content">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <div className="card-header">Chat</div>
                <div className="card-body height3">
                  <ul className="chat-list">
                    {messageDisplay}
                  </ul>
                </div>
            </div>
          </div>
        </div>
        <MessageForm/>
      </div>
    </>
    )
  }
}

export default ChatList;
