<?php

$recepient = "targonsky97@gmail.com";
$sitename = "Naprok";

$name = trim($_POST["fullname"]);
$email = trim($_POST["email"]);
$text = trim($_POST["message"]);
$message = "Name: $name \nEmail: $email \nMessage: $text";

$pagetitle = "New message from \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");