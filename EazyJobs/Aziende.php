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

  $azienda = new Azienda($db);
  $aziendaId = 1;   //change to id passed through link :)
  $result = $azienda->getById($aziendaId);
  $num = $result->rowCount();

  if($num > 0) {
  $aziendaName = "";
  $str_azienda = "";

  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $aziendaName = $nome;
        
      $str_azienda = "
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

      if($num > 0) {
        $str_valutazioni = "";
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
        
            $str_valutazioni .= 
                "<li>\n" .
                "<h3>" . $nome . "</h3>\n" .
                "<div class='valutazione'>\n" .
                "<h4>Valutazione:</h4><p>" . $voto . "</p>\n" .
                "</div>\n" .
                "<p>" . $commento . "</p>\n" .
                "</li>\n";
        }    
      } else {
            echo json_encode(
              array('message' => 'Nessuna recensione trovata')
            );
      }

  $nomefile = "./templates/Aziende.html";
  $contenuto = file_get_contents($nomefile);

  $contenuto = str_replace("nome-placeholder", strval($aziendaName), $contenuto);
  $contenuto = str_replace("<!-- azienda-placeholder -->", $str_azienda, $contenuto);
  $contenuto = str_replace("<!-- recensioni-placeholder -->", $str_valutazioni, $contenuto);

  echo $contenuto;
?>