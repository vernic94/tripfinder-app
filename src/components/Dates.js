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

function getTodaysDate(){
  let today = new Date();
  let date;
  if((today.getMonth()+1) > 9 && today.getDate() > 9){
    date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
  }
  else if((today.getMonth()+1) < 10){
    date = today.getFullYear() + "-0" + (today.getMonth()+1) + "-" + today.getDate();
  }
  else if(today.getDate() < 10){
    date = today.getFullYear() + "-0" + (today.getMonth()+1) + "-0" + today.getDate();
  }
  return date;
}

function checkDepartureDate(e){
  if(Date.parse(e) < Date.parse(getTodaysDate())){
    alert("Oops! The date you chose has already passed! Please choose a valid departure date.")
  }
  if(props.model.getReturnDate() != "" && e > props.model.getReturnDate()){
    alert("You have chosen a return date that is earlier than the departure date. Please choose different dates!")
  }
  else{
    props.model.setDepartureDate(e)
  }
}

function checkReturnDate(e){
  if(e < props.model.getDepartureDate()){
      alert("You have chosen a return date that is earlier than the departure date. Please choose different dates!")
  }else{
    props.model.setReturnDate(e)
  }
}

  return (
    <div className="search">
      <p> Depart <input placeholder=""
                  type="date"
                  onChange={(e) => checkDepartureDate(e.target.value)}>
                    </input> 
          Return <input placeholder="" 
                  type="date"
                  onChange={(e) => checkReturnDate(e.target.value)}>
        </input>
        </p>
    </div>
  );
}

export default Dates;
