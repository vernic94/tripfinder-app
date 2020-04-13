import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import * as firebase from 'firebase';

const SavedSearches = (props) => {

    let counter= 0;
    let deleteCounter = 1;
    let [savedFlisgthsArray, setSavedFlightsArray]= useState([]);

    function getFlight(id) {
        if(savedFlisgthsArray !== []){
            props.model.setSelectedFlight(savedFlisgthsArray[id]);
        }
    }

    function buySaved(e) {
        console.log("e.target.id",e.target.id);
        getFlight(e.target.id);
    }

    function onDelete(e) {
        props.model.deleteSavedFlight(e.target.id);
        console.log("e.target.id",e.target.id);
    }

    useEffect(() => {
        props.model.fetchSavedFlightArray();
        props.model.addObserver(update);
        console.log("here")
        return function cleanup() {
            props.model.removeObserver(props);
        };
    }, []);

    function update(changes) {
        //reset state containing flights
        if (changes.action === "deletedFlight" || changes.action == "fetchSavedFlightObj"){
            console.log("hola " + changes.value)
            setSavedFlightsArray(changes.value);            
        }
    }

    
    let savedFlights = savedFlisgthsArray.map( flight =>
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
                  <Link to ="/purchase">
                  <button className="button" id={counter++} onClick={buySaved}> Buy</button> 
                  </Link>
                  <button className="button" id={deleteCounter++} onClick={onDelete}>Delete</button>
           </div>
           </div>
            )
      );

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

export default SavedSearches;