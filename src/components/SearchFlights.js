import "../index.css";
import ListPlaces from "./ListPlaces";
import Dates from "./Dates";
import Passengers from "./Passengers";
import React, {useState} from 'react';
import Flights from "./Flights";
import { Link } from "react-router-dom";

  const SearchFlights = (props) => {
  
  // let [responseFlights, setResponseFlights] = useState({});
  // let [flightQuotes, setFlightQuotes] = useState([]);
  // let [flightPlaces, setFlightPlaces] = useState([]);
  // let [flightCarriers, setFlightCarriers] = useState([]);
  // let [flightCurrencies, setFlightCurrencies] = useState([]);
  // let [flightCurrencies, setFlightCurrencies] = useState();
  let [showFlights, setShowFlights ] = useState(false);
  // let [error, setError] = useState(false);
  // let [loading, setLoading] = useState(false);
  // let flag = true;

    function handleOnClick() {
      getResponseFlights();     
    }
       
    function getResponseFlights(){
      
      props.model.getAllFlights()
      .then(response => {
         //setResponseFlights(response)
        props.model.setflightQuotes(response["Quotes"])        
        props.model.setflightPlaces(response["Places"] );
        props.model.setflightCarriers(response["Carriers"]);  
        props.model.setflightCurrencies(response["Currencies"]);   
        setShowFlights(true);        
        
       })
       .catch(err => {
           console.log(err);
       });
    }

  return (
    
    <div className="search">
      <Link to = "/savedSearches">
      <button className="button"> Saved flights </button>
      </Link>
      <h1 className="welcome-text">Where would you like to go?</h1>
  
      <ListPlaces model={props.model} />
      <h4> Which days would you like to go?</h4>
      <Dates model={props.model} />
      <Passengers model={props.model} />
     
      <button className="button" onClick={handleOnClick}> Search </button>
      {showFlights ? <Flights model={props.model} quotes={props.model.getflightQuotes()} places={props.model.getflightPlaces()} carriers = {props.model.getflightCarriers()} currencies={props.model.getflightCurrencies()}/> : null}
     
    </div>
  );
}

export default SearchFlights;
