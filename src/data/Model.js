import ObservableModel from "./ObservableModel";
import * as constants from "./apiConfig";

const BASE_URL = constants.ENDPOINT;
const httpOptions = {
  headers: { "X-Mashape-Key": constants.API_KEY }
};

class Model extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 1;
    this.getNumberOfGuests();
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

//Returns all the dishes on the menu.
getAllDestinations() {
    return this.favoriteDestinations;
}

// //Returns all ingredients for all the dishes on the menu.
// getAllIngredients() {
//   //flat() removes empty slots in new array
//    let dishIngredients = this.getFullMenu().map(dish => dish.extendedIngredients).flat();
//    this.notifyObservers({type:"dishIngredients", value: dishIngredients});
//   return dishIngredients;
// }

//Returns the total price of the flight
getTotalPrice() {
   let totalPrice = this.selectedFligth * this.getNumberOfGuests();
   this.notifyObservers({type:"totalPrice", value: totalPrice});
   return totalPrice;
}

//Adds the passed destination to favorite destinations.
addDestinationToFavorits(destination) {
  this.favoriteDestinations.push(destination);
  
  /*compose an "event" with the "new" type, and pass the index of a new dish*/
  this.notifyObservers({type:"newDestination", index:this.favoriteDestinations.length-1});
}

//Removes dish with specified id from menu
removeDestinationFromFavorites(DestinationId) {

  function matchingId(destination){
    return destination.DestinationId !== DestinationId; //returns dishes that don't have the same id as the one we want to remove
  }
  //create new array with all dishes that don't have the specific id we want to remove
  this.favoriteDestinations = this.favoriteDestinations.filter(matchingId);

  /*compose an "event" with the "removedDish" type and pass the new array */
  this.notifyObservers({type:"removedDestination", value: this.favoriteDestinations})
}

 getDestination(DestinationId){
  return fetch(BASE_URL + "/apiservices/browseroutes/v1.0/US/USD/en-US/SFO-sky/ORD-sky/2020-09-01  /recipes/search?type=" + DestinationId + '/information',{
    headers: {
      'X-Mashape-Key': constants.API_KEY
    }
  }).then(response => {
    this.checkStatus(response)
    return response.json()
  });
}

checkStatus(response) {
  if(response.status === 200) {
    return
  }
  else {
    console.log('ERROR');
  }
}

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllFlights(destination,date) {
    const url = BASE_URL+ "/apiservices/browseroutes/v1.0/US/USD/en-US/SFO-sky/ORD-sky/2020-09-01" + destination + "&date=" + date;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of Model
const modelInstance = new Model();
export default modelInstance;
