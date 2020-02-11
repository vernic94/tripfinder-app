import React from 'react';
import { Link } from "react-router-dom";

const PurchaseView = (props) => {

    let boughtFlight = props.chosenFlight.map(flight=>
          (
              <div>
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
                <Link to="/search">
                <button className="button"> Back to search</button>
                </Link>
             </div>
             </div>
        ));

console.log("boughtflight in purchase",boughtFlight)

return(
    <div>
        <p>here is the flight</p>
        {boughtFlight}
    </div>
  );
}

export default PurchaseView;