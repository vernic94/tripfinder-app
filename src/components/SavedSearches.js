import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

const SavedSearches = (props) => {

    return(
        <div>
            <Link to="/search">
                <button className="button"> Back to search</button>
            </Link>
            <h1>Ready to book your flight?</h1>
            <p><i>You're just one click away . . .</i></p>
         </div>
    );
}

export default SavedSearches;