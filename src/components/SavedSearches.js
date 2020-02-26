import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

const SavedSearches = (props) => {

    let counter= 0;
    let deleteCounter = 0;
    let SavedFlightArray = [];

    function getFlight(id) {
        // let selectedFlight = props.model.getSavedFlightArrayObj().filter(() => id == id);
        let selectedFlight = props.model.getSavedFlightArrayObj()
        if(selectedFlight !== []){
            props.model.setSelectedFlight(selectedFlight[id]);
        }
    }

    function buySaved(e) {
        console.log("e.target.id",e.target.id);
        getFlight(e.target.id);
    }

    function onDelete(e) {
        getFlight(e.target.id);
        // let id = parseInt(e.target.id);
        // if(id === 0) {
        //     SavedFlightArray = props.model.getSavedFlightArrayObj();
        // }
        // let newSavedFlightArray = props.model.getSavedFlightArrayObj().filter(flight => SavedFlightArray.indexOf(flight) !== id)
        // props.model.deleteSavedFlight(newSavedFlightArray);
    }

    useEffect(() => {
        props.model.addObserver(update);

        return function cleanup() {
            props.model.removeObserver(props);
        };
    });

    function update(changes) {
        if (changes.action === "deletedFlight"){
            props.model.setSavedFlightArrayObj(changes.value)            
        }
    }

    let savedFlights = props.model.getSavedFlightArrayObj().map(flights =>
        (
        flights.map( flight =>
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
      )));

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