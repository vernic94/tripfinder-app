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
              <div key={index}>
                  <div>
                   <p> <strong>From: </strong>{flight.source["Name"]} - {flight.source["IataCode"]}</p>
                   <p>{flight.departureDate}</p>
                   <p>{flight.outboundCarrier["Name"]}</p>
                </div>
                <div>
                   <p><strong>To: </strong> {flight.destination["Name"]} - {flight.destination["IataCode"]}</p>
                   <p>{flight.returnDate}</p>
                   <p>{flight.inboundCarrier["Name"]}</p>
                 </div>
                 <div>
                    <p><strong>Price per person:</strong> {flight.price} {flight.currency["Code"]}</p>
                    <button className="button" id={flight.id} onClick={saveFlight}> Save</button> 
                    <Link to ="/purchase">           
                    <button className="button" id={flight.id} onClick={chooseFlight}> Buy</button>  
                    </Link>      
                 </div>
               </div>
            )
        });

    if(flightInfo.length > 0) {
        return(
            <div>
                {flights}
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
            </div>
        )    
    }
 
    
}

export default Flights;