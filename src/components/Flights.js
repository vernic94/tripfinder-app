import React, {useState} from 'react';
import { Link } from "react-router-dom";
import PurchaseView from './PurchaseView';

 const Flights = (props) => {

    let [boughtFlightId , setBoughtFlightId] = useState({});
    let [boughtFlight , setBoughtFlight] = useState({});
    let [buyFlight, setBuyFlight] = useState(false);
    let [confirmPurchase, setConfirmPurchase] = useState(false);

    function saveFlight(flight){
       // console.log(flight)
    }

   function getSelectedFlight(id) {
        let selectedFlight = flightInfo.filter(flight => id == flight.quoteId);
        if(selectedFlight !== []){
            setBoughtFlight(selectedFlight);
        }
   }

    function chooseFlight(e){
        getSelectedFlight(e.target.id); 
        setBuyFlight(true);
        setConfirmPurchase(true);
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
                   <p> From: {flight.source["Name"]} - {flight.source["IataCode"]}</p>
                   <p>{flight.departureDate}</p>
                   <p>{flight.outboundCarrier["Name"]}</p>
                </div>
                <div>
                   <p>To: {flight.destination["Name"]} - {flight.destination["IataCode"]}</p>
                   <p>{flight.returnDate}</p>
                   <p>{flight.inboundCarrier["Name"]}</p>
                 </div>
                 <div>
                    <p>Price: {flight.price} {flight.currency["Code"]}</p>
                    <button className="button" onClick={saveFlight(flight)}> Save</button>
                   
                    <button className="button" id={flight.quoteId} onClick={chooseFlight}> Buy</button>
                    
                 </div>
               </div>
            )
        });
        console.log("flights:",flights)

    return(
        <div>
           {flights}
          
           {buyFlight ? <PurchaseView model = {props.model} chosenFlight={boughtFlight} /> : null}
           {/* {confirmPurchase ? 
            <Link to ="/purchase">
            <button className="button"> Confirm Purchase</button> 
            </Link> 
           : null} */}
        </div>
      );
 
    
}

export default Flights;