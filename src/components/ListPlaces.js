import React, { useState } from 'react';
import Places from "./Places";

const ListPlaces = () => {

    let [city, setCity] = useState('');
    let [date, setDate] = useState('');

    const uriEncodedCity = encodeURIComponent(city);
    //create the responseObj variable and the function to change it 
    //by calling the useState function
    //we are raping the variables in an array (destructuring) 
    //to easily access values inside arrays or objects- bcs we know 
    //the useState function returns an array with a variable as the first element and a function as the second
    //we pass the useState function the starting value of the variable(empty object)
    //since we expect the future value to be a JSON object
    let [responseObj, setResponseObj] = useState({});

    function getListPlaces() {
        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${uriEncodedCity}`, {
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
                    <h2>Find all places</h2>
                    {/* <div>
                        {JSON.stringify(responseObj)}
                    </div> */}
                    <button onClick={getListPlaces}> Get Places</button>
                    <Places responseObj={responseObj} />
                </div>
            );
        }

export default ListPlaces;