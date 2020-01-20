import React, { useState } from "react";
import Flights from "./components/Flights";
import * as constants from "./data/apiConfig";
import { Link } from "react-router-dom";
import "./index.css";

const SearchFlights = (props) => {

  let [departureCity, setDepartureCity] = useState('');
  let [arrivalCity, setArrivalCity] = useState('');
  let [departureDate, setDepartureDate] = useState('');
  let [returnDate, setReturnDate] = useState('');
  const uriEncodedDepCity = encodeURIComponent(departureCity);
  const uriEncodedArCity = encodeURIComponent(arrivalCity);
  let [responseObj, setResponseObj] = useState({});

  // our handler for the input's on change event
    // onNumberOfGuestsChanged = e => {
    //   this.props.model.setNumberOfGuests(e.target.value);
    // };

  function getFlights(e) {
    e.preventDefault();

    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/country=${props.responseObj.CountryName}/originplace=${props.responseObj.PlaceID}/destinationplace=${uriEncodedArCity}/outboundpartialdate=${departureDate}?inboundpartialdate=${returnDate}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": constants.API_KEY
      }
    })
    .then(response => response.json())
    .then(response => {
        setResponseObj(response)
    })
    .catch(err => {
      console.log(err);
    });
    }
    return (
      <div className="search">
        <h1 className="welcome-text">Where would you like to go?</h1>
       <form onSubmit={getFlights}>
        <p>From 
          <input placeholder="Enter departure city or country" 
                  type="text"
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}>
                  </input>
        To <input placeholder="Enter destination city or country" 
                  type="text"
                  value={arrivalCity}
                  onChange={(e) => setArrivalCity(e.target.value)}>
                  </input>
        </p>
       <h4> Which days would you like to go?
        <p> Depart <input placeholder="" 
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}>
                      </input> 
        Return <input placeholder="" 
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}>
          </input>
          </p>
        </h4>
        {/* <p>
          Travellers
          <input
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
        </p> */}
          <button type="submit" className="button"> Search </button>
          </form>
          <Flights responseObj={responseObj} />
      </div>
    );
  }

export default SearchFlights;
