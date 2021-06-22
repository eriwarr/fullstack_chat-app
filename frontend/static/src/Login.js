import { Component } from 'react';
import Cookies from 'js-cookie';
import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleLogin(this.state);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" placeholder="username" onChange={this.handleInput}/>
        <input type="email" name="email" placeholder="email" onChange={this.handleInput}/>
        <input type="password" name="password" placeholder="password" onChange={this.handleInput}/>
        <button type="button" onClick={() => this.props.handleNavigation('register')}>Need an account? Register!</button>
        <button type="submit">LOGIN</button>
      </form>

    )
  }
}

export default Login
