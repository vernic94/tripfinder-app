import React from 'react';
import { Link } from "react-router-dom";
import "../index.css";

 const Flights = (props) => {

    function getFlight(id) {
        let selectedFlight = flightInfo.filter(flight => id == flight.id);
        if(selectedFlight !== []){
            props.model.setSelectedFlight(selectedFlight);  
        }
    }

    function saveFlight(e){
        let selectedFlight = flightInfo.filter(flight => e.target.id == flight.id);
        props.model.saveFlightToDB(selectedFlight)
        alert("This flight has been saved!");
    }   
    
    function chooseFlight(e){
        getFlight(e.target.id);       
    }   

    let flightInfo = props.quotes.map((flight, index) =>
        ({
            source: props.places.find(a => a["PlaceId"] === flight["OutboundLeg"]["OriginId"]),
            destination: props.places.find(a => a["PlaceId"] === flight["OutboundLeg"]["DestinationId"]),
            price: flight["MinPrice"],
            departureDate: flight["OutboundLeg"]["DepartureDate"],
            returnDate: flight["InboundLeg"]["DepartureDate"],
            outboundCarrier: props.carriers.find(carrier => carrier["CarrierId"] === flight["OutboundLeg"]["CarrierIds"][0]),
            inboundCarrier: props.carriers.find(carrier => carrier["CarrierId"] === flight["InboundLeg"]["CarrierIds"][0]),
            currency: props.currencies[0],
            id: index
    }));    

    let flights = flightInfo.map(function (flight, index) {
            return  (       
                    <tr className="table-row" key={index}>
                        <td>{flight.source["Name"]} - {flight.source["IataCode"]}</td>
                        <td>{flight.destination["Name"]} - {flight.destination["IataCode"]}</td>
                        <td>{flight.departureDate}</td>
                        <td>{flight.outboundCarrier["Name"]}</td>
                        <td>{flight.returnDate}</td>
                        <td>{flight.inboundCarrier["Name"]}</td>
                        <td>{flight.price} {flight.currency["Code"]}</td>
                        <td><button className="button" id={flight.id} onClick={saveFlight}> Save</button></td>
                        <td>
                            <Link to ="/purchase">           
                            <button className="button" id={flight.id} onClick={chooseFlight}> Buy</button>  
                            </Link>
                        </td>
                    </tr>
            )
        });

//     if(flightInfo.length > 0) {
//         return(
//             <div>
//             <p><i>Not sure about booking <strong>RIGHT NOW</strong>?
//             <br></br><strong>No problem!</strong> Just click the save button to save the flight and book it later!
//             </i></p>
//             <h1> <strong>Search Results</strong></h1>
//             <div className="container-flight-table">
//                 <ul className="responsive-table">
//                 <li className="table-header">
//                         <div className="col col-1">From</div>
//                         <div className="col col-2">To</div>
//                         <div className="col col-3">Depart</div>
//                         <div className="col col-4">Return</div>
//                         <div className="col col-5">Depart Airline</div>
//                         <div className="col col-6">Return Airline</div>
//                         <div className="col col-7">Price Per Person</div>
//                         </li>
//     <li class="table-row">
//                 <tbody>
//                     {flights}
//                 </tbody>
//             </li>
//   </ul>
//             </div>
//         </div>
//         );
//     }
if(flightInfo.length > 0) {
    return(
        <div>
        <p><i>Not sure about booking <strong>RIGHT NOW</strong>?
        <br></br><strong>No problem!</strong> Just click the save button to save the flight and book it later!
        </i></p>
        <h1> <strong>Search Results</strong></h1>
        <div>
        <ul className="table-header">
                    <th>From</th>
                    <th>To</th>
                    <th>Departure Date</th>
                    <th>Airline</th>
                    <th>Return Date</th>
                    <th>Airline</th>
                    <th>Price Per Person</th>
            <tbody  className="table-row" >
                {flights} 
            </tbody>
            </ul>
        </div>
    </div>
    );
}
    else{
        return (
            <div>
            <div>
                <h3><em>No flights available</em></h3>
                <p> <strong>From: </strong>{props.model.departurePlace["PlaceName"]} - {props.model.departurePlace["PlaceId"]}</p>
                <p>{props.model.departureDate}</p>
            </div>
            <div>
                <p><strong>To: </strong> {props.model.arrivalPlace["PlaceName"]} - {props.model.arrivalPlace["PlaceId"]}</p>
               <p>{props.model.returnDate}</p>
            </div>
            <div>
                <p>Please try searching on different dates or destinations</p>
            </div>
            </div>
        )    
    }
    
}

export default Flights;