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
      // if(props.model.getDepartureDate() > getTodaysDate()){
      //   console.log("dep date: ", props.model.getDepartureDate())
      //   alert("You cannot choose passed dates. Please choose a valid departure date.")
      // }else{
        setInputDepValue(changes.value)
      //}
    }
    if (changes.action === "setReturnDate"){
      // if(props.model.getDepartureDate() > props.model.getReturnDate()){
      //   alert("You have chosen a return date that is earlier than the departure date. Please choose different dates!")
      // }else{
        setInputRetValue(changes.value)
      //}
    }
}

function getTodaysDate(){
  let today = new Date();
  let date;
  //console.log("today",today);
  if((today.getMonth()+1) > 9 && today.getDate() > 9){
  date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
  }
  else if((today.getMonth()+1) < 10){
    date = today.getFullYear() + "-0" + (today.getMonth()+1) + "-" + today.getDate();
  }
  else if(today.getDate() < 10){
    date = today.getFullYear() + "-0" + (today.getMonth()+1) + "-0" + today.getDate();
  }
  //console.log("date",date);

  return date;
}

function checkDepartureDate(e){
  if(Date.parse(e) < Date.parse(getTodaysDate())){
    // console.log("getTodaysdate: ", getTodaysDate())
    // console.log("e in dep date: ",e)
    alert("You cannot choose passed dates. Please choose a valid departure date.")
  }else{
    props.model.setDepartureDate(e)
    //console.log("e in else dep date: ",e)
  }
}

function checkReturnDate(e){
  if(e < props.model.getDepartureDate()){
    // console.log("ret date: ", props.model.getReturnDate())
    // console.log("dep date: ", props.model.getDepartureDate())
    // console.log("e in return date: ",e)
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
