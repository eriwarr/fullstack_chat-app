import './App.css';
import { Component } from 'react';
import Cookies from 'js-cookie';

import Registration from './Registration';
import Login from './Login';

import ChatList from './ChatList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selection: !!Cookies.get('Authorization') ? 'chats' : 'login'
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/logout/', options).catch(handleError);
    if(response.ok) {
      Cookies.remove('Authorization');
      this.setState({selection: 'login'});
    }


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
           {this.state.selection === 'chats' && <button type="submit" className="btn btn-primary" onClick={this.handleLogout}>LOGOUT</button>}
            <h1>My Awesome Chat App</h1>
            {this.state.selection === 'login' && <Login handleLogin={this.handleLogin} handleNavigation={this.handleNavigation}/>}
            {this.state.selection === 'register' && <Registration handleRegistration={this.handleRegistration} handleNavigation={this.handleNavigation}/>}
            {this.state.selection === 'chats' && <ChatList/>}
        </div>
      </div>
      </>
    );
  }
}
export default App;
