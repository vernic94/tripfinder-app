import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mode:"search"
    }
    this.handleSearchPage = this.handleSearchPage.bind(this);
    this.handleSavePage = this.handleSavePage.bind(this);
    this.handlePurchasePage = this.handlePurchasePage.bind(this);
  }

  handleSearchPage(){
    this.setState({mode: "search"})
  }
  handleSavePage(){
    this.setState({mode: "save"})
  }
  handlePurchasePage(){
    this.setState({mode: "both"})
  }

  renderButtons(){
    if(this.state.mode === "search"){
      return(
        <div class="topnav"> 
          <Link to = "/">
        <h1 className="topbar">Tripfinder</h1>
        </Link>
          <div>
              <Link to = "/savedSearches">
              <button className="saved"> Saved flights </button>
              </Link>
          </div>
        </div>);
    }
    if(this.state.mode === "save"){
      return(
        <div class="topnav"> 
         <Link to = "/">
        <h1 className="topbar">Tripfinder</h1>
        </Link>
          <div >
              <Link to="/search">
              <button className="saved"> Back to search</button>
              </Link>
          </div>
        </div>);
    }
    if(this.state.mode === "both"){
      return(
        <div class="topnav"> 
         <Link to = "/">
        <h1 className="topbar">Tripfinder</h1>
        </Link>
          <div >
              <Link to = "/savedSearches">
              <button className="saved"> Saved flights </button>
              </Link>
              <Link to="/search">
              <button className="saved"> Back to search</button>
              </Link>
          </div>
        </div>);
    }
  }

  render() {
    return (
      <div>
        {this.renderButtons()}
      </div>
    )
  }
}

export default Header;
