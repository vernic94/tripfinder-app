import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';
import Header2 from './Header2';

const SavedSearches = (props) => {
    let [savedFligthsArray, setSavedFlightsArray]= useState([]);
    let [boughtFlight, setBoughtFlight] = useState([]);
    let [showLoader, setShowLoader] = useState(true);
    let [showText, setShowtext] = useState(false);

    function onDelete(e) {
        props.model.deleteSavedFlight(e.target.id);
        alert("This flight will be deleted!");
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
            if(savedFligthsArray.length == 0){
                setShowtext(true);
            } 
            setShowLoader(false);          
        }
        if (changes.action == "setSelectedFlight"){
            setBoughtFlight(changes.value);   
            setShowLoader(false);       
        }
    }

    let savedFlights = savedFligthsArray.map(flight =>
      (       
        <tr className="table-row" >
            <td>{flight.source["Name"]} - {flight.source["IataCode"]}</td>
            <td>{flight.destination["Name"]} - {flight.destination["IataCode"]}</td>
            <td>{flight.departureDate}</td>
            <td>{flight.outboundCarrier["Name"]}</td>
            <td>{flight.returnDate}</td>
            <td>{flight.inboundCarrier["Name"]}</td>
            <td>{flight.price} {flight.currency["Code"]}</td>
            <td> <button className="button" id={flight.key} onClick={onDelete}>Delete</button></td>
            <td>
            <Link to = '/purchase'>
            <button className="button" id={flight.key} onClick={chooseFlight}> Buy </button>
            </Link>
            </td>
        </tr>    
        ));
    

    if(savedFligthsArray.length != 0){  
    return(
        <div>
            <Header2></Header2>
             <div className="align-center">
            {showLoader ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : null }
            <h1 className="welcome-text">Ready to book your flight?</h1>
            <p><i>You're just one click away . . .</i></p>
            <table className=" table-header">
                    <th>From</th>
                    <th>To</th>
                    <th>Departure Date</th>
                    <th>Airline</th>
                    <th>Return Date</th>
                    <th>Airline</th>
                    <th>Price Per Person</th>
                <tbody  className="table-row" >
                    {savedFlights} 
                </tbody>
            </table>  
        </div>
         </div>
        );
    }
    else{
        return(
            <div>
            <Header2></Header2>
            <div className= "align-center">
            {showLoader ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : null }
            {showText ? <h1>You have no saved flights yet!</h1> : null}       
            </div>
            </div>
        );
    }
}

export default SavedSearches;