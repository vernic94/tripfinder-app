import React, {useState, useEffect} from 'react';

 const Flights = (props) => {

    // let [responseFlights, setResponseFlights] = useState({});
    // let [error, setError] = useState(false);
   //let [loading, setLoading] = useState(false);
   

    // let flightInfo = null;
    // switch(useState()){
    //     case loading:
    //         flightInfo = <em>Loading...</em>
    //         break;
    //     // case !loading:
    //     default:
    //         flightInfo = responseFlights.map((flight) =>
    //    <p> City: {flight["PlaceName"]} - Airport: {flight["PlaceId"]} - Time: {flight.date}}</p>
    //    ); 
    //    console.log(responseFlights)
    //         break;
    //     // default:
    //     //    flightInfo = <b>Failed to load data, please try again</b>;
    //     //    break;
    // }
    let quotesMinPrice = props.quotes.map(quotes =>
        quotes["MinPrice"]);
      let quoteId = props.quotes.map(quotes =>
        quotes["QuoteId"]);
      let outboundQuotes = props.quotes.map(quotes => 
       quotes["OutboundLeg"]);
      let destId = outboundQuotes.map(info => info["DestinationId"]);
      let depDate = outboundQuotes.map(info => info["DepartureDate"]);
      let originIddep = outboundQuotes.map(info => info["OriginId"]);

      let inboundQuotes = props.quotes.map(quotes => 
        quotes["InboundLeg"]);
      let returndestId = inboundQuotes.map(info => info["DestinationId"]);
      let originIdreturn = inboundQuotes.map(info => info["OriginId"]);
      let returnDate = inboundQuotes.map(info => info["DepartureDate"]);

      let flightPlaces = props.places.map(info =>
        (info["PlaceId"], info["IataCode"], info["Name"], info["CountryName"]));

      let flightCarriers = props.carriers.map(info =>
        info["Name"]);

      
        console.log(quotesMinPrice)
        //let flights = props.responseFlights.map((flight, key) => 
    return(
       <div>
          <ul> 
            <div>
              <p>{quoteId}</p>
              From
              <p>{destId}{depDate}</p>
              to
              <p>{returndestId}{returnDate}{flightPlaces}</p>
              {flightCarriers}
              <p>Price: {quotesMinPrice}</p>
            </div>
          </ul>
        </div>

     
      );
 
    
}

export default Flights;