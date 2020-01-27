// import {useState} from 'react';

// function useInputPlaces(initialValue) {
//     const [value, setValue] = useState(initialValue);
//     const reset = () => {
//     setValue(initialValue);
//     }
//     const bind = {
//         value,
//         onChange: e => {
//             getDestinations(e.target.value)
//         }
//     }
//     let [responsePlaces, setResponseObj] = useState({});
//     let [destinations, setDestinations] = useState([]);

//     function getDestinations(city) {
//         //setAirportVisible(true);
//         setValue(city);
//         getListPlaces(city);
//         if (responsePlaces["Places"]) {
//             setDestinations(responsePlaces["Places"]);
//         }
//     }

//     // function getArrivalDestinations(city) {
//     //     setAirportArrivalVisible(true);
//     //     setInputArrValue(city);
//     //     getListPlaces(city);
//     //     if (responsePlaces["Places"]) {
//     //         setArrivalDestinations(responsePlaces["Places"]);
//     //     }
//     // }

//     function getListPlaces(city) {
//         console.log("city: " + city)
//         fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/SE/SEK/en-GB/?query=${city}`, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
//             "x-rapidapi-key": "c39fe6fd37msh6e8f3b732af02f4p12babdjsn0de5bb8f0b5f"
//             }
//         })
//         .then(response => response.json())
//         .then(response => {
//             setResponseObj(response)
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }
//     return [value, bind, reset];
// }
// export default useInputPlaces