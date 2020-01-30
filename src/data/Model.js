
import ObservableModel from "./ObservableModel";
import * as constants from "./apiConfig";

class Model extends ObservableModel {
  constructor() {
    super();
    this.numberOfPassengers = 1;
    this.departurePlace = {};
    this.arrivalPlace = {};
    this.departureDate = "";
    this.returnDate = "";
    this.flightsData = [];
    // this.state = {
    //   setFlights: {},
    // }
  }

  getNumberOfPassengers() {
    return this.numberOfPassengers;
  }

  getArrivalPlace() {
    return this.arrivalPlace;
  }

  getDeparturePlace() {
    return this.departurePlace;
  }

  getDepartureDate() {
    return this.departureDate;
  }

  getReturnDate() {
    return this.returnDate;
  }

  setNumberOfPassengers(num) {
    this.numberOfPassengers = num;
    this.notifyObservers({action: "setNumberOfPassengers", value: num})
  }

  setArrivalPlace(place) {
    this.arrivalPlace = place;
    this.notifyObservers({action: "setArrivalPlace", value: place})
  }

  setDeparturePlace(place) {
    this.departurePlace = place;
    this.notifyObservers({action: "setDeparturePlace", value: place})
  }

  setDepartureDate(date) {
    this.departureDate = date;
    this.notifyObservers({action: "setDepartureDate", value: date})
  }

  setReturnDate(date) {
    this.returnDate = date;
    this.notifyObservers({action: "setReturnDate", value: date})
  }

  getAirports(city){
    return fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/SE/SEK/en-GB/?query=${city}`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": constants.ENDPOINT,
        "x-rapidapi-key": constants.API_KEY
        }
    })
    .then(response => {
      if(response.status !== 200){
        throw new Error("failed to load airports")
      }
      return response.json();
    })
  }

  getAllFlights() {
    const depValue = this.departurePlace["PlaceId"];
    const arrValue = this.arrivalPlace["PlaceId"];
   
    console.log(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/SE/SEK/en-SE/${depValue}/${arrValue}/${this.departureDate}/${this.returnDate}`)
    return fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/SE/SEK/en-SE/${depValue}/${arrValue}/${this.departureDate}/${this.returnDate}`, 
    {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": constants.ENDPOINT,
        "x-rapidapi-key": constants.API_KEY
      }
    }).then(response => {
      if(response.status !== 200){
        throw new Error("failed to load flights")
      }
      return response.json()
    })
  }
}

// Export an instance of Model
const modelInstance = new Model();
export default modelInstance;
