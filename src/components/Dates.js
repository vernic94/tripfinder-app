import React, { useState,useEffect } from "react";
import "../index.css";

const Dates = (props) => {
 
  let [inputDepValue, setInputDepValue] = useState("");
  let [inputRetValue, setInputRetValue] = useState("");


useEffect(() => {
    props.model.addObserver(update);

    return function cleanup() {
        props.model.removeObserver(props);
    };
});

function update(changes) {
    if (changes.action === "setDepartureDate"){
        setInputDepValue(changes.value)
    }
    if (changes.action === "setReturnDate"){
        setInputRetValue(changes.value)
    }
}

  return (
    <div className="search">
      <p> Depart <input placeholder=""
                  type="date"
                  onChange={(e) => props.model.setDepartureDate(e.target.value)}>
                    </input> 
          Return <input placeholder="" 
                  type="date"
                  onChange={(e) => props.model.setReturnDate(e.target.value)}>
        </input>
        </p>
    </div>
  );
}

export default Dates;
