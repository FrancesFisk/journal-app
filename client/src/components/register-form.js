import React from 'react';
import './register-form.css'; 
import axios from 'axios';
import {API_BASE_URL} from '../config';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  changeUsername(username) {
    this.setState({
      username
    })
  }

  changePassword(password) {
    this.setState({
      password
    })
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const newUsername = this.state.username;
    const newPassword = this.state.password;
    this.postUserRegistration(newUsername, newPassword);
  }

  postUserRegistration(user, pw) {
    axios({
      method: 'post',
      url: `${API_BASE_URL}/users`,
      data: {
        username: user,
        password: pw
      }
    })
    .then(data => {
      console.log("data", data);
      // alert("Thank you for signing up :) Please log in.");
      //     $('.popup-signup').hide();
      //     $('.popup-login').show();
    })
    .catch(err => {
      console.log(err.responseText);
      alert("Sorry, that username is already taken.")
    })
  }

  render() {
    return(
      <form method="post" className="signup-form" onSubmit={e => this.onSubmitHandler(e)}>
        <fieldset>
          <legend>SIGN UP</legend>
          <label htmlFor="username"><span>Username</span></label>
          <input 
            type="text" 
            className="new-username" 
            value={this.state.username} 
            onChange={e => this.changeUsername(e.target.value)}
            required /><br/>
          <label htmlFor="user-password">Password</label>
          <input 
            type="password" 
            className="new-password" 
            onChange={e => this.changePassword(e.target.value)}
            required /><br/>
          <button type="submit" className="signup-btn">Sign up</button>
        </fieldset>
      </form>
    )
  }

}