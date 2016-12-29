"use strict";

/**
 * Controllers module which defines controllers.
 * @module myApp/controllers
 */
var app = angular.module("myApp.controllers", []);

// Survey controller
app.controller("surveyCtrl", function($scope, $firebaseArray) {
        
        var ref = firebase.database().ref('Survey001');
        // create a synchronized array
        $scope.surveys = $firebaseArray(ref);
        // timestamp
        $scope.timestamp = new Date().getTime();

        // hide success information/alert
        $scope.successInfo = false;
        $scope.surveyInfo = true;

        // open survey modal dialog
        $scope.takeSurvey = function () {
            $("#survey").modal("show");
        };
        
        // store data in this object
        // and set default values
        $scope.formData = {
            //"email": "Your Email",

            "rate1": "0",
            "rate2": "0",
            "comment": "",
            "timestamp": $scope.timestamp
        };
        
        /**
         * Update rating score to object.
         * @param {Number} rating - Star rating score.
         */
        $scope.updateRating = function(rating) {
            $scope.formData.rating = rating;
        };

        /**
         * Add survey to Firebase database.
         */
        $scope.addSurvey = function() {
            if($scope.formData.rate1 !="0" && $scope.formData.rate2!="0") {
                               
                // push data to Firebase
                $scope.surveys.$add($scope.formData).then(function() {
                    // dismiss survey modal dialog
                    //$("#survey").modal("hide");
                    // reset button loading state
                    //$btn.button("reset");
                    // show success information/alert
                    $scope.successInfo = true;
                    $scope.surveyInfo = false;
                });
            } else {
                alert("Please take the survey. Thanks.");
            }
        };

    }
);

// Login controller
app.controller("loginCtrl", function($scope, $location, Auth) {
        
        // temporary email and password placeholder
        //$scope.email = "admin@mydomain.com";
        //$scope.password = "password";
        
        /**
         * Login into app and redirect to result page
         */
        $scope.login = function() {
            
            $scope.authData = null;
            $scope.error = null;
            
            // change button to loading state
            //var $btn = $("#loginButton").button("loading");
            
            // authentication using an email / password combination
            Auth.$signInWithEmailAndPassword(
                $scope.email,
                $scope.password
            ).then(function(authData) {
                // the data contains all auth info
                $scope.authData = authData;
                // redirect to result page after successful login
                $location.path("/result");
                // reset button loading state
                //$btn.button("reset");
            }).catch(function(error) {
                // catch and display error if login fails
                $scope.error = error;
                // reset button loading state
                //$btn.button("reset");
            });
            
        };
    }
);

// Result controller
app.controller("resultCtrl", function($scope, $firebaseArray) {
        
        var ref = firebase.database().ref('Survey001');
        // download the data into local object
        $scope.results = $firebaseArray(ref);
        
    }
);