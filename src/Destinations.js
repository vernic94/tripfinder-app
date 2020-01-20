import React, { Component } from "react";
import "./index.css";

class Destinations extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      status: "LOADING"
    };
  }

  render(){
    return(
      <div className="home">
      <p> destinations</p>
     
     
    </div>
    );
  }
 }

 export default Destinations;