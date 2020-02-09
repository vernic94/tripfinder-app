import React from 'react';

const airports = (props) => {

    let items = props.places.map((item, key) => 
      <p onClick={() => props.changePlace(item)}>City: {item["PlaceName"]} - Airport: {item["PlaceId"]}</p>
    );
    return( 
        <div>
            {items}
        </div>
    );
}

export default airports;