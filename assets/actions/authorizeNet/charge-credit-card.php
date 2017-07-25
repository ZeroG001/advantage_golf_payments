<?php


if($_SERVER['REQUEST_METHOD'] == "POST") {
  $params = json_decode(file_get_contents('php://input'));
  var_dump($params);
  die();
}

date_default_timezone_set ( "America/Detroit" );
require 'vendor/autoload.php';
use net\authorize\api\contract\v1 as AnetAPI;
use net\authorize\api\controller as AnetController;

define("AUTHORIZENET_LOG_FILE","phplog");

// Common setup for API credentials...Currently on Sandbox
  $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
  $merchantAuthentication->setName("6VdY4URw86P");
  $merchantAuthentication->setTransactionKey("3b2zDK52bKK8Ax6z");
  $refId = 'ref' . time();




  // Create the payment data for a credit card
  $creditCard = new AnetAPI\CreditCardType();
  $creditCard->setCardNumber("4111111111111111" );
  $creditCard->setExpirationDate( "2038-12");
  $paymentOne = new AnetAPI\PaymentType();
  $paymentOne->setCreditCard($creditCard);




  // Create order information*****
  $order = new AnetAPI\OrderType();
  $order->setInvoiceNumber("10101");
  $order->setDescription("Golf Shirts");




  // Set the customer's Bill To address **********
  $customerAddress = new AnetAPI\CustomerAddressType();
  $customerAddress->setFirstName("Ellen");
  $customerAddress->setLastName("Johnson");
  $customerAddress->setCompany("Souveniropolis");
  $customerAddress->setAddress("14 Main Street");
  $customerAddress->setCity("Pecan Springs");
  $customerAddress->setState("TX");
  $customerAddress->setZip("44628");
  $customerAddress->setCountry("USA");




  // Set the customer's identifying information ************
  $customerData = new AnetAPI\CustomerDataType();
  $customerData->setType("individual");
  $customerData->setId("99999456654");
  $customerData->setEmail("EllenJohnson@example.com");



  // Add some merchant defined fields. These fields won't be stored with the transaction,
  // but will be echoed back in the response. *****************
  $merchantDefinedField1 = new AnetAPI\UserFieldType();
  $merchantDefinedField1->setName("Guest 1");
  $merchantDefinedField1->setValue("Rom Mcdonald");

  $merchantDefinedField2 = new AnetAPI\UserFieldType();
  $merchantDefinedField2->setName("Guest 2");
  $merchantDefinedField2->setValue("Jonas Richardson");

  $merchantDefinedField3 = new AnetAPI\UserFieldType();
  $merchantDefinedField3->setName("Guest 3");
  $merchantDefinedField3->setValue("Ren Polowski");

  $merchantDefinedField4 = new AnetAPI\UserFieldType();
  $merchantDefinedField4->setName("Guest 4");
  $merchantDefinedField4->setValue("Justin Thompson");

  $merchantDefinedField5 = new AnetAPI\UserFieldType();
  $merchantDefinedField5->setName("emailAddress");
  $merchantDefinedField5->setValue("testemail@hotmail.com");


// Create a transaction
  $transactionRequestType = new AnetAPI\TransactionRequestType();
  $transactionRequestType->setTransactionType("authCaptureTransaction");
  $transactionRequestType->setAmount(151.51);
  $transactionRequestType->setPayment($paymentOne);
  $transactionRequestType->setBillTo($customerAddress);
  $transactionRequestType->setCustomer($customerData);
  $transactionRequestType->addToUserFields($merchantDefinedField1);
  $transactionRequestType->addToUserFields($merchantDefinedField2);
  $transactionRequestType->addToUserFields($merchantDefinedField3);
  $transactionRequestType->addToUserFields($merchantDefinedField4);
  $transactionRequestType->addToUserFields($merchantDefinedField5);



  $request = new AnetAPI\CreateTransactionRequest();
  $request->setMerchantAuthentication($merchantAuthentication);
  $request->setRefId( $refId);
  $request->setTransactionRequest($transactionRequestType);
  $controller = new AnetController\CreateTransactionController($request);
  $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);

if ($response != null)
{
  $tresponse = $response->getTransactionResponse();
  if (($tresponse != null) && ($tresponse->getResponseCode()=="1"))
  {
    echo "Charge Credit Card AUTH CODE : " . $tresponse->getAuthCode() . "\n";
    echo "Charge Credit Card TRANS ID  : " . $tresponse->getTransId() . "\n";
  }
  else
  {
    echo "Charge Credit Card ERROR :  Invalid response\n";
  }
}
else
{
  echo  "Charge Credit Card Null response returned";
}
?>




