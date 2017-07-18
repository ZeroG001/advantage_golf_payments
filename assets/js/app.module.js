
(function(){

    var payApp = angular.module('payApp', ['registrationForm', 'paymentForm' ]);


    payApp.controller('PayAppController', function($scope) {

        $scope.name = "blayne";

        $scope.authorize = {
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
                            {
                                "name": "favorite_color",
                                "value": "blue"
                            }
                        ]
                    }
                }
            }
        }


    });

    payApp.component('helloWorld', {
        template: 'Hello {{$ctrl.name}}',
        controller: function(){
            this.name = "Blayne";
        }
    })


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
                    }
                ]
            }
        }
    }
}



*/