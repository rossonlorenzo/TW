<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  session_start();

  if (isset($_SESSION['user_id'])) {

    include_once './config/connection.php';
    include_once './models/utente.php';
    include_once './models/valutazione.php';
    include_once './models/annuncio.php';

    $database = new Database();
    $db = $database->connect();

    $utente = new Utente($db);
    $userId = $_SESSION['user_id'];
    $result = $utente->getById($userId);
    $num = $result->rowCount();

    if($num > 0) {
      $userName = "";
      $str_utente = "";

      while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $userName = $nome;
            
          $str_utente .= '
          <dl class="dati-utente">
            <dt>Nome: </dt>
            <dd>' . $nome . '</dd>
            <dt>E-mail: </dt>
            <dd>' . $email . '</dd>
          </dl>

          <div id="cv-section">';
      
        if (!empty($cv_path)) {
            $cv_path = str_replace('../../', './', $cv_path);
            $str_utente .= '<iframe id="cv-preview" src="' . $cv_path . '#toolbar=0&navpanes=0&scrollbar=0" title="Curriculum Vitae"></iframe>';
        } else {
            $str_utente .= 'Nessun file caricato';
        }
        
        $str_utente .= '</div>';
        
      }
    }

    $annuncio = new Annuncio($db);
    $resultSet = $annuncio->getAllSaved($userId);
    
    $str_annunci = "";
    
    if ($resultSet->rowCount() > 0) {
      while ($row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
        $annuncioDetails = Annuncio::getById($db, $row['annuncio_id']);
        
        if ($annuncioDetails) {
            // Fetch the result as an associative array
            $annuncio = $annuncioDetails->fetch(PDO::FETCH_ASSOC);

            // Process the fetched announcement data
            if ($annuncio) {
                $str_annunci .= "
                    <li id='annuncio-" . $annuncio['annuncio_id'] . "'>
                        
                            <h3>" . $annuncio['titolo'] . "</h3>
                        <div class='header-annunci'>
                        <h4>" . $annuncio['nome'] . "</h4>
                        <img src='./assets/logos/". $annuncio['azienda_id'] ."_logo.png' alt='Logo azienda " . $annuncio['nome'] ."'>
                        </div>
                        <h5>Descrizione:</h5>
                        <p>" . $annuncio['desc_breve'] . "</p>
                        <ul class='job-info'>
                            <li><h5>Loco:</h5><p>" . $annuncio['locazione'] . "</p></li>
                            <li><h5>Stipendio medio:</h5><p>" . $annuncio['stipendio'] . "€</p></li>
                            <li><h5>Contatti:</h5><p>" . $annuncio['email'] . "</p></li>
                        </ul>
                        <input type='submit' class='bottone-rimuovi-preferiti' value='Rimuovi dai preferiti' aria-label=\"Rimuovi l'annuncio " . $annuncio['titolo'] . " dai tuoi preferiti\" data-id='" . $annuncio['annuncio_id'] . "'>
                    </li>";
            }
        }
      }
  } else {
    $str_annunci = '<li class="nessun-trovato">(!) Nessun annuncio salvato</li>';
  }

    $valutazione = new Valutazione($db);
    $result = $valutazione->getAll_byUtenteId($userId);
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

  $nomefile = "./templates/User.html";
  $contenuto = file_get_contents($nomefile);

  //possibile errore sul cv
  $errors = isset($_GET['errors']) ? json_decode(urldecode($_GET['errors']), true) : [];
  $cvErrore = isset($errors['cv']) ? htmlspecialchars($errors['cv']) : '';
  $contenuto = str_replace("cv-errore-placeholder", $cvErrore, $contenuto);

  $contenuto = str_replace("nome-placeholder", strval($userName), $contenuto);
  $contenuto = str_replace("<!-- utente-placeholder -->", $str_utente, $contenuto);
  $contenuto = str_replace("<!-- annunci-placeholder -->", $str_annunci, $contenuto);
  $contenuto = str_replace("<!-- recensioni-placeholder -->", $str_valutazioni, $contenuto);

  echo $contenuto;
}
?>