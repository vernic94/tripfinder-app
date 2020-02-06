import "../index.css";
import ListPlaces from "./ListPlaces";
import Dates from "./Dates";
import Passengers from "./Passengers";
//import { useHistory } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Flights from "./Flights";

//  function SearchFlights(props){
  const SearchFlights = (props) => {


  //let flight = null;
  //const history = useHistory();
  //let flightData = [];
  let [responseFlights, setResponseFlights] = useState({});
  let [flightQuotes, setFlightQuotes] = useState([]);
  let [flightPlaces, setFlightPlaces] = useState([]);
  let [flightCarriers, setFlightCarriers] = useState([]);
  let [showFlights, setShowFlights ] = useState(false);
    //history.push("/flights");
    // useEffect(() => {
        //}, []);

    function handleOnClick() {
      setShowFlights(true);
      getResponseFlights();
      if (responseFlights["Quotes"]) {
        setFlightQuotes(responseFlights["Quotes"]);
      }
      if (responseFlights["Places"]) {
        setFlightPlaces(responseFlights["Places"]);
      }
      if (responseFlights["Carriers"]) {
        setFlightCarriers(responseFlights["Carriers"]);
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
      <h1 className="welcome-text">Where would you like to go?</h1>
  
      <ListPlaces model={props.model} />
      <h4> Which days would you like to go?</h4>
      <Dates model={props.model} />
      <Passengers model={props.model} />
     
      <button className="button" onClick={handleOnClick}> Search </button>
      {showFlights ? <Flights quotes={flightQuotes} places={flightPlaces} carriers = {flightCarriers}/> : null}
      {/* { <Flights  flightQuotes = {flightMapping} /> } */}
      {/* {<Flights flightQuotes = {flightData["Quotes"].map((quotes, key) => 
          {quotes["OutboundLeg"].map((info,key) => {info["DestinationId"], info["DepartureDate"], key["OriginId"]}), key["QuoteId"]}
        )} />} */}
      
       {/* {flightData.map(flight => (
        <Flights 
        key={JSON.stringify(flight["Quotes"].flight["QuoteId"])}
        depAirport={flight.Quotes.Places.Name}
        arrAirport={flight.Quotes.Places.Name}
        />
      ))} */}
    </div>
  );
}

export default SearchFlights;
