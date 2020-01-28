import React, { useState,useEffect } from "react";
import "../index.css";
import ListPlaces from "./ListPlaces";
import Dates from "./Dates";
import Flights from "./Flights";
import Passengers from "./Passengers";

// const SearchFlights = (props) => {
function SearchFlights(props){
  
  // let [departureCity, setDepartureCity] = useState('');
  // let [arrivalCity, setArrivalCity] = useState('');
  let [responseObj, setResponseObj] = useState({});
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
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

function getFlights(e) {
    e.preventDefault();

    props.model.getAllFlights()
    .then(response => {
        setResponseObj(response);
        setLoading(false);
    })
    .catch(err => {
      setError(true);
      setLoading(false);
      console.log(err);
    });
  }

  return (
    <div className="search">
      <h1 className="welcome-text">Where would you like to go?</h1>
      <form onSubmit={getFlights}>
      <ListPlaces model={props.model} />
      <h4> Which days would you like to go?</h4>
      <Dates model={props.model} />
      <Passengers model={props.model} />
      <button type="submit" className="button"> Search </button>
      </form>
      {/* <Flights responseObj={responseObj} /> */}
    </div>
  );
}

export default SearchFlights;
