<?php 

$content = $_POST['content'];

// Mail of sender
$mail_from = $_POST['email']; 

$name = $_POST['name'];
// From 
$header = "from: $name <$mail_from>";

// Enter your email address
$to = 'coxysm@gmail.com';
$send_contact = mail($to, "Message from CoxStephen.com", $content, $header);

?>