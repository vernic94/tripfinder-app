import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";

class Header2 extends Component {
  render() {

    return (
      <div class="topnav"> 
        <h1 className="topbar">Tripfinder</h1>
        <div >
            <Link to = "/">
            <button className="saved"> Home </button>
            </Link>
            <Link to="/search">
                <button className="saved"> Back to search</button>
            </Link>
        </div>
      </div>
    )
  }
}

export default Header2;