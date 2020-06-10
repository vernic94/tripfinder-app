import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";

class Header extends Component {
  render() {

    return (
      <div class="topnav"> 
        {/* <div className="topbar"> */}
        <h1 className="topbar">Tripfinder</h1>
        <div>
            <Link to = "/">
            <button className="saved"> Home </button>
            </Link>
            <Link to = "/savedSearches">
            <button className="saved"> Saved flights </button>
            </Link>
        </div>
      </div>
    )
  }
}

export default Header;