<?php

$recepient = "targonsky97@gmail.com";
$sitename = "Naprok.com";

$fullname = trim($_POST["name"]);
$email = trim($_POST["email"]);
$text = trim($_POST["message"]);
$message = "Name: $name \nPhone: $phone \nMessage: $text";

$pagetitle = "New message from \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>