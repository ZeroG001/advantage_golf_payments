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

      $scope.checkForm = function() {

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
          //$http.get('assets/actions/authorizeNet/charge-credit-card.php').then(function(response) {});
          $http({method: "POST", data: $scope.authorize, url: 'assets/actions/authorizeNet/charge-credit-card.php'}).
            then( function(response) {
              $scope.ajaxResponse = response.data;
            });
      }



    }]);


})()


/*
    -- Required Card Data (Backend) --




    -- Optional Card Data to be used (Backend) --

        profile
        - createProfile : true

        order
        - invoiceNumber
        - description

        customer
        - type : individual, business
        - id : merchant assiged id. up to 20 characters
        - email : Customer's valid email

        billTo
        - firstName
        - lastName
        - company
        - address : customers address
        - city
        - state
        - zip
        - country
        - phoneNumber



        shipTo ( have a "same as billing address" option )
        - firstName
        - lastName
        - company
        - address
        - city
        - state
        - zip
        - country : you can type anything here. Just use fixed dropdown

        retail
        - marketType : 0
        - deviceType : 8

        userFields ( Information is NOT stored in the transaction )
        - name
        - value


{
    "createTransactionRequest": {
        "merchantAuthentication": {
            "name": "6VdY4URw86P",
            "transactionKey": "3b2zDK52bKK8Ax6z"
        },
        "refId": "123456",
        "transactionRequest": {
            "transactionType": "authCaptureTransaction",
            "amount": "5",
            "payment": {
                "creditCard": {
                    "cardNumber": "5424000000000015",
                    "expirationDate": "1220",
                    "cardCode": "999"
                }
            },
            "billTo": {
                "firstName": "Ellen",
                "lastName": "Johnson",
                "company": "Souveniropolis",
                "address": "14 Main Street",
                "city": "Pecan Springs",
                "state": "TX",
                "zip": "44628",
                "country": "USA"
            },
            "shipTo": {
                "firstName": "China",
                "lastName": "Bayles",
                "company": "Thyme for Tea",
                "address": "12 Main Street",
                "city": "Pecan Springs",
                "state": "TX",
                "zip": "44628",
                "country": "USA"
            },
            "userFields": {
                "userField": [
                    {
                        "name": "Foursome Guests",
                        "value": "Mark Johnson, Lisa Simpson, Ron McDonald, Jessica Alba"
                    },

                        "name": "favorite_color",
                        "value": "blue"
                    },
                    {
                        "name":  "Services"
                    }
                ]
            }
        }
    }
} */
