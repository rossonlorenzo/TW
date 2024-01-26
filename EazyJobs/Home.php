<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  include_once './config/connection.php';
  include_once './models/azienda.php';
  include_once './models/annuncio.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();
  session_start();

  $aziende = new Azienda($db);
  $result = $aziende->getAll_byVote();
  $num = $result->rowCount();

  if($num > 0) {
        $str_aziende = "";
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
          $abbreviatedMedia = number_format($media, 0);

          $str_aziende .= 
          "<li id='aziende-" . $id . "'>\n" .
          "<div class='header-aziende'>\n" .
          "<h3><a href='Aziende.php?id=" . $id . "' aria-label=\"Scopri l'azienda " . $nome . "\">" . $nome . "</a></h3>\n" .
          "<img src='./assets/logos/". $id ."_logo.png' alt='Logo azienda " . $nome ."'>\n" .
          "</div>\n" .
          "<div class='azienda-grid'>\n" .
          "<h4>settore:</h4> <p>" . $settore . "</p>\n" .
          "<h4>valutazione:</h4>\n" .
          "<div class='valutazione-container'>\n" .
              "<span class='nascosto'>" . $abbreviatedMedia . " su 5</span>\n" .
              "<div class='valutazione-media' aria-hidden='true' data-rating='" . $media . "'></div>\n" .          
          "</div>\n" .          
          "</li>" . "\n";
        }
  } else {
        echo json_encode(
          array('message' => 'Nessuna azienda trovata')
        );
  }
  
  $annunci = new Annuncio($db);
  $result = $annunci->getAll();
  $num = $result->rowCount();

  if($num > 0) {
        $str_professione = "";
        $str_locazione = "";
        $duplicate = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
          if(!in_array($titolo, $duplicate)){
            array_push($duplicate, $titolo);
            $str_professione .= "<option value='" . $titolo . "'> \n";
          }
          if(!in_array($locazione, $duplicate)){
            array_push($duplicate, $locazione);
            $str_locazione .= "<option value='" . $locazione . "'> \n";
          }
        }
  } else {
        echo json_encode(
          array('message' => 'Nessuna azienda trovata')
        );
  }

  //$result->free();

  $nomefile = "./templates/Home.html";
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
  
  $contenuto = str_replace("<!-- suggerimenti-professione-placeholder -->", $str_professione, $contenuto);
  $contenuto = str_replace("<!-- suggerimenti-locazione-placeholder -->", $str_locazione, $contenuto);
  $contenuto = str_replace("<!-- aziende-placeholder -->", $str_aziende, $contenuto);
  
  echo $contenuto;