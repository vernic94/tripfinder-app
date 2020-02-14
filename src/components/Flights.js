import React, {useState} from 'react';
import { Link } from "react-router-dom";

 const Flights = (props) => {

    let [confirmPurchase, setConfirmPurchase] = useState(false);

    function getFlight(id) {
        let selectedFlight = flightInfo.filter(flight => id == flight.quoteId);
        if(selectedFlight !== []){
            props.model.setSelectedFlight(selectedFlight);
        }
    }
    //kör ut set´saved innan produktion
    function saveFlight(e,b){
        getFlight(e.target.id);
        props.model.setSavedFlightArrayObj();
        alert("This flight has been saved!!!");
    }   
    function chooseFlight(e,b){
        getFlight(e.target.id);       
    }   

    
 
    let flightInfo = props.quotes.map(flight =>
        ({
            source: props.places.find(a => a["PlaceId"] === flight["OutboundLeg"]["OriginId"]),
            destination: props.places.find(a => a["PlaceId"] === flight["OutboundLeg"]["DestinationId"]),
            price: flight["MinPrice"],
            departureDate: flight["OutboundLeg"]["DepartureDate"],
            returnDate: flight["InboundLeg"]["DepartureDate"],
            outboundCarrier: props.carriers.find(carrier => carrier["CarrierId"] === flight["OutboundLeg"]["CarrierIds"][0]),
            inboundCarrier: props.carriers.find(carrier => carrier["CarrierId"] === flight["InboundLeg"]["CarrierIds"][0]),
            currency: props.currencies[0],
            quoteId: flight["QuoteId"] -1,
    }));    
        
        console.log("flightinfo:", flightInfo)

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
                    <button className="button" id={flight.quoteId} onClick={saveFlight}> Save</button> 
                    <Link to ="/purchase">           
                    <button className="button" id={flight.quoteId} onClick={chooseFlight}> Buy</button>  
                    </Link>      
                 </div>
               </div>
            )
        });
        console.log("flights:",flights)

    return(
        <div>
           {flights}
        </div>
      );
 
    
}

export default Flights;