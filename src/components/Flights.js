import React, {useState} from 'react';
import { Link } from "react-router-dom";
import PurchaseView from './PurchaseView';

 const Flights = (props) => {

    let [boughtFlight , setBoughtFlight] = useState({});
    let [buyFlight, setBuyFlight] = useState(false);

    function saveFlight(flight){
        console.log(flight)
    }

    function chooseFlight(flight){
        console.log(flight)
        setBuyFlight(true);
        setBoughtFlight(flight);
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
            currency: props.currencies[0]
        }));    
        console.log("flightinfo:"+ flightInfo)

    let flights = flightInfo.map(function (flight, index) {
            return  (       
              <React.Fragment key={index}>
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
                   
                    <button className="button" onClick={chooseFlight}> Buy</button>
                    {buyFlight ? <PurchaseView chosenFlight={boughtFlight}/> : null}
                  
                 </div>
                 </React.Fragment>
            )
        });
    console.log("flights:"+flights)

    return(
        <div>
           {flights}
        </div>
      );
 
    
}

export default Flights;