<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  include_once './config/connection.php';
  include_once './models/azienda.php';
  include_once './models/valutazione.php';

  $database = new Database();
  $db = $database->connect();
  session_start();

  $azienda = new Azienda($db);
  if (isset($_GET['id'])) {$aziendaId = $_GET['id'];}
  $result = $azienda->getById($aziendaId);
  $num = $result->rowCount();

  if($num > 0) {
  $aziendaName = "";
  $str_azienda = "";

  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $aziendaName = $nome;
        
      $str_azienda = "<div class='header-aziende'>\n" .
      "<h3>" . $nome . "</h3>\n" .
      "<img src='./assets/logos/". $id ."_logo.png' alt='Logo azienda " . $nome ."'>\n" .
      "</div>\n" . "
        <dl>
            <dt class='info-azienda'>Fondazione: </dt>
            <dd><time datetime='" . $fondazione . "'>" . $fondazione . "</time></dd>
            <dt class='info-azienda'>Numero dipendenti: </dt>
            <dd>" . $dipendenti . "</dd>
            <dt class='info-azienda'>Fatturato: </dt>
            <dd>" . $fatturato . "</dd>
            <dt class='info-azienda'>Settore: </dt>
            <dd>" . $settore . "</dd>
            <dt class='info-azienda'>Sede: </dt>
            <dd>" . $sede . "</dd>
            <dt class='info-azienda'>Sito web: </dt>
            <dd>" . $sito . "</dd>
        </dl>
        <p id='descrizioneAzienda'>" . $desc . "</p>";
    }
  }

  $valutazione = new Valutazione($db);
      $result = $valutazione->getAll_byAziendaId($aziendaId);
      $num = $result->rowCount();
      $utenteId = null;

      if($num > 0) {
        $str_valutazioni = "";
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $utenti_id) {
              $str_valutazioni .= 
                "<li id='recensione-utente'>\n" .
                "<h3>" . $nome . "</h3>\n" .
                "<dl class='valutazione'>\n" .
                "<dt>Valutazione:</dt><dd><p>" . $voto . "</p></dd>\n" .
                "</dl>\n" .
                "<p>" . $commento . "</p>\n" .
                "<div id='controllo-recensione'>\n" . 
                "<input type='submit' id='modifica-recensione' aria-label='Modifica la tua recensione' data-id='" . $aziendaId . "' value='Modifica'>\n" . 
                "<input type='submit' id='elimina-recensione' aria-label='Elimina la tua recensione' data-id='" . $aziendaId . "' value='Elimina '>\n" . 
                "</div>\n" . 
                "</li>\n";

                $utenteId = $utenti_id;
            } else {
              $str_valutazioni .= 
                  "<li>\n" .
                  "<h3>" . $nome . "</h3>\n" .
                  "<dl class='valutazione'>\n" .
                  "<dt>Valutazione:</dt><dd><p>" . $voto . "</p></dd>\n" .
                  "</dl>\n" .
                  "<p>" . $commento . "</p>\n" .
                  "</li>\n";    
            }
        }    
      } else {
        $str_valutazioni = '<li class="nessun-trovato">(!) Nessuna recensione trovata</li>';
      } 

  $nomefile = "./templates/Aziende.html";
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

  $contenuto = str_replace("aziendaId-placeholder", strval($aziendaId), $contenuto);

  //gestione degli errori sul form di pubblicazione delle recensioni
  $errors = isset($_GET['errors']) ? json_decode(urldecode($_GET['errors']), true) : [];

  $commentoErrore = isset($errors['commento']) ? htmlspecialchars($errors['commento']) : '';
  $modificaCommentoErrore = isset($errors['modifica-commento']) ? htmlspecialchars($errors['modifica-commento']) : '';
  $loginErrore = isset($errors['login']) ? htmlspecialchars($errors['login']) : '';
  $duplicatoErrore = isset($errors['duplicato']) ? htmlspecialchars($errors['duplicato']) : '';
  
  $contenuto = str_replace("commento-errore-placeholder", $commentoErrore, $contenuto);
  $contenuto = str_replace("commento-errore-placeholder", $modificaCommentoErrore, $contenuto);
  $contenuto = str_replace("login-errore-placeholder", $loginErrore, $contenuto);
  $contenuto = str_replace("duplicato-errore-placeholder", $duplicatoErrore, $contenuto);

  //rimpiazzo contenuto dinamico della pagina
  $contenuto = str_replace("<!-- azienda-placeholder -->", $str_azienda, $contenuto);
  $contenuto = str_replace("<!-- recensioni-placeholder -->", $str_valutazioni, $contenuto);

  if ($utenteId) {
    $result = Valutazione::getById($db, $utenteId, $aziendaId);
    $num = $result->rowCount();
    if($num > 0) {
      while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        
        if ($voto == '1') {
                $contenuto = str_replace("1-placeholder", "selected", $contenuto);
                $contenuto = str_replace("2-placeholder", "", $contenuto);
                $contenuto = str_replace("3-placeholder", "", $contenuto);
                $contenuto = str_replace("4-placeholder", "", $contenuto);
                $contenuto = str_replace("5-placeholder", "", $contenuto);
            } elseif ($voto == '2') {
                $contenuto = str_replace("1-placeholder", "", $contenuto);
                $contenuto = str_replace("2-placeholder", "selected", $contenuto);
                $contenuto = str_replace("3-placeholder", "", $contenuto);
                $contenuto = str_replace("4-placeholder", "", $contenuto);
                $contenuto = str_replace("5-placeholder", "", $contenuto);
            } elseif ($voto == '3') {
                $contenuto = str_replace("1-placeholder", "", $contenuto);
                $contenuto = str_replace("2-placeholder", "", $contenuto);
                $contenuto = str_replace("3-placeholder", "selected", $contenuto);
                $contenuto = str_replace("4-placeholder", "", $contenuto);
                $contenuto = str_replace("5-placeholder", "", $contenuto);
            } elseif ($voto == '4') {
                $contenuto = str_replace("1-placeholder", "", $contenuto);
                $contenuto = str_replace("2-placeholder", "", $contenuto);
                $contenuto = str_replace("3-placeholder", "", $contenuto);
                $contenuto = str_replace("4-placeholder", "selected", $contenuto);
                $contenuto = str_replace("5-placeholder", "", $contenuto);
            } elseif ($voto == '5') {
                $contenuto = str_replace("1-placeholder", "", $contenuto);
                $contenuto = str_replace("2-placeholder", "", $contenuto);
                $contenuto = str_replace("3-placeholder", "", $contenuto);
                $contenuto = str_replace("4-placeholder", "", $contenuto);
                $contenuto = str_replace("5-placeholder", "selected", $contenuto);
            }   
      
        $contenuto = str_replace("commento-placeholder", strval($commento), $contenuto);
      }
    }
  } else {
    $contenuto = str_replace("1-placeholder", "", $contenuto);
    $contenuto = str_replace("2-placeholder", "", $contenuto);
    $contenuto = str_replace("3-placeholder", "", $contenuto);
    $contenuto = str_replace("4-placeholder", "", $contenuto);
    $contenuto = str_replace("5-placeholder", "", $contenuto);
  } 

  echo $contenuto;
?>