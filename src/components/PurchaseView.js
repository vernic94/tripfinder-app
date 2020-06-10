import React from 'react';
import { Link } from "react-router-dom";
import Header2 from "./Header2";

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
                    <p><strong>Price for {props.model.getNumberOfPassengers()} persons:</strong> {flight.price * props.model.getNumberOfPassengers()} {flight.currency["Code"]}</p>
             </div>
             </div>
        ));

return(
    <div>
       <Header2></Header2>
      <div className="align-center">
        <h1>You're all set!</h1>
        <h3> Here's your flight information: </h3>
        {boughtFlight}
    </div>
    </div>
  );
}

export default PurchaseView;