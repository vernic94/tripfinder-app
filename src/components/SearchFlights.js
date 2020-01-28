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

  function showFlights(e) {
    e.preventDefault();

    setLoading(true);
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
console.log(responseObj);
  //let flightList = null;
  return (

    <div className="search">
      <h1 className="welcome-text">Where would you like to go?</h1>
      {/* <form onSubmit={showFlights}> */}
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
        <button className="button" onClick={(e) => showFlights(e)}> Search </button>
        {/* </form> */}
        {/* <Flights responseObj={responseObj} /> */}
    </div>
  );
}

export default SearchFlights;
