import React from 'react';
import { Route } from "react-router-dom";
import Welcome from "./Welcome";
import Flights from "./components/Flights";
import SearchFlights from './components/SearchFlights';
import "./index.css";
import './App.css';
import modelInstance from "./data/Model"
import { Component } from "react";
import SavedSearches from './components/SavedSearches';
import PurchaseView from "./components/PurchaseView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Tripfinder"
    };
  }

  render(){
    return (

      <div className="App">
        <header className="App-header">
        <h1 className="header">{this.state.title}</h1>
     
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}  />
          <Route exact path="/search" render={() => <SearchFlights model={modelInstance}/>} />
          <Route exact path="/flights" render={() => <Flights model= {modelInstance}/>}/>
          <Route exact path="/savedSearches" render={() => <SavedSearches model={modelInstance}/>} />
          <Route exact path="/purchase" render={() => <PurchaseView model= {modelInstance}/>}/>
         
        </header>
      </div>
    );
  }
}

export default App;
