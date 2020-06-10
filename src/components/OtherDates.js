import "../index.css";
import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Flights from "./Flights";
import tomorrowDateD from "./TomorrowDateD";
import yesterdayDateD from "./YesterdayDateD"
import tomorrowDateR from "./TomorrowDateR";
import yesterdayDateR from "./YesterdayDateR"
    
const SearchFlights = (props) => {
     
    let [showTomorrowDeparture, setTomorrowDeparture ] = useState(false);
    let [showYesterdayDeparture, setYesterdayDeparture ] = useState(false);
    let [showTomorrowReturn, setTomorrowReturn ] = useState(false);
    let [showYesterdayReturn, setYesterdayReturn ] = useState(false);

    let tomorrowD = tomorrowDateD()
    let yesterdayD = yesterdayDateD()
    let tomorrowR = tomorrowDateR();
    let yesterdayR = yesterdayDateR();
    
    // //spain
    // let departurePlace = {
    //         CityId: "-sky",
    //         CountryId: "ES-sky",
    //         CountryName: "Spain",
    //         PlaceId: "ES-sky",
    //         PlaceName: "Spain",
    //         RegionId: ""
    // }
    // //amsterdam
    // let arrivalPlace = {
    //         CityId: "AMST-sky",
    //         CountryId: "NL-sky",
    //         CountryName: "Netherlands",
    //         PlaceId: "AMS-sky",
    //         PlaceName: "Amsterdam",
    //         RegionId: ""
    // }
    // let departureDate = "2020-06-14"
    // let returnDate = "2020-06-21"
    // let numberOfPassengers = 1;
    
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
                // code block
        }
    }

    function showFlightsFalse() {
        setTomorrowDeparture(false);
        setYesterdayDeparture(false);
        setTomorrowReturn(false)
        setYesterdayReturn(false)
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
        
        <div className="otherDates">
            <Link to = "/search">
            <button className="button"> Return to Search </button>
            </Link>
            <button className="button" onClick={() => handleOnClick(1)}> Show Flights from {tomorrowD} - {props.model.returnDate} </button>
            <button className="button" onClick={() => handleOnClick(2)}> Show Flights from {yesterdayD} - {props.model.returnDate} </button>
            <button className="button" onClick={() => handleOnClick(3)}> Show Flights from {props.model.departureDate} - {tomorrowR} </button>
            <button className="button" onClick={() => handleOnClick(4)}> Show Flights from {props.model.departureDate} - {yesterdayR} </button>
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
        </div>
      );
}
    
    export default SearchFlights;