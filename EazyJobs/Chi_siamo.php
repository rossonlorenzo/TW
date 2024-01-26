<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  session_start();

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  $nomefile = "./templates/Chi_siamo.html";
  $contenuto = file_get_contents($nomefile);

  if (isset($_SESSION['user_id'])) {
    $contenuto = str_replace("php-placeholder", "User.php", $contenuto);
    $contenuto = str_replace("link-placeholder", "Area personale", $contenuto);
  } else if (isset($_SESSION['admin_id'])) {
      $contenuto = str_replace("php-placeholder", "Admin.php", $contenuto);
      $contenuto = str_replace("link-placeholder", "Area personale", $contenuto);
  } else {
      $contenuto = str_replace("php-placeholder", "Accedi.php", $contenuto);
      $contenuto = str_replace("link-placeholder", "Accedi", $contenuto);
  }

  echo $contenuto;
?>