<?php
//   require 'vendor/autoload.php';
//
//   use net\authorize\api\contract\v1 as AnetAPI;
//   use net\authorize\api\controller as AnetController;
//
//   define("AUTHORIZENET_LOG_FILE", "phplog");
//
// function chargeCreditCard($amount)
// {
//     /* Create a merchantAuthenticationType object with authentication details
//        retrieved from the constants file */
//     $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
//     $merchantAuthentication->setName(\SampleCode\Constants::MERCHANT_LOGIN_ID);
//     $merchantAuthentication->setTransactionKey(\SampleCode\Constants::MERCHANT_TRANSACTION_KEY);
//
//     // Set the transaction's refId
//     $refId = 'ref' . time();
//
//     // Create the payment data for a credit card
//     $creditCard = new AnetAPI\CreditCardType();
//     $creditCard->setCardNumber("4111111111111111");
//     $creditCard->setExpirationDate("1226");
//     $creditCard->setCardCode("123");
//
//     // Add the payment data to a paymentType object
//     $paymentOne = new AnetAPI\PaymentType();
//     $paymentOne->setCreditCard($creditCard);
//
//     // Create order information
//     $order = new AnetAPI\OrderType();
//     $order->setInvoiceNumber("10101");
//     $order->setDescription("Golf Shirts");
//
//     // Set the customer's Bill To address
//     $customerAddress = new AnetAPI\CustomerAddressType();
//     $customerAddress->setFirstName("Ellen");
//     $customerAddress->setLastName("Johnson");
//     $customerAddress->setCompany("Souveniropolis");
//     $customerAddress->setAddress("14 Main Street");
//     $customerAddress->setCity("Pecan Springs");
//     $customerAddress->setState("TX");
//     $customerAddress->setZip("44628");
//     $customerAddress->setCountry("USA");
//
//     // Set the customer's identifying information
//     $customerData = new AnetAPI\CustomerDataType();
//     $customerData->setType("individual");
//     $customerData->setId("99999456654");
//     $customerData->setEmail("EllenJohnson@example.com");
//
//     // Add values for transaction settings
//     $duplicateWindowSetting = new AnetAPI\SettingType();
//     $duplicateWindowSetting->setSettingName("duplicateWindow");
//     $duplicateWindowSetting->setSettingValue("60");
//
//     // Add some merchant defined fields. These fields won't be stored with the transaction,
//     // but will be echoed back in the response.
//     $merchantDefinedField1 = new AnetAPI\UserFieldType();
//     $merchantDefinedField1->setName("customerLoyaltyNum");
//     $merchantDefinedField1->setValue("1128836273");
//
//     $merchantDefinedField2 = new AnetAPI\UserFieldType();
//     $merchantDefinedField2->setName("favoriteColor");
//     $merchantDefinedField2->setValue("blue");
//
//     // Create a TransactionRequestType object and add the previous objects to it
//     $transactionRequestType = new AnetAPI\TransactionRequestType();
//     $transactionRequestType->setTransactionType("authCaptureTransaction");
//     $transactionRequestType->setAmount($amount);
//     $transactionRequestType->setOrder($order);
//     $transactionRequestType->setPayment($paymentOne);
//     $transactionRequestType->setBillTo($customerAddress);
//     $transactionRequestType->setCustomer($customerData);
//     $transactionRequestType->addToTransactionSettings($duplicateWindowSetting);
//     $transactionRequestType->addToUserFields($merchantDefinedField1);
//     $transactionRequestType->addToUserFields($merchantDefinedField2);
//
//     // Assemble the complete transaction request
//     $request = new AnetAPI\CreateTransactionRequest();
//     $request->setMerchantAuthentication($merchantAuthentication);
//     $request->setRefId($refId);
//     $request->setTransactionRequest($transactionRequestType);
//
//     // Create the controller and get the response
//     $controller = new AnetController\CreateTransactionController($request);
//     $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);
//
//
//     if ($response != null) {
//         // Check to see if the API request was successfully received and acted upon
//         if ($response->getMessages()->getResultCode() == \SampleCode\Constants::RESPONSE_OK) {
//             // Since the API request was successful, look for a transaction response
//             // and parse it to display the results of authorizing the card
//             $tresponse = $response->getTransactionResponse();
//
//             if ($tresponse != null && $tresponse->getMessages() != null) {
//                 echo " Successfully created transaction with Transaction ID: " . $tresponse->getTransId() . "\n";
//                 echo " Transaction Response Code: " . $tresponse->getResponseCode() . "\n";
//                 echo " Message Code: " . $tresponse->getMessages()[0]->getCode() . "\n";
//                 echo " Auth Code: " . $tresponse->getAuthCode() . "\n";
//                 echo " Description: " . $tresponse->getMessages()[0]->getDescription() . "\n";
//             } else {
//                 echo "Transaction Failed \n";
//                 if ($tresponse->getErrors() != null) {
//                     echo " Error Code  : " . $tresponse->getErrors()[0]->getErrorCode() . "\n";
//                     echo " Error Message : " . $tresponse->getErrors()[0]->getErrorText() . "\n";
//                 }
//             }
//             // Or, print errors if the API request wasn't successful
//         } else {
//             echo "Transaction Failed \n";
//             $tresponse = $response->getTransactionResponse();
//
//             if ($tresponse != null && $tresponse->getErrors() != null) {
//                 echo " Error Code  : " . $tresponse->getErrors()[0]->getErrorCode() . "\n";
//                 echo " Error Message : " . $tresponse->getErrors()[0]->getErrorText() . "\n";
//             } else {
//                 echo " Error Code  : " . $response->getMessages()->getMessage()[0]->getCode() . "\n";
//                 echo " Error Message : " . $response->getMessages()->getMessage()[0]->getText() . "\n";
//             }
//         }
//     } else {
//         echo  "No response returned \n";
//     }
//
//     return $response;
// }
//
// if (!defined('DONT_RUN_SAMPLES')) {
//     chargeCreditCard(\SampleCode\Constants::SAMPLE_AMOUNT);
// }
?>
