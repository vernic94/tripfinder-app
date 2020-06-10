import React, { useState, useEffect } from 'react';
import Airport from "./Airport";
import Loader from 'react-loader-spinner';
import "../index.css";

const ListPlaces = (props) => {

    //declare new state variables [current state, method to update the state]
    let [departureDestinations, setDepartureDestinations] = useState([]);
    let [airportDepartureVisible, setAirportDepartureVisible] = useState(false);
    let [inputDepValue, setInputDepValue] = useState("");
    let [arrivalDestinations, setArrivalDestinations] = useState([]);
    let [airportArrivalVisible, setAirportArrivalVisible] = useState(false);
    let [inputArrValue, setInputArrValue] = useState("");
    let [responseAirports, setResponseAirports] = useState({});

    let [showDepLoader, setShowDepLoader] = useState(false);
    let [showArrLoader, setShowArrLoader] = useState(false);

    useEffect(() => {
        props.model.addObserver(update);

        return function cleanup() {
            props.model.removeObserver(props);
        };
    });

    function update(changes) {
        if (changes.action === "setDeparturePlace"){
            setAirportDepartureVisible(false);
            setInputDepValue(changes.value["PlaceId"])            
        }
        if (changes.action === "setArrivalPlace"){
            setAirportArrivalVisible(false);
            setInputArrValue(changes.value["PlaceId"])
        }
    }

    function getDepartureDestinations(city) {
        setShowDepLoader(true);
        setAirportDepartureVisible(true);
        setInputDepValue(city);
        getListPlaces(city);
        if (responseAirports["Places"]) {
            //setShowLoader(false)
            setDepartureDestinations(responseAirports["Places"]);
        }
    }

    function getArrivalDestinations(city) {
        setShowArrLoader(true);
        setAirportArrivalVisible(true);
        setInputArrValue(city);
        getListPlaces(city);
        if (responseAirports["Places"]) {
            //setShowLoader(false)
            setArrivalDestinations(responseAirports["Places"]);
        }
    }

    function getListPlaces(city) {
        //setShowLoader(true);
       props.model.getAirports(city)
        .then(response => {
            setShowDepLoader(false);
            setShowArrLoader(false);
            setResponseAirports(response)
        })
        .catch(err => {
            console.log(err);
        });
    }

    function changeDeparturePlace(places) {
        setShowDepLoader(false)
        props.model.setDeparturePlace(places);
    }

    function changeArrivalPlace(places) {
        setShowArrLoader(false)
        props.model.setArrivalPlace(places);
    }
   
    return(
        <div>
            <p>
            From <input placeholder="Enter departure city or country" 
                    type="text"
                    value={inputDepValue}
                    onChange={(e) => getDepartureDestinations(e.target.value)}
                   >
                </input>
                {showDepLoader ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : null }
                {airportDepartureVisible ? <Airport places={departureDestinations} changePlace={changeDeparturePlace}></Airport> : null }
            
            To <input placeholder="Enter destination city or country" 
                    type="text"
                    value={inputArrValue}
                    onChange={(e) => getArrivalDestinations(e.target.value)}
                   >
                </input>
                {showArrLoader ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : null }
                {airportArrivalVisible ? <Airport places={arrivalDestinations} changePlace={changeArrivalPlace}></Airport> : null }
            </p>           
        </div>
    );
}

export default ListPlaces;