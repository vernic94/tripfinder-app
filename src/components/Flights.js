import React from 'react';

 const Flights = (props) => {

    function saveFlight(flight){
        
        console.log(flight)
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
        console.log(flightInfo)

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
                    <button className="button"> Buy</button>
                 </div>
                 </React.Fragment>
            )
        });
    console.log(flights)

    return(
        <div>
           {flights}
        </div>
      );
 
    
}

export default Flights;