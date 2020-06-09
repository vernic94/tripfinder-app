import React from 'react';
import { Link } from "react-router-dom";

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
                    <tr key={index}>
                        <td>{flight.source["Name"]} - {flight.source["IataCode"]}</td>
                        <td>{flight.destination["Name"]} - {flight.destination["IataCode"]}</td>
                        <td>{flight.departureDate}</td>
                        <td>{flight.returnDate}</td>
                        <td>{flight.outboundCarrier["Name"]}</td>
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

    if(flightInfo.length > 0) {
        return(
            <div>
            <table>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Depart</th>
                        <th>Return</th>
                        <th>Depart Airline</th>
                        <th>Return Airline</th>
                        <th>Price Per Person</th>
                    </tr>
                </thead>
                <tbody>
                    {flights}
                </tbody>
            </table>
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
        //     <div>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th>From</th>
        //                 <th>To</th>
        //                 <th>Depart</th>
        //                 <th>Return</th>
        //                 <th>Depart Airline</th>
        //                 <th>Return Airline</th>
        //                 <th>Price Per Person</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <td>{props.model.departurePlace["PlaceName"]} - {props.model.departurePlace["PlaceId"]}</td>
        //                 <td>{props.model.arrivalPlace["PlaceName"]} - {props.model.arrivalPlace["PlaceId"]}</td>
        //                 <td>{props.model.departureDate}</td>
        //                 <td>{props.model.returnDate}</td>
        //                 <td>-</td>
        //                 <td>-</td>
        //                 <td>-</td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </div>
        )    
    }
 
    
}

export default Flights;