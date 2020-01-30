import "../index.css";
import ListPlaces from "./ListPlaces";
import Dates from "./Dates";
import Passengers from "./Passengers";
//import { useHistory } from "react-router-dom";
import React, {useState, useEffect} from 'react';

 function SearchFlights(props){

  //const history = useHistory();

  let [responseFlights, setResponseFlights] = useState({});

    //history.push("/flights");
    // useEffect(() => {
      function handleOnClick() {
       props.model.getAllFlights()
       .then(response => {
          setResponseFlights(response)
          console.log(response)
        })
        .catch(err => {
            console.log(err);
        });;
    //}, []);
  }

  return (
    
    <div className="search">
      <h1 className="welcome-text">Where would you like to go?</h1>
  
      <ListPlaces model={props.model} />
      <h4> Which days would you like to go?</h4>
      <Dates model={props.model} />
      <Passengers model={props.model} />
      {/* <Link to="/flights"> */}
      <button className="button" onClick={handleOnClick}> Search </button>
      {/* </Link> */}
      {/* <Flights flights={responseFlights} /> */}
      {/* {props.model.flights.map(flight => (
        <Flights depAirport={flight.}
        arrAirport={flight.} />
      ))} */}
    </div>
  );
}

export default SearchFlights;
