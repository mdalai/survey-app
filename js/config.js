"use strict";

/**
 * Config module which defines Firebase URL.
 * @module myApp/config
 */
var app = angular.module("myApp.config", []);

// your Firebase URL goes here

 var config = {
    apiKey: "AIzaSyCnH4fy8r9Z1_JmiWX357PeCrFv0ZG4hBk",
    authDomain: "rangemed-c6714.firebaseapp.com",
    databaseURL: "https://rangemed-c6714.firebaseio.com",
    storageBucket: "rangemed-c6714.appspot.com",
    messagingSenderId: "565893987500"
  };
firebase.initializeApp(config);

// double-check whether the app has been configured
if (config.authDomain === "angularfire-survey.firebaseapp.com") {
    angular.element(document.body).html("<h1>Please configure app/js/config.js before running!</h1>");
}
