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

    // Add to this arry for each tab;
    $scope.tabs = [true, false, false, false];

    $scope.processing_payment = false;

    //index = index number of current tab
    $scope.nextTab = function(index) {
      $scope.tabs[index] = false;
      $scope.tabs[index + 1] = true;
    }

    //index = index number of current tab
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
              "refId": "",
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

      $scope.authorize.createTransactionRequest.refId = new Date().getTime().toString().substring(5);


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

      // Jump to another tab by clicking one of the tab buttons
  $scope.showTab = function(tabNum) {

    if ( $scope.tabs[0] == true ) {
        if( !$scope.checkRegistrationForm() ) {
          return false;
        }
    }

  if( $scope.tabs[1] == true ) {
    if(!$scope.checkPaymentForm()) {
      return false;
    }
  }

    for (var i = 0; i < $scope.tabs.length; i++) {
      $scope.tabs[i] = false;
    }
    // Change tab to the index number provided
    $scope.tabs[tabNum] = true;

  }


      // Update the list of guests that will be acompanying the main guest.
      $scope.updateGuests = function() {

        guestsString =  $scope.guests[0] + "," + $scope.guests[1] + "," + $scope.guests[2];
        $scope.authorize.createTransactionRequest.transactionRequest.userFields.userField[0].value = guestsString;

      }


      // Check if the registration form is valid
      $scope.checkRegistrationForm = function() {
        if ( $scope.golf_outing_registration_form.$valid ) {
          return true
        } else {
          return false;
        }
      }


      // Check if at least one of the checkboxes are selected.
      $scope.checkRegistrationCheckField = function() {
        for (i in $scope.prices) {
          if ( $scope.prices[i].selected == true ) {
            return false;
          } else {
            continue;
          }
        }
        return true;
    }

      // Check valid form field on Registration Form
      $scope.checkRegistrationField = function(fieldName) {
        // When field is DIRTY and INVALID
        if( $scope.golf_outing_registration_form[fieldName].$invalid && $scope.golf_outing_registration_form[fieldName].$dirty ||
            $scope.golf_outing_registration_form.$invalid && $scope.golf_outing_registration_form.$submitted && $scope.golf_outing_registration_form[fieldName].$invalid  ) {

          return true;
        }
        else {
            return false;
        }
      }


      $scope.checkPaymentForm = function() {
        if ( $scope.golf_outing_payment_form.$valid ) {
          return true;
        } else {
          return false;
        }
      }


      // Check valid form field on payment form
      $scope.paymentCheckField = function(fieldName) {
        if( $scope.golf_outing_payment_form[fieldName].$invalid && $scope.golf_outing_payment_form[fieldName].$dirty ||
            $scope.golf_outing_payment_form.$invalid && $scope.golf_outing_payment_form.$submitted && $scope.golf_outing_payment_form[fieldName].$invalid ) {
          return true;
        }
        else {
            return false;
        }
      }

      $scope.checkFormAndContinue = function(index) {

        if(index == 0) {
          if($scope.checkRegistrationForm()) {
            $scope.nextTab(0);
          }
        }

        if(index == 1) {
          if($scope.checkPaymentForm()) {
            $scope.nextTab(1);
          }
        }

      }



      // sned data via ajax
      $scope.sendData = function() {

        $scope.processing_payment = true;

        // Check if form is $scope.isFormValid = function() {
        if ( true ) {
        // if ( $scope.adv_golf_outing_form.$valid ) {

          //$http.get('assets/actions/authorizeNet/charge-credit-card.php').then(function(response) {});
          $http({method: "POST", data: $scope.authorize, url: 'assets/actions/authorizeNet/charge-credit-card.php'}).
            then( function( response ) {

              console.log(response);

              $scope.processing_payment = false;

              // Show Transaction Errors
              if(response.data.match(/\(6\)/i) ) {
                $scope.showTab(1);
                $scope.ajaxResponse = response.data;
              }

              // Show Transaction Errors
              if(response.data.match(/\(8\)/i) ) {
                $scope.showTab(1);
                $scope.ajaxResponse = response.data;
              }

              if( response.data.match(/100/i) ) {
                $scope.showTab(3);

                // Clear all fields. really bad way to do it...
                $scope.authorize.createTransactionRequest.refId = new Date().getTime().toString().substring(5);
                $scope.authorize.createTransactionRequest.transactionRequest.transactionType.amount = 0 ;
                $scope.authorize.createTransactionRequest.transactionRequest.payment.creditCard.cardNumber = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.payment.creditCard.expirationDate = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.payment.creditCard.cardCode = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.billTo.firstName = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.billTo.lastName = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.billTo.company = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.billTo.address = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.billTo.city = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.billTo.state = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.billTo.zip = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.billTo.country = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.shipTo.firstName = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.shipTo.lastName = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.shipTo.company = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.shipTo.address = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.shipTo.city = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.shipTo.state = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.shipTo.zip = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.shipTo.country = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.userFields.userField[0].value = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.userFields.userField[1].value = "" ;
                $scope.authorize.createTransactionRequest.transactionRequest.userFields.userField[2].value = "" ;

                for( i in $scope.prices ) {
                  $scope.prices[i].selected = false;
                }

                  // Send Email to Client When finished
                  $http({method: "POST", data: $scope.authorize, url: 'assets/actions/sendEmail.php'}).then( function(response) {
                    console.log(response.data);

                      /*
                        if ( response.data == "success" ) {
                          console.log('email has been successfull sent');
                        } else {
                        console.log('there was a problem sending the email - ' + response.data);
                      }
                    */
                  });


              }

            });
        }
        else {
          alert("Error occured when trying to connect to payment system. Transaction Cancelled");
        }

      }

    }]);

})()
