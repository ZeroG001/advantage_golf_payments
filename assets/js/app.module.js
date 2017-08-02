(function(){

    var payApp = angular.module('payApp', [ 'paymentForm', 'registrationForm' ]);


    payApp.controller('PayAppController', ['$scope', '$http', function($scope, $http) {

    // In html make it so that fields attach to authorize. Use a method to shorten it.


    // Item Prices
    $scope.prices = {
      "foursome" : { "price" : 460, "selected" : false, "label" : "Foursome"},
      "singlePlayer" : { "price" : 115, "selected" : false, "label" : "Single Player"},
      "dinnerGuest" : { "price" : 50, "selected" : false, "label" : "Dinner Guest"},
      "holeSponsor" : { "price" : 100, "selected" : false, "label" : "Hole Sponsor"},
      "drinkSponsor" : { "price" : 250, "selected" : false, "label" : "Drink Sponsor"},
      "goldDinner" : { "price" : 500, "selected" : false, "label" : "Gold Dinner"},
      "silverLunch" : { "price" : 350, "selected" : false, "label" : "Silver Lunch"},
      "bronzePutting" : { "price" : 250, "selected" : false, "label" : "Bronze Putting"}
    };

    $scope.tabs = [true, false, false];

    //index = index number of current tab
    $scope.nextTab = function(index) {
      $scope.tabs[index] = false;
      $scope.tabs[index + 1] = true;
    }

    $scope.prevTab = function(index) {
      $scope.tabs[index] = false;
      $scope.tabs[index - 1] = true;
    }

      // AUthorize json
      $scope.authorize = {
          "createTransactionRequest": {
              // "merchantAuthentication": {
              //     "name": "6VdY4URw86P",
              //     "transactionKey": "3b2zDK52bKK8Ax6z"
              // },
              "refId": "123456",
              "transactionRequest": {
                  "transactionType": "authCaptureTransaction",
                  "amount": "0",
                  "payment": {
                      "creditCard": {
                          "cardNumber": "",
                          "expirationDate": "",
                          "cardCode": ""
                      }
                  },
                  "billTo": {
                      "firstName": "",
                      "lastName": "",
                      "company": "",
                      "address": "",
                      "city": "",
                      "state": "",
                      "zip": "",
                      "country": ""
                  },
                  "shipTo": {
                      "firstName": "",
                      "lastName": "",
                      "company": "",
                      "address": "",
                      "city": "",
                      "state": "",
                      "zip": "",
                      "country": ""
                  },
                  "userFields": {
                      "userField": [
                          {
                              "name": "Foursome Guests",
                              "value": ""
                          },
                          {
                              "name": "emailAddress",
                              "value": ""
                          },
                          {
                              "name": "Services",
                              "value": ""
                          }
                      ]
                  }
              }
          }
      }


      $scope.validateCardNumber = function() {
        //  alert("card number validated");
        // $scope.authorize.createTransactionRequest.transactionRequest.payment.creditCard.cardNumber = "23";
      }

      // Guest list
      $scope.guests = ["","",""];

      $scope.ajaxResponse = "";

      // Updates the total price. Also adds a list of services selected to model
      $scope.updatePrice = function() {
        total = 0;
        services_selected = [];

        for (i in $scope.prices) {
          if($scope.prices[i].selected == true) {
            total += $scope.prices[i].price;
            services_selected.push($scope.prices[i].label);
          }
        }

        $scope.authorize.createTransactionRequest.transactionRequest.amount = total;
        $scope.authorize.createTransactionRequest.transactionRequest.userFields.userField[2].value  = services_selected.toString();
        // $scope.price = total;
      }



      // Update the list of guests that will be acompanying the main guest.
      $scope.updateGuests = function() {

        guestsString =  $scope.guests[0] + "," + $scope.guests[1] + "," + $scope.guests[2];
        $scope.authorize.createTransactionRequest.transactionRequest.userFields.userField[0].value = guestsString;

      }


      // Add the products purchase to the list.
      $scope.updateProductsPurchased = function() {

      }


      // sned data via ajax
      $scope.sendData = function() {

        // Check if form is $scope.isFormValid = function() {
        if ( true ) {
        // if ( $scope.adv_golf_outing_form.$valid ) {

          //$http.get('assets/actions/authorizeNet/charge-credit-card.php').then(function(response) {});
          $http({method: "POST", data: $scope.authorize, url: 'assets/actions/authorizeNet/charge-credit-card.php'}).
            then( function( response ) {
              $scope.ajaxResponse = response.data;
            });
        }
        else {
          alert("No");
        }


      }


    }]);

})()

