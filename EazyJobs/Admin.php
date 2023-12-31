<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  session_start();

  if (isset($_SESSION['admin_id'])) {

      include_once './config/connection.php';
      include_once './models/azienda.php';
      include_once './models/valutazione.php';
      include_once './models/annuncio.php';

      $database = new Database();
      $db = $database->connect();

      $azienda = new Azienda($db);
      $aziendaId = $_SESSION['admin_id'];
      $result = $azienda->getById($aziendaId);
      $num = $result->rowCount();

      if($num > 0) {
      $aziendaName = "";
      $str_azienda = "";

      while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $aziendaName = $nome;
            
          $str_azienda .= '
                <dt>Nome: </dt>
                <dd>' . $nome . '</dd>
                <dt>E-mail: </dt>
                <dd>' . $email . '</dd>
                <dt>Sito web:</dt>
                <dd>' . $sito . '</dd>';
        }
      }

      $annuncio = new Annuncio($db);
      $result = $annuncio->getAllbyId($aziendaId);
      $num = $result->rowCount();

      $str_annunci = "";
      
      if($num > 0) {
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
        
            $str_annunci .= 
                "<li id='annuncio-" . $annuncio_id . "'>\n" .
                "<div class='header-annunci'>\n" .
                "<h3>" . $titolo . "</h3>\n" .
                "</div>\n" .
                "<h4>" . $nome . "</h4>\n" .
                "<img src='./assets/logos/SyncLab-logo.png' alt='SyncLab-logo'>\n" .
                "</div>\n" .
                "<h5>Descrizione:</h5>\n" .
                "<p>" . $desc_breve . "</p>\n" .
                "<ul class='job-info'>\n" .
                "<li><h5>Loco:</h5><p>" . $locazione . "</p></li>\n" .
                "<li><h5>Stipendio medio:</h5><p>" . $stipendio . "€</p></li>\n" .
                "<li><h5>Contatti:</h5><p>" . $email . "</p></li>\n" .
                "</ul>\n" .
                "<button class='bottone-modifica' data-id='" . $annuncio_id . "'>Modifica</button>\n" .
                "<button class='bottone-elimina' data-id='" . $annuncio_id . "'>Elimina</button>\n" .
                "</li>\n";
        }    
      } else {
            echo json_encode(
              array('message' => 'Nessun annuncio trovato')
            );
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

      //$result->free();

  $nomefile = "./templates/Admin.html";
  $contenuto = file_get_contents($nomefile);
  
  $contenuto = str_replace("nome-placeholder", strval($aziendaName), $contenuto);
  $contenuto = str_replace("<!-- azienda-placeholder -->", $str_azienda, $contenuto);
  $contenuto = str_replace("<!-- annunci-placeholder -->", $str_annunci, $contenuto);
  $contenuto = str_replace("<!-- recensioni-placeholder -->", $str_valutazioni, $contenuto);
  
  echo $contenuto;
}
?>