import React, { useState,useEffect } from "react";
import "../index.css";

const Passengers = (props) => {
 
  let [numberOfPassengers, getNumberOfPassengers] = useState("1");

useEffect(() => {
    props.model.addObserver(update);

    return function cleanup() {
        props.model.removeObserver(props);
    };
});

function update(changes) {
    if (changes.action === "setNumberOfPassengers"){
        getNumberOfPassengers(changes.value)
    }
}

function changeNumberOfPassengers(e){
  props.model.setNumberOfPassengers(e.target.value);
}

  return (
    <div className="search">
      <p> Passengers
         <input
           type="number"
           value={numberOfPassengers}
           onChange={changeNumberOfPassengers}
        />
      </p> 
    </div>
  );
}

export default Passengers;
