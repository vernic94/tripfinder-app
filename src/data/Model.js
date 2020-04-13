
import ObservableModel from "./ObservableModel";
import * as constants from "./apiConfig";
import * as firebase from 'firebase';

class Model extends ObservableModel {
  constructor() {
    super();
    this.flightQuotes = [];
    this.flightPlaces = [];
    this.flightCarriers = [];
    this.flightCurrencies = [];
    this.numberOfPassengers = 1;
    this.departurePlace = {};
    this.arrivalPlace = {};
    this.departureDate = "";
    this.returnDate = "";
    this.flightsData = [];
    this.selectedFlight = [];
    this.data = [];
   // this.database = firebase.database().ref('fligt/'+ "savedfligt");
    // this.state = {
    //   currentDBFlights: [],
    // }
  }


  fetchSavedFlightArray() {
    console.log("here in fetchSave")
    var databaseRef =  firebase.database().ref('flights');
    databaseRef.once("value")
      .then((snapshot) => { 
        let flightList = snapshot.val();
        console.log(Object.keys(flightList))
        flightList = Object.keys(flightList).map(key => flightList[key][0])
        this.notifyObservers({action: "fetchSavedFlightObj", value: flightList})
    })        
  }

  saveFlightToDB(flight) {
    var databaseRef =  firebase.database().ref('flights/');
    const newKey = databaseRef.push().key;
    databaseRef.child(newKey).set(flight);
  }

  deleteSavedFlight(id){
    var database = firebase.database().ref('flights/');     
    database.child(id - 1).remove().then( obj => {
      console.log(obj)
      this.notifyObservers({action: "deletedFlight", value: this.SavedFlightArrayObj})

    })
    this.SavedFlightArrayObj.splice(id - 1, 1);
  }

  getflightQuotes() {
    return this.flightQuotes;    
  }

  getflightPlaces() {
    return this.flightPlaces;
  }

  getflightCarriers() {
    return this.flightCarriers;
  }

  getflightCurrencies() {
    return this.flightCurrencies;
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

  getSelectedFlight() {
    return this.selectedFlight;
  }  

  getCurrentDBFlights(){
    return this.currentDBFlights;
  }

  setflightCarriers(num) {
    this.flightCarriers = num;
  }

  setflightCurrencies(num) {
    this.flightCurrencies = num;
  }
  setflightPlaces(num) {
    this.flightPlaces = num;
  }
  setflightQuotes(num) {
    this.flightQuotes = num;
  }

  setNumberOfPassengers(num) {
    this.numberOfPassengers = num;
    this.notifyObservers({action: "setNumberOfPassengers", value: num})
  }


  setArrivalPlace(place) {
    this.arrivalPlace = place;
    //localStorage.setItem("cityArr", place["PlaceId"]);
    this.notifyObservers({action: "setArrivalPlace", value: place})
  }

  setDeparturePlace(place) {    
    this.departurePlace = place;
    //console.log(place);
   // localStorage.setItem("cityDet", place["PlaceId"]);         
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

  setSelectedFlight(selectedFlight){
    this.selectedFlight = selectedFlight;
    this.notifyObservers({action: "setSelectedFlight", value: selectedFlight})
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
