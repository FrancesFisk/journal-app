import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {

  buttonHandler (e) {
    e.preventDefault();

    axios.get(`http://localhost:3001/api/main`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <button className="francesButton" onClick={ e => this.buttonHandler(e) }>Click here, Frances!</button>
        </header>
       
      </div>
    );
  }
}

export default App;
