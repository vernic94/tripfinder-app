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

// function getTodaysDate(){
//   let today = new Date();
//   let date;
//   console.log(today);
//   if((today.getMonth()+1) > 9 && today.getDate() > 9){
//   date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
//   }
//   else if((today.getMonth()+1) < 10){
//     date = today.getFullYear() + "-0" + (today.getMonth()+1) + "-" + today.getDate();
//   }
//   else if(today.getDate() < 10){
//     date = today.getFullYear() + "-0" + (today.getMonth()+1) + "-0" + today.getDate();
//   }
//   console.log(date);

//   return date;
// }

// let today = getTodaysDate();
  return (
    
    <div className="search">
      <p> Depart <input placeholder=""
                  type="date"
                  // defaultValue={today} 
                  // min={today}
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
