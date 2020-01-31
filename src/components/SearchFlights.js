import "../index.css";
import ListPlaces from "./ListPlaces";
import Dates from "./Dates";
import Passengers from "./Passengers";
//import { useHistory } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Flights from "./Flights";


 function SearchFlights(props){

  //const history = useHistory();
  //let flightData = [];
  let [responseFlights, setResponseFlights] = useState([]);

    //history.push("/flights");
    // useEffect(() => {
        //}, []);

    function handleOnClick() {
      getResponseFlights();
    }
    
    //console.log("responseFlights"+responseFlights)
    
    function getResponseFlights(){
      props.model.getAllFlights()
      .then(response => {
         setResponseFlights(response)
         responseFlights = response;
         flightMapping();
        //  console.log(response["Quotes"].map(quotes => 
        //   quotes["OutboundLeg"]))
         //console.log("flightData"+ JSON.stringify(flightData["Quotes"]))
         //return response;
       })
       .catch(err => {
           console.log(err);
       });;
    }

    function flightMapping(){
      let flightQuotes = responseFlights["Quotes"].map(quotes => 
       quotes["OutboundLeg"])

      let destData = flightQuotes.map(info => info["DestinationId"])

        console.log(destData)
      return (
        flightQuotes
      );
    }

  return (
    
    <div className="search">
      <h1 className="welcome-text">Where would you like to go?</h1>
  
      <ListPlaces model={props.model} />
      <h4> Which days would you like to go?</h4>
      <Dates model={props.model} />
      <Passengers model={props.model} />
     
      <button className="button" onClick={handleOnClick}> Search </button>
     
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
