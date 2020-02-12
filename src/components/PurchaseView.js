import React from 'react';
import { Link } from "react-router-dom";

const PurchaseView = (props) => {

  let boughtFlight = props.model.getSelectedFlight().map(flight =>
          (
              <div>
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
                    <p><strong>Total Price:</strong> {flight.price * props.model.getNumberOfPassengers()} {flight.currency["Code"]}</p>
             </div>
             </div>
        ));

console.log("boughtflight in purchase",boughtFlight)

return(
    <div>
        <Link to="/search">
          <button className="button"> Back to search</button>
        </Link>
        <h1>You're all set!</h1>
        <h3><i>Time to pack your bags!</i></h3>
        <h3> Here's your flight information: </h3>
        {boughtFlight}
    </div>
  );
}

export default PurchaseView;