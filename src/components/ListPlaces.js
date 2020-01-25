import React, { useState } from 'react';
import Airport from "./Airport";

const ListPlaces = (e) => {

    let [departureDestinations, setDepartureDestinations] = useState([]);
    let [departurePlace, setDeparturePlace] = useState({});
    let [airportDepartureVisible, setAirportDepartureVisible] = useState(false);
    let [inputDepValue, setInputDepValue] = useState("");
    let [arrivalDestinations, setArrivalDestinations] = useState([]);
    let [arrivalPlace, setArrivalPlace] = useState({});
    let [airportArrivalVisible, setAirportArrivalVisible] = useState(false);
    let [inputArrValue, setInputArrValue] = useState("");

   function changeDeparturePlace(place) {
        setDeparturePlace(place);
        setAirportDepartureVisible(false);
        setInputDepValue(place["PlaceId"])
   }

   function changeArrivalPlace(place) {
        setArrivalPlace(place);
        setAirportArrivalVisible(false);
        setInputArrValue(place["PlaceId"])
}
   // let [date, setDate] = useState('');

    //const uriEncodedCity = encodeURIComponent(city);
    //create the responseObj variable and the function to change it 
    //by calling the useState function
    //we are raping the variables in an array (destructuring) 
    //to easily access values inside arrays or objects- bcs we know 
    //the useState function returns an array with a variable as the first element and a function as the second
    //we pass the useState function the starting value of the variable(empty object)
    //since we expect the future value to be a JSON object
    let [responsePlaces, setResponseObj] = useState({});

    function getDepartureDestinations(city) {
        setAirportDepartureVisible(true);
        setInputDepValue(city);
        getListPlaces(city);
        if (responsePlaces["Places"]) {
            setDepartureDestinations(responsePlaces["Places"]);
        }
    }

    function getArrivalDestinations(city) {
        setAirportArrivalVisible(true);
        setInputArrValue(city);
        getListPlaces(city);
        if (responsePlaces["Places"]) {
            setArrivalDestinations(responsePlaces["Places"]);
        }
    }

    function getListPlaces(city) {
        console.log("city: " + city)
        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/SE/SEK/en-GB/?query=${city}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "c39fe6fd37msh6e8f3b732af02f4p12babdjsn0de5bb8f0b5f"
            }
        })
        .then(response => response.json())
        .then(response => {
            setResponseObj(response)
        })
        .catch(err => {
            console.log(err);
        });
    }

    return(
        <div>
            <p>
            From <input placeholder="Enter departure city or country" 
                    type="text"
                    id="departurePlace"
                    value={inputDepValue}
                    onChange={(e) => getDepartureDestinations(e.target.value)}>
                </input>
                {airportDepartureVisible ? <Airport places={departureDestinations} changePlace={changeDeparturePlace}></Airport> : null }
            To <input placeholder="Enter destination city or country" 
                    type="text"
                    id="arrivalPlace"
                    value={inputArrValue}
                    onChange={(e) => getArrivalDestinations(e.target.value)}>
                </input>
                {airportArrivalVisible ? <Airport places={arrivalDestinations} changePlace={changeArrivalPlace}></Airport> : null }
            </p>           
            <button onClick={getListPlaces}> Get Places</button>
            {/* <Places responseObj={responseObj} /> */}
        </div>
    );
}

export default ListPlaces;