import React from "react"
import modelInstance from "../data/Model"

const tomorrowDateD = () => {

    let todayDate = modelInstance.departureDate;
    let tomorrowDate;

    function getYear() {
        let year = todayDate.slice(0, 4);
        return parseInt(year);
    }
    function getMonth() {
        let month = todayDate.slice(5, 7);
        return parseInt(month);
    }
    function getDay() {
        let day = todayDate.slice(8, 10);
        return parseInt(day);
    }

    function daysInMonth(m){
        var d= new Date(2020, m, 0);
        return d.getDate();
    }

    function getTomorrow() {
        //kollar om det är sista dagen på året
        if(getMonth() === 12) {
            if(getDay() === daysInMonth(getMonth())) {
                tomorrowDate = (getYear() + 1) + "-01-01"
                return;
            }
        }
        //kollar om det är sista dagen på månaden
        else if(getDay() === daysInMonth(getMonth())) {
            //kollar om det är månad 9 eller lägre
            if(getMonth() < 10) {
                tomorrowDate = getYear() + "-0" + (getMonth() + 1) + "-01"
                return;
            }
            else {
                tomorrowDate = getYear() + "-" + (getMonth() + 1) + "-01"
                return;
            }
        }
        if(getMonth() < 10) {
            tomorrowDate = getYear() + "-0" + getMonth() + "-" + (getDay() + 1)
        }
        else {
            tomorrowDate = getYear() + "-" + getMonth() + "-" + (getDay() + 1)
        }
        
    }

    getTomorrow();
    
    return tomorrowDate;
}
export default tomorrowDateD;