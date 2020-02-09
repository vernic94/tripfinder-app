import React from 'react';
import { Link } from "react-router-dom";
import Flights from "./Flights";

const PurchaseView = (props) => {

//     let boughtFlight = (  
//         <div>
//              <div>
//                <p> From: {props.chosenFlight.source["Name"]} - {props.chosenFlight.source["IataCode"]}</p>
//                <p>{props.chosenFlight.departureDate}</p>
//                <p>{props.chosenFlight.outboundCarrier["Name"]}</p>
//             </div>
//             <div>
//                <p>To: {props.chosenFlight.destination["Name"]} - {props.chosenFlight.destination["IataCode"]}</p>
//                <p>{props.chosenFlight.returnDate}</p>
//                <p>{props.chosenFlight.inboundCarrier["Name"]}</p>
//              </div>
//              <div>
//                 <p>Price: {props.chosenFlight.price} {props.chosenFlight.currency["Code"]}</p>
//                 <Link to="/search">
//                 <button className="button"> Back to search</button>
//                 </Link>
//              </div>
//              </div>
//         );
// console.log(boughtFlight)

return(
    <div>
       {props.chosenFlight}
    </div>
  );
}

export default PurchaseView;