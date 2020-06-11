import "../index.css";
import ListPlaces from "./ListPlaces";
import Dates from "./Dates";
import Passengers from "./Passengers";
import React, {useState} from 'react';
import Flights from "./Flights";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';
import Header from "./Header";
import tomorrowDateD from "./TomorrowDateD";
import yesterdayDateD from "./YesterdayDateD"
import tomorrowDateR from "./TomorrowDateR";
import yesterdayDateR from "./YesterdayDateR";

  const SearchFlights = (props) => {

  let [showFlights, setShowFlights ] = useState(false);
  let [showLoader, setShowLoader] = useState(false);
  let [showDateButtons, setShowDateButtons] = useState(false);
  let [showTomorrowDeparture, setTomorrowDeparture ] = useState(false);
  let [showYesterdayDeparture, setYesterdayDeparture ] = useState(false);
  let [showTomorrowReturn, setTomorrowReturn ] = useState(false);
  let [showYesterdayReturn, setYesterdayReturn ] = useState(false);

  let tomorrowD = tomorrowDateD()
  let yesterdayD = yesterdayDateD()
  let tomorrowR = tomorrowDateR();
  let yesterdayR = yesterdayDateR();
    
    function handleOnClick(option) {
        setShowLoader(true);
        setShowFlights(false);
        setDate(option);
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
            case 5: 
                setShowFlights(true);
                break;
            default:
        }
    }

  function checkMandatoryFields(){
    if((props.model.getDepartureDate() == "") || (props.model.getReturnDate() == "") || (props.model.departurePlace["PlaceId"] == undefined) || (props.model.arrivalPlace["PlaceId"] == undefined)){
      alert("The fields: From, To, Departure and Return are mandatory! Please fill in all necessary information and search again.")
    }
    else{
      handleOnClick(5);
    }
  }
      
  function getResponseFlights(option){
    props.model.getAllFlights()
    .then(response => {
      props.model.setflightQuotes(response["Quotes"])        
      props.model.setflightPlaces(response["Places"] );
      props.model.setflightCarriers(response["Carriers"]);  
      props.model.setflightCurrencies(response["Currencies"]);
      setShowLoader(false); 
      setShowDateButtons(true);  
      showFlightsTrue(option)   
      })
      .catch(err => {
          console.log(err);
      });
  }

  return ( 
    <div className="welcome-text">
       <Header></Header>

      <h1>Where would you like to go?</h1>
  
      <ListPlaces model={props.model} />
      <h4> Which days would you like to go?</h4>
      <Dates model={props.model} />
      <Passengers model={props.model} />
     
      <button className="button" onClick={checkMandatoryFields}> Search </button>
        <div className="align-center">
          {showDateButtons ?
          <div>
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
            </div> : null}
      {showLoader ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : null }
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

export default SearchFlights;
