<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  $nomefile = "./templates/Errore404.html";
  $contenuto = file_get_contents($nomefile);
  echo $contenuto;

?>