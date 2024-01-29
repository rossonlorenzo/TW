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
      $str_logo = "";

      while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $aziendaName = $nome;
            
          $str_azienda .= '
                <dt>Nome: </dt>
                <dd>' . $nome . '</dd>
                <dt><span lang="en">E-mail</span>:</dt>
                <dd>' . $email . '</dd>
                <dt>Sito <span lang="en">web:</span>:</dt>
                <dd>' . $sito . '</dd>';

          $str_logo = "<img id='foto-profilo' src='./assets/logos/" . $aziendaId . "_logo.png' alt='Logo azienda " . $nome ."'>";
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
                "<h3>" . $titolo . "</h3>\n" .
                "<div class='header-annunci'>\n" .
                "<h4>" . $nome . "</h4>\n" .
                "<img src='./assets/logos/". $azienda_id ."_logo.png' alt='Logo azienda " . $nome ."'>" .
                "</div>\n" .
                "<h5>Descrizione:</h5>\n" .
                "<p>" . $desc_breve . "</p>\n" .
                "<ul class='job-info'>\n" .
                "<li><h5>Loco:</h5><p>" . $locazione . "</p></li>\n" .
                "<li><h5>Stipendio medio:</h5><p>" . $stipendio . "€</p></li>\n" .
                "<li><h5>Contatti:</h5><p>" . $email . "</p></li>\n" .
                "</ul>\n" .
                "<button class='bottone-modifica' aria-label=\"Modifica l'annuncio " . $titolo . "\" data-id='" . $annuncio_id . "'>Modifica</button>\n" .
                "<button class='bottone-elimina' aria-label=\"Elimina l'annuncio " . $titolo . "\" data-id='" . $annuncio_id . "'>Elimina</button>\n" .                             
                "</li>\n";
        }    
      } else {
            $str_annunci = '<li class="nessun-trovato">(!) Nessun annuncio trovato</li>';
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
            $str_valutazioni = '<li class="nessun-trovato">(!) Nessuna recensione trovata</li>';
      }


  $nomefile = "./templates/Admin.html";
  $contenuto = file_get_contents($nomefile);
  
  $contenuto = str_replace("nome-placeholder", strval($aziendaName), $contenuto);
  $contenuto = str_replace("<!-- logo-placeholder -->", $str_logo, $contenuto);
  $contenuto = str_replace("<!-- azienda-placeholder -->", $str_azienda, $contenuto);
  $contenuto = str_replace("<!-- annunci-placeholder -->", $str_annunci, $contenuto);
  $contenuto = str_replace("<!-- recensioni-placeholder -->", $str_valutazioni, $contenuto);
  
  echo $contenuto;
}
?>