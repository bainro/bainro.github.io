<?php

$email_to = "michael@alignmentventures.com";
$email_subject = "Contact Alignment Ventures Email";
$name = $_GET['name'];
$email_from = $_GET['email'];
$msg = $_GET['msg'];

$msg = wordwrap($msg,70);

$email_message = "Name: ". $name ."\n";
$email_message .= "Email:  ". $email_from ."\n";
$email_message .= "Message Body: ". $msg ."\n";

mail($email_to, $email_subject, $email_message);
?>
