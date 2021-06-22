import { Component } from 'react';
import Cookies from 'js-cookie';
import './App.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleRegistration(this.state);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" placeholder="username" onChange={this.handleInput}/>
        <input type="email" name="email" placeholder="email" onChange={this.handleInput}/>
        <input type="password" name="password1" placeholder="password" onChange={this.handleInput}/>
        <input type="password" name="password2" placeholder="enter password again" onChange={this.handleInput}/>
        <button type="submit">REGISTER</button>
      </form>

    )
  }
}

export default Registration
