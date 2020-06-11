import "../index.css";
import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Flights from "./Flights";
import tomorrowDateD from "./TomorrowDateD";
import yesterdayDateD from "./YesterdayDateD"
import tomorrowDateR from "./TomorrowDateR";
import yesterdayDateR from "./YesterdayDateR";
import Header2 from "./Header2";
    
const OtherDates = (props) => {
     
    let [showTomorrowDeparture, setTomorrowDeparture ] = useState(false);
    let [showYesterdayDeparture, setYesterdayDeparture ] = useState(false);
    let [showTomorrowReturn, setTomorrowReturn ] = useState(false);
    let [showYesterdayReturn, setYesterdayReturn ] = useState(false);
    let [showFlights, setShowFlights ] = useState(false);

    let tomorrowD = tomorrowDateD()
    let yesterdayD = yesterdayDateD()
    let tomorrowR = tomorrowDateR();
    let yesterdayR = yesterdayDateR();
    
    function handleOnClick(option) {
        setDate(option)
        showFlightsFalse();
        getResponseFlights(option);     
    }

    function setDate(option) {
        switch(option) {
            case 1:
                props.model.setDepartureDate(tomorrowD)
                break;
            case 2:
                props.model.setDepartureDate(yesterdayD)
                break;
            case 3:
                props.model.setReturnDate(tomorrowR)
                break;
            case 4:
                props.model.setReturnDate(yesterdayR)
                break;
            default:
        }
    }

    function showFlightsFalse() {
        setTomorrowDeparture(false);
        setYesterdayDeparture(false);
        setTomorrowReturn(false);
        setYesterdayReturn(false);
        setShowFlights(false);
    }

    function showFlightsTrue(option) {
        switch(option) {
            case 1:
                setTomorrowDeparture(true);
                break;
            case 2:
                setYesterdayDeparture(true)
                break;
            case 3:
                setTomorrowReturn(true)
                break;
            case 4:
                setYesterdayReturn(true)
                break;
            default:
                // code block
        }
    }

          
    function getResponseFlights(option){
        props.model.getAllFlights()
            .then(response => {
                props.model.setflightQuotes(response["Quotes"])        
                props.model.setflightPlaces(response["Places"] );
                props.model.setflightCarriers(response["Carriers"]);  
                props.model.setflightCurrencies(response["Currencies"]);
                showFlightsTrue(option)        
            })
            .catch(err => {
              console.log(err);
            });
    }
    
      return (
        <div>
            {/* <Header2></Header2> */}
        <div className="align-center">
            <p>Quick-search on the availability on previous and next dates</p>
            <div className="dates-alignment">
            <div className="welcome-text">
            <p>Departure Date</p>
            <div className="dates-alignment">
            <button className="extra-dates arrow" onClick={() => handleOnClick(2)}>&laquo;</button>
            <p>{props.model.getDepartureDate()}</p>
            <button className="extra-dates arrow" onClick={() => handleOnClick(1)}>&raquo;</button>
            </div>
            </div>
            <div className="welcome-text">
            <p>Return Date</p>
            <div className="dates-alignment">
            <button className="extra-dates arrow" onClick={() => handleOnClick(4)}>&laquo;</button>
            <p>{props.model.getReturnDate()}</p>
            <button className="extra-dates arrow" onClick={() => handleOnClick(3)}>&raquo;</button>
            </div>
            </div>
            </div>   
            {showTomorrowDeparture ? <Flights 
                model={props.model} 
                quotes={props.model.getflightQuotes()} 
                places={props.model.getflightPlaces()} 
                carriers = {props.model.getflightCarriers()} 
                currencies={props.model.getflightCurrencies()}/>: null}
            {showYesterdayDeparture ? <Flights 
                model={props.model} 
                quotes={props.model.getflightQuotes()} 
                places={props.model.getflightPlaces()} 
                carriers = {props.model.getflightCarriers()} 
                currencies={props.model.getflightCurrencies()}/>: null}
            {showTomorrowReturn ? <Flights 
                model={props.model} 
                quotes={props.model.getflightQuotes()} 
                places={props.model.getflightPlaces()} 
                carriers = {props.model.getflightCarriers()} 
                currencies={props.model.getflightCurrencies()}/>: null}
            {showYesterdayReturn ? <Flights 
                model={props.model} 
                quotes={props.model.getflightQuotes()} 
                places={props.model.getflightPlaces()} 
                carriers = {props.model.getflightCarriers()} 
                currencies={props.model.getflightCurrencies()}/>: null}
            {showFlights? <Flights 
                    model={props.model} 
                    quotes={props.model.getflightQuotes()} 
                    places={props.model.getflightPlaces()} 
                    carriers = {props.model.getflightCarriers()} 
                    currencies={props.model.getflightCurrencies()}/> : null}
        </div>
        </div>
      );
}
    
    export default OtherDates;