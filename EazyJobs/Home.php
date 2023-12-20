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

  $aziende = new Azienda($db);
  $result = $aziende->getAll_byVote();
  $num = $result->rowCount();

  if($num > 0) {
        $str_aziende = "";
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $str_aziende .= 
          "<li id='aziende-" . $id . "'>\n" .
          "<div id='header-aziende'>\n" .
          "<h3>" . $nome . "</h3>\n" .
          "<img src='../assets/logos/SyncLab-logo.png' alt='SyncLab Logo'>\n" .
          "</div>\n" .
          "<div id='azienda-grid'>\n" .
          "<h4>settore:</h4> <p>" . $settore . "</p>\n" .
          "<h4>valutazione:</h4>\n" .
          "<div class='valutazione-media' data-rating='" . $media . "'></div>\n" .
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
  
  $contenuto = str_replace("<!-- suggerimenti-professione-placeholder -->", $str_professione, $contenuto);
  $contenuto = str_replace("<!-- suggerimenti-locazione-placeholder -->", $str_locazione, $contenuto);
  $contenuto = str_replace("<!-- aziende-placeholder -->", $str_aziende, $contenuto);
  
  echo $contenuto;