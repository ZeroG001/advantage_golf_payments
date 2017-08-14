<?php

  if ( $_SERVER['REQUEST_METHOD'] == "POST" ) {

    $params = json_decode(file_get_contents('php://input'));

    die("sending response back");
    require 'PHPMailerAutoload.php';

    $reomail = new PHPMailer();
    $reomail->isSMTP();
    $reomail->SMTPAuth      = true;
    $reomail->Host          = "smtp.office365.com";
    $reomail->Username      = 'info@realestateone.com';
    // $reomail->Password      = 'N0tbl@nk!';
    $reomail->Password      = '3Lyons04';
    $reomail->SMTPSecure    = 'tls';
    $reomail->port          = '587';
    $reomail->isHTML(true);
    // $reomail->SMTPDebug  = 1; <-- Un-comment for DETAILED errors.
    $reomail->WordWrap      = 50;
    $reomail->From          =  "info@realestateone.com"; /* change the from field */
    $reomail->FromName      =  "Advantage Realty";
    $mail->isHTML(true);                                  // Set email format to HTML
    //$mail->SMTPDebug = 3;                               // Enable verbose debug output


    $advPay_amount = $params->createTransactionRequest->transactionRequest->amount;
    $advPay_itemDescription = $params->createTransactionRequest->transactionRequest->userFields->userField[2]->value; // Not used
    $advPay_firstName = $params->createTransactionRequest->transactionRequest->billTo->firstName;
    $advPay_lastName = $params->createTransactionRequest->transactionRequest->billTo->lastName;;
    $advPay_company = $params->createTransactionRequest->transactionRequest->billTo->company;
    $advPay_address = $params->createTransactionRequest->transactionRequest->billTo->address;
    $advPay_city = $params->createTransactionRequest->transactionRequest->billTo->city;
    $advPay_state = $params->createTransactionRequest->transactionRequest->billTo->state;
    $advPay_zipcode = $params->createTransactionRequest->transactionRequest->billTo->zip;
    $advPay_country = $params->createTransactionRequest->transactionRequest->billTo->country;
    $advPay_guests = $params->createTransactionRequest->transactionRequest->userFields->userField[0]->value;
    $advPay_email = $params->createTransactionRequest->transactionRequest->userFields->userField[1]->value;
    $advPay_services = $params->createTransactionRequest->transactionRequest->userFields->userField[2]->value;

    $mail->Subject = 'Payment Confirmation - Advantage Realty Golf Outing';
    $mail->Body    = '<h1> Thank You </h1>
<h2> Your payment is being processed </h2>

<h3> Amount </h3>
<ul style="list-style: none; padding: 0px">
  <li>'.$advPay_amount.' </li>
</ul>

<h3> Info </h3>
<ul style="list-style: none; padding: 0px">
	<li> <strong>First Name:</strong> '.$advPay_firstName.'</li>
  <li> <strong>Last Name:</strong>'.$advPay_lastName.'</li>
  <li> <strong>Email Address:</strong>'.$advPay_email.'</li>
  <li> <strong>Services:</strong>'.$advPay_services.' </li>
  <li> <strong>Guests:</strong>'.$advPay_guests.'</li>
</ul>

<h3> Billing Info </h3>
<ul style="list-style: none; padding: 0px">
<li> <strong>City:</strong>'.$advPay_city.'</li>
<li> <strong>State:</strong>'.$advPay_state.'</li>
<li> <strong>Zipcode:</strong>'.$advPay_zipcode.'</li>
<li> <strong>Company:</strong>'.$advPay_company.'</li>
</ul>';

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo trim('success');
    }

}
