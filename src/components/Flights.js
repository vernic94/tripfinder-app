import React, {useState, useEffect} from 'react';

const Flights = (props) => {

    // let [responseFlights, setResponseFlights] = useState({});
    // let [error, setError] = useState(false);
   let [loading, setLoading] = useState(false);
   

    // let flightInfo = null;
    // switch(useState()){
    //     case loading:
    //         flightInfo = <em>Loading...</em>
    //         break;
    //     // case !loading:
    //     default:
    //         flightInfo = responseFlights.map((flight) =>
    //    <p> City: {flight["PlaceName"]} - Airport: {flight["PlaceId"]} - Time: {flight.date}}</p>
    //    ); 
    //    console.log(responseFlights)
    //         break;
    //     // default:
    //     //    flightInfo = <b>Failed to load data, please try again</b>;
    //     //    break;
    // }
    return(  
        <div>
            {/* {loading ? <p>...Loading</p> : <div> {responseFlights.map((flight, key) => 
            <p>Departure City: {flight["Quotes"].flight["Places"].flight["Name"], key["Quotes"].key["OutboundLeg"].key["OriginId"]} ->  
            Destination ciity: {flight["Quotes"].flight["Places"].flight["Name"], key["Quotes"].key["OutboundLeg"].key["DestinationId"]}
            </p>)}</div> } */}
        </div>
        );
    }

export default Flights;