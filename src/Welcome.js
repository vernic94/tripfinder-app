import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class Welcome extends Component {
  render() {
    return (
      <div className="home">
        <p className="welcome-text">Welcome to the dinner planner React! \n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
          magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
          arcu. Maecenas a efficitur leo.</p>

        <Link to="/search">
          <button className="start-button">Start planning</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
