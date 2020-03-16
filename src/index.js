import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCVROIjVhBzdK69OwROxJVqPfEskc2Ards",
    authDomain: "trippadvicer-project.firebaseapp.com",
    databaseURL: "https://trippadvicer-project.firebaseio.com",
    projectId: "trippadvicer-project",
    storageBucket: "trippadvicer-project.appspot.com",
    messagingSenderId: "667211405537",
    appId: "1:667211405537:web:9b371698082eef7b7ebfa0",
    measurementId: "G-69HJ73Q14B"
}



firebase.initializeApp(config)

ReactDOM.render( 
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
