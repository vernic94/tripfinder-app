import React from 'react';
import { Route } from "react-router-dom";
import Welcome from "./Welcome";
import Flights from "./components/Flights";
import SearchFlights from './components/SearchFlights';
import "./index.css";
import './App.css';
import modelInstance from "./data/Model"
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Tripfinder"
    };
  }
// function App(){
  render(){
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="header">{this.state.title}</h1>
        {/* <h1>Tripfinder</h1> */}
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}  />
          <Route exact path="/search" render={() => <SearchFlights model={modelInstance}/>} />
          <Route exact path="/flights" render={() => <Flights model= {modelInstance}/>}/>
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
