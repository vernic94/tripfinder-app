import React, { useState } from "react";
import "../index.css";
import ListPlaces from "./ListPlaces";
import useInputPlaces from "./useInputPlaces";

// const SearchFlights = (props) => {
function SearchFlights(props){
  
  // let [departureCity, setDepartureCity] = useState('');
  // let [arrivalCity, setArrivalCity] = useState('');
  let [responseObj, setResponseObj] = useState({});
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  function getFlights(e) {
    e.preventDefault();

    props.model.getFlights
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
      <h4> Which days would you like to go?
      <p> Depart <input placeholder=""
                  type="date"
                  //value={props.modelInstance.getDepartureDate}
                  onChange={(e) => props.model.setDepartureDate(e.target.value)}>
                    </input> 
      Return <input placeholder="" 
                  type="date"
                  //value={props.modelInstance.getReturnDate}
                  onChange={(e) => props.model.setReturnDate(e.target.value)}>
        </input>
        </p>
      </h4>
      {/* <p>
        Travellers
        <input
          type="number"
          value={state.numberOfGuests}
          onChange={onNumberOfGuestsChanged}
        />
      </p> */}
        <button type="submit" className="button"> Search </button>
        </form>
        {/* <Flights responseObj={responseObj} /> */}
    </div>
  );
}

export default SearchFlights;
