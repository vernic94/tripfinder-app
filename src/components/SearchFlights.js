import "../index.css";
import ListPlaces from "./ListPlaces";
import Dates from "./Dates";
import Passengers from "./Passengers";
import React, {useState} from 'react';
import Flights from "./Flights";
import { Link } from "react-router-dom";

  const SearchFlights = (props) => {

  let [responseFlights, setResponseFlights] = useState({});
  let [flightQuotes, setFlightQuotes] = useState([]);
  let [flightPlaces, setFlightPlaces] = useState([]);
  let [flightCarriers, setFlightCarriers] = useState([]);
  let [flightCurrencies, setFlightCurrencies] = useState([]);
  let [showFlights, setShowFlights ] = useState(false);
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

    function handleOnClick() {
      
      getResponseFlights();
    
      if(responseFlights !== []){
        setShowFlights(true);
        setLoading(true)
        if (responseFlights["Quotes"]) {
          setFlightQuotes(responseFlights["Quotes"]);
        }
        if (responseFlights["Places"]) {
          setFlightPlaces(responseFlights["Places"]);
        }
        if (responseFlights["Carriers"]) {
          setFlightCarriers(responseFlights["Carriers"]);
        }
        if(responseFlights[ "Currencies"]){
          setFlightCurrencies(responseFlights["Currencies"])
        }
      }
      else{
        setShowFlights(false)
        setError(true)
      }
    }
    
    function getResponseFlights(){
      props.model.getAllFlights()
      .then(response => {
         setResponseFlights(response)
       })
       .catch(err => {
           console.log(err);
       });;
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
      {showFlights ? <Flights quotes={flightQuotes} places={flightPlaces} carriers = {flightCarriers} currencies={flightCurrencies}/> : null}
     
    </div>
  );
}

export default SearchFlights;
