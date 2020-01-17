import ObservableModel from "./ObservableModel";
import * as constants from "./apiConfig";

const BASE_URL = constants.ENDPOINT;
const httpOptions = {
  headers: { "X-Mashape-Key": constants.API_KEY }
};

class Model extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
    this.dishesForMenu=[];
    this.id = 1;
  }

  updateStateForButton(type, query) {
    console.log(type+ " : " + query)
    this.notifyObservers({up:"StateChange", value: type, cat: query });
  }

  GetdetailId(){
    return this.id;
  }

  setDetailId(id){
    this.id = id;
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

  //Returns the dishes that are on the menu for selected type
  getSelectedDishes(type) {
    let selectedDishes = this.getFullMenu().filter(dish => dish.type === type);
    this.notifyObservers({type:"selectedDishType", value: selectedDishes});
    return selectedDishes;
}

//Returns all the dishes on the menu.
getFullMenu() {
    return this.dishesForMenu;
}

//Returns all ingredients for all the dishes on the menu.
getAllIngredients() {
  //flat() removes empty slots in new array
   let dishIngredients = this.getFullMenu().map(dish => dish.extendedIngredients).flat();
   this.notifyObservers({type:"dishIngredients", value: dishIngredients});
  return dishIngredients;
}

//Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
getTotalMenuPrice() {
   let totalMenuPrice = this.getFullMenu() * this.getNumberOfGuests();
   this.notifyObservers({type:"totalMenuPrice", value: totalMenuPrice});
   return totalMenuPrice;
}

//Adds the passed dish to the menu.
addDishToMenu(dish) {
  this.dishesForMenu.push(dish); //push adds new items to end of array and returns new length
  
  /*compose an "event" with the "new" type, and pass the index of a new dish*/
  this.notifyObservers({type:"newDish", index:this.dishesForMenu.length-1});
}

//Removes dish with specified id from menu
removeDishFromMenu(id) {

  function matchingId(dish){
    return dish.id !== id; //returns dishes that don't have the same id as the one we want to remove
  }
  //create new array with all dishes that don't have the specific id we want to remove
  this.dishesForMenu = this.dishesForMenu.filter(matchingId);

  /*compose an "event" with the "removedDish" type and pass the new array */
  this.notifyObservers({type:"removedDish", value: this.dishesForMenu})
}
getDish(id){
  return fetch('http://sunset.nada.kth.se:8080/iprog2/group/15/recipes/' + id + '/information',{
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
  getAllDishes(type,query) {
    const url = BASE_URL+ "/recipes/search?type=" + type + "&query=" + query;
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
