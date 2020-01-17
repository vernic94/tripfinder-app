import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Welcome from "./Welcome";
import modelInstance from "./data/Model";
import apiConfig from "./data/apiConfig";
import "./index.css";

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Trip finder!"
    };
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
      <h1 className="header">{this.state.title}</h1>
        {/* We rended diffrent component based on the path */}
        <Route exact path="/" component={Welcome} />

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}
}

export default App;
