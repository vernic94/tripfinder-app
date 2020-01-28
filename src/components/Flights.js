import React from 'react';

const flights = (props) => {
  
    let items = props.places.map((item, key) => 
    <p onClick={() => props.changePlace(item)}>City: {item["PlaceName"]} - Airport: {item["PlaceId"]}</p>
        );
    return( 
          <div>
              {items}
          </div>
    );
}
    //return(  
        // <div>
        //     {props.responseObj.cod === 200 ?
            // <div>
            //     <p><strong>Country: {props.responseObj.CountryName}</strong></p>
            //     <p><strong>PlaceName: {props.responseObj.PlaceName}</strong></p>
            //     <p><strong>Airport id: {props.responseObj.PlaceID}</strong></p>
            // </div>
        //     :null
        //     }
        // </div>


export default flights;