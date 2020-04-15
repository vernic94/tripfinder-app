import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";

class Welcome extends Component {
  render() {
    return (
      <div className="home">
        <p className="welcome-text"><i>Need a vacation?</i> <b> We've got your back!</b></p>
       
        <Link to="/search">
          <button className="button">Start planning</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
