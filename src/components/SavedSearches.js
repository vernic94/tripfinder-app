import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

const SavedSearches = (props) => {
    let [savedFligthsArray, setSavedFlightsArray]= useState([]);
    let [boughtFlight, setBoughtFlight] = useState([]);

    function onDelete(e) {
        props.model.deleteSavedFlight(e.target.id);
    }

    function getFlight(id) {
        let selectedFlight = savedFligthsArray.filter(flight => id == flight.key);
        if(selectedFlight !== []){
            props.model.setSelectedFlight(selectedFlight);
        }
    }   
    
    function chooseFlight(e){
        getFlight(e.target.id);       
    }   

    useEffect(() => {
        props.model.fetchSavedFlightArray();
        props.model.addObserver(update);
        return function cleanup() {
            props.model.removeObserver(props);
        };
    }, []);

    function update(changes) {
        if (changes.action == "fetchSavedFlightObj"){
            setSavedFlightsArray(changes.value);            
        }
        if (changes.action == "setSelectedFlight"){
            setBoughtFlight(changes.value);          
        }
    }

    let savedFlights = savedFligthsArray.map(flight =>
            (
            <div>
                <div>
                 <p> <strong>From: </strong>{flight.source["Name"]} - {flight.source["IataCode"]}</p>
                 <p>{flight.departureDate}</p>
                <p>{flight.outboundCarrier["Name"]}</p>
              </div>
              <div>
                 <p><strong>To: </strong> {flight.destination["Name"]} - {flight.destination["IataCode"]}</p>
                 <p>{flight.returnDate}</p>
                 <p>{flight.inboundCarrier["Name"]}</p>
               </div>
               <div>
                  <p><strong>Price for {props.model.getNumberOfPassengers()} persons:</strong> {flight.price * props.model.getNumberOfPassengers()} {flight.currency["Code"]}</p>
                  <Link to = '/purchase'>
                  <button className="button" id={flight.key} onClick={chooseFlight}> Buy </button>
                  </Link>
                  <button className="button" id={flight.key} onClick={onDelete}>Delete</button>
               </div>
           </div>
            )
      );

    if(savedFligthsArray.length == 0) {
        return(
            <div>
            <Link to="/search">
                <button className="button"> Back to search</button>
            </Link>
            <h1>You did not save any flight</h1>         
            </div>
        );
    }
    else{  
    return(
        <div>
            <Link to="/search">
                <button className="button"> Back to search</button>
            </Link>
            <h1>Ready to book your flight?</h1>
            <p><i>You're just one click away . . .</i></p>
            {savedFlights}   
         </div>
        );
    }
}

export default SavedSearches;