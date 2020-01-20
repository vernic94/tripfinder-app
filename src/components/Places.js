import React from 'react';

const places = (props) => {
    return( 
        // <div>
        //     {props.responseObj.cod === 200 ?
            <div>
                <p><strong>Country: {props.responseObj.CountryName}</strong></p>
                <p><strong>PlaceName: {props.responseObj.PlaceName}</strong></p>
                <p><strong>Airport id: {props.responseObj.PlaceID}</strong></p>
            </div>
        //     :null
        //     }
        // </div>
    );
}

export default places;