import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";

class Header2 extends Component {
  render() {

    return (
      <div class="topnav"> 
       <Link to = "/">
        <h1 className="topbar">Tripfinder</h1>
        </Link>
        <div >
            <Link to="/search">
                <button className="saved"> Back to search</button>
            </Link>
        </div>
      </div>
    )
  }
}

export default Header2;