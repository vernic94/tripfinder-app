import React from "react"
import modelInstance from "../data/Model"

const yesterdayDateR = () => {

    let todayDate = modelInstance.returnDate;
    let yesterdayDate;

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

    function getYesterday() {
        //Kollar om det är första dagen på året
        if(getMonth() === 1) {
            if(getDay() === 1) {
                yesterdayDate = (getYear() - 1) + "-12-31"
                return;
            }
        }
        //Kollar om det är första dagen på månaden
        else if(getDay() === 1) {
            if(getMonth() < 10) {
                yesterdayDate = getYear() + "-0" + (getMonth() - 1) + "-" + daysInMonth(getMonth - 1)
                return;
            }
            else {
                yesterdayDate = getYear() + "-" + (getMonth() - 1) + "-" + daysInMonth(getMonth - 1)
                return;
            }
        }
        if(getMonth() < 10) {
            yesterdayDate = getYear() + "-0" + getMonth() + "-" + (getDay() - 1)
        }
        else {
            yesterdayDate = getYear() + "-" + getMonth() + "-" + (getDay() - 1)
        }
    }

    getYesterday()
    return yesterdayDate;
}
export default yesterdayDateR;