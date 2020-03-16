import React, { useState, useEffect } from 'react';
import Airport from "./Airport";

const ListPlaces = (props) => {

    //declare new state variables [current state, method to update the state]
    let [departureDestinations, setDepartureDestinations] = useState([]);
    let [airportDepartureVisible, setAirportDepartureVisible] = useState(false);
    let [inputDepValue, setInputDepValue] = useState("");
    let [arrivalDestinations, setArrivalDestinations] = useState([]);
    let [airportArrivalVisible, setAirportArrivalVisible] = useState(false);
    let [inputArrValue, setInputArrValue] = useState("");
    let [responseAirports, setResponseAirports] = useState({});

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
        setAirportDepartureVisible(true);
        setInputDepValue(city);
        getListPlaces(city);
        if (responseAirports["Places"]) {
            setDepartureDestinations(responseAirports["Places"]);
        }
    }

    function getArrivalDestinations(city) {
        setAirportArrivalVisible(true);
        setInputArrValue(city);
        getListPlaces(city);
        if (responseAirports["Places"]) {
            setArrivalDestinations(responseAirports["Places"]);
        }
    }

    function getListPlaces(city) {
       props.model.getAirports(city)
        .then(response => {
            setResponseAirports(response)
        })
        .catch(err => {
            console.log(err);
        });
    }

    function changeDeparturePlace(places) {
        props.model.setDeparturePlace(places);
    }

    function changeArrivalPlace(places) {
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
                {airportDepartureVisible ? <Airport places={departureDestinations} changePlace={changeDeparturePlace}></Airport> : null }
            
            To <input placeholder="Enter destination city or country" 
                    type="text"
                    value={inputArrValue}
                    onChange={(e) => getArrivalDestinations(e.target.value)}
                   >
                </input>
                {airportArrivalVisible ? <Airport places={arrivalDestinations} changePlace={changeArrivalPlace}></Airport> : null }
            </p>           
        </div>
    );
}

export default ListPlaces;