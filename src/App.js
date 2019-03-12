import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Fitness Tracker</h1>
        <Login></Login>
      </div>
    );
  }
}

export default App;
