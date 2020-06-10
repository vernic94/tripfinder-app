import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";

class Header extends Component {
  render() {

    return (
      <div class="topnav"> 
        <div className="topbar">
            <h1>Tripfinder</h1>
            <Link to = "/savedSearches">
            <button className="button"> Saved flights </button>
            </Link>
        </div>
      </div>
    );
  }
}

export default Header;