import "../index.css";
import ListPlaces from "./ListPlaces";
import Dates from "./Dates";
import Passengers from "./Passengers";
import React, {useState} from 'react';
import Flights from "./Flights";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';

  const SearchFlights = (props) => {

  let [showFlights, setShowFlights ] = useState(false);
  let [showLoader, setShowLoader] = useState(false);

  function checkMandatoryFields(){
    if((props.model.getDepartureDate() == "") || (props.model.getReturnDate() == "") || (props.model.departurePlace["PlaceId"] == undefined) || (props.model.arrivalPlace["PlaceId"] == undefined)){
      alert("The fields: From, To, Departure and Return are mandatory! Please fill in all necessary information and search again.")
    }
    else{
      handleOnClick();
    }
  }

  function handleOnClick() {
    setShowFlights(false);
    setShowLoader(true);
    getResponseFlights();     
  }
      
  function getResponseFlights(){
    props.model.getAllFlights()
    .then(response => {
      props.model.setflightQuotes(response["Quotes"])        
      props.model.setflightPlaces(response["Places"] );
      props.model.setflightCarriers(response["Carriers"]);  
      props.model.setflightCurrencies(response["Currencies"]);
      setShowLoader(false);   
      setShowFlights(true);        
      
      })
      .catch(err => {
          console.log(err);
      });
  }

  return (
    <div className="search">
      {/* <Link to = "/savedSearches">
      <button className="button"> Saved flights </button>
      </Link> */}
      <h1 className="welcome-text">Where would you like to go?</h1>
  
      <ListPlaces model={props.model} />
      <h4> Which days would you like to go?</h4>
      <Dates model={props.model} />
      <Passengers model={props.model} />
     
      <button className="button" onClick={checkMandatoryFields}> Search </button>
      {showLoader ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : null }
      {showFlights ? 
                  <Link to = "/otherDates">
                  <button className="button" > Show flights for other dates </button>
                  </Link>
                  : null}
      {showFlights ? 
      <Flights model={props.model} quotes={props.model.getflightQuotes()} places={props.model.getflightPlaces()} carriers = {props.model.getflightCarriers()} currencies={props.model.getflightCurrencies()}/> 
      : null}
    </div>
  );
}

export default SearchFlights;
