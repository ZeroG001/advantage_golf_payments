(function(){

    var payApp = angular.module('payApp', [ 'paymentForm', 'registrationForm' ]);


    payApp.controller('PayAppController', ['$scope', '$http', function($scope, $http) {



      // In html make it so that fields attach to authorize. Use a method to shorten it.




      // Item Prices
      $scope.prices = {
        "foursome" : { "price" : 460, "selected" : false},
        "singlePlayer" : { "price" : 115, "selected" : false},
        "dinnerGuest" : { "price" : 50, "selected" : false},
        "holeSponsor" : { "price" : 100, "selected" : false},
        "drinkSponsor" : { "price" : 250, "selected" : false},
        "goldDinner" : { "price" : 500, "selected" : false},
        "silverLunch" : { "price" : 350, "selected" : false},
        "bronzePutting" : { "price" : 250, "selected" : false}
      };


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
                  "amount": "5",
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
      $scope.guests = ["","","",""];

      $scope.ajaxResponse = "";


      $scope.updatePrice = function() {
        total = 0;

        for (i in $scope.prices) {
          if($scope.prices[i].selected == true) {
            total += $scope.prices[i].price;
          }
        }

        $scope.authorize.createTransactionRequest.transactionRequest.amount = total;
        // $scope.price = total;
      }


      $scope.updateGuests = function() {
        guestsString =  $scope.guests[0] + "," + $scope.guests[1] + "," + $scope.guests[2] + "," + $scope.guests[3];
        $scope.authorize.createTransactionRequest.transactionRequest.userFields.userField[0].value = guestsString;
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
