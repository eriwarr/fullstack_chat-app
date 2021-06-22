import './App.css';
import { Component } from 'react';
import Cookies from 'js-cookie';

import Registration from './Registration';
import Login from './Login';

import ChatList from './ChatList';

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
      selection: !!Cookies.get('Authorization') ? 'chats' : 'login'
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  componentDidMount() {
    fetch('api/v1/chat/')
    .then(response => response.json())
    .then(data => this.setState({ messages: data }));
  }

  async handleLogin(user) {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(user)
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/login/', options).catch(handleError);

    if(response.ok) {
      const data = await response.json().catch(handleError);
      Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({selection: 'chats'});
    } else {
      // throw an Error
    }
  }

  async handleRegistration(user) {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(user)
    };


    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/registration/', options).catch(handleError);

    if(response.ok) {
      const data = await response.json().catch(handleError);
      Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({ selection: 'chats' });
    } else {
      // throw an Error
    }
  }

  handleNavigation(selection) {
    this.setState({selection});
  }

  render() {

    return (
      <>
       <div className="App">
         <div className="App-header">
           <h1>My Awesome Chat App</h1>
            {this.state.selection === 'login' && <Login handleLogin={this.handleLogin} handleNavigation={this.handleNavigation}/>}
            {this.state.selection === 'register' && <Registration handleRegistration={this.handleRegistration} />}
            {this.state.selection === 'chats' && <ChatList />}
        </div>
      </div>
      </>
    );
  }
}
export default App;
