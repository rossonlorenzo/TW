<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  $nomefile = "./templates/Accedi.html";
  $contenuto = file_get_contents($nomefile);

  $errors = isset($_GET['errors']) ? json_decode(urldecode($_GET['errors']), true) : [];

  $emailErrore = isset($errors['email']) ? htmlspecialchars($errors['email']) : '';
  $passwordErrore = isset($errors['password']) ? htmlspecialchars($errors['password']) : '';
  $credenzialiErrore = isset($errors['credenziali']) ? htmlspecialchars($errors['credenziali']) : '';

  $contenuto = str_replace("email-errore-placeholder", $emailErrore, $contenuto);
  $contenuto = str_replace("password-errore-placeholder", $passwordErrore, $contenuto);
  $contenuto = str_replace("credenziali-errore-placeholder", $credenzialiErrore, $contenuto);

  echo $contenuto;
?>