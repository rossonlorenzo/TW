<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  include_once './config/connection.php';
  include_once './models/annuncio.php';

  //handle data retrieval and form population
  $annuncioId = $_GET['id'] ?? null;

    // Check if an ID is present
    if ($annuncioId) {
    $database = new Database();
    $conn = $database->connect();

    $result = Annuncio::getById($conn, $annuncioId);
    $num = $result->rowCount();

    if($num > 0) {
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            
            $nomefile = "./templates/ModificaAnnuncio.html";
            $contenuto = file_get_contents($nomefile);

            $errors = isset($_GET['errors']) ? json_decode(urldecode($_GET['errors']), true) : [];
            
            //variable extraction
            $titoloErrore = isset($errors['titolo']) ? htmlspecialchars($errors['titolo']) : '';
            $descBreveErrore = isset($errors['desc_breve']) ? htmlspecialchars($errors['desc_breve']) : '';
            $descCompletaErrore = isset($errors['desc_completa']) ? htmlspecialchars($errors['desc_completa']) : '';
            $locazioneErrore = isset($errors['locazione']) ? htmlspecialchars($errors['locazione']) : '';
            $settoreErrore = isset($errors['settore']) ? htmlspecialchars($errors['settore']) : '';
            $checkboxErrore = isset($errors['checkbox_group']) ? htmlspecialchars($errors['checkbox_group']) : '';
            $radioErrore = isset($errors['radio_group']) ? htmlspecialchars($errors['radio_group']) : '';
            $istruzioneErrore = isset($errors['livello_istruzione']) ? htmlspecialchars($errors['livello_istruzione']) : '';
            $esperienzaErrore = isset($errors['esperienza']) ? htmlspecialchars($errors['esperienza']) : '';
            $stipendioErrore = isset($errors['stipendio']) ? htmlspecialchars($errors['stipendio']) : '';

            //string replacement
            $contenuto = str_replace("annuncioId-placeholder", strval($annuncioId), $contenuto);
            $contenuto = str_replace("titolo-placeholder", strval($titolo), $contenuto);
            $contenuto = str_replace("desc-breve-placeholder", strval($desc_breve), $contenuto);
            $contenuto = str_replace("desc-completa-placeholder", strval($desc_completa), $contenuto);
            $contenuto = str_replace("locazione-placeholder", strval($locazione), $contenuto);
            $contenuto = str_replace("settore-placeholder", strval($settore), $contenuto);

            if ($remoto == 1) {
                $contenuto = str_replace("remoto-placeholder", "checked", $contenuto);
                $contenuto = str_replace("presenza-placeholder", "", $contenuto);
            }
            if ($presenza == 1) {
                $contenuto = str_replace("presenza-placeholder", "checked", $contenuto);
                $contenuto = str_replace("remoto-placeholder", "", $contenuto);
            }
            if ($contratto == "Tempo determinato") {
                $contenuto = str_replace("determinato-placeholder", "checked", $contenuto);
                $contenuto = str_replace("indeter-placeholder", "", $contenuto);
            } elseif ($contratto == "Tempo indeterminato") {
                $contenuto = str_replace("indeter-placeholder", "checked", $contenuto);
                $contenuto = str_replace("determinato-placeholder", "", $contenuto);
            }

            if ($livello_istruzione === 'Diploma') {
                $contenuto = str_replace("diploma-placeholder", "selected", $contenuto);
                $contenuto = str_replace("triennale-placeholder", "", $contenuto);
                $contenuto = str_replace("magistrale-placeholder", "", $contenuto);
                $contenuto = str_replace("dottorato-placeholder", "", $contenuto);
            } elseif ($livello_istruzione === 'Laurea Triennale') {
                $contenuto = str_replace("diploma-placeholder", "", $contenuto);
                $contenuto = str_replace("triennale-placeholder", "selected", $contenuto);
                $contenuto = str_replace("magistrale-placeholder", "", $contenuto);
                $contenuto = str_replace("dottorato-placeholder", "", $contenuto);
            } elseif ($livello_istruzione === 'Laurea Magistrale') {
                $contenuto = str_replace("diploma-placeholder", "", $contenuto);
                $contenuto = str_replace("triennale-placeholder", "", $contenuto);
                $contenuto = str_replace("magistrale-placeholder", "selected", $contenuto);
                $contenuto = str_replace("dottorato-placeholder", "", $contenuto);
            } elseif ($livello_istruzione === 'Dottorato') {
                $contenuto = str_replace("diploma-placeholder", "", $contenuto);
                $contenuto = str_replace("triennale-placeholder", "", $contenuto);
                $contenuto = str_replace("magistrale-placeholder", "", $contenuto);
                $contenuto = str_replace("dottorato-placeholder", "selected", $contenuto);
            }

            if ($esperienza == '1') {
                $contenuto = str_replace("1-placeholder", "selected", $contenuto);
                $contenuto = str_replace("2-placeholder", "", $contenuto);
                $contenuto = str_replace("3-placeholder", "", $contenuto);
                $contenuto = str_replace("4-placeholder", "", $contenuto);
                $contenuto = str_replace("5-placeholder", "", $contenuto);
            } elseif ($esperienza == '2') {
                $contenuto = str_replace("1-placeholder", "", $contenuto);
                $contenuto = str_replace("2-placeholder", "selected", $contenuto);
                $contenuto = str_replace("3-placeholder", "", $contenuto);
                $contenuto = str_replace("4-placeholder", "", $contenuto);
                $contenuto = str_replace("5-placeholder", "", $contenuto);
            } elseif ($esperienza == '3') {
                $contenuto = str_replace("1-placeholder", "", $contenuto);
                $contenuto = str_replace("2-placeholder", "", $contenuto);
                $contenuto = str_replace("3-placeholder", "selected", $contenuto);
                $contenuto = str_replace("4-placeholder", "", $contenuto);
                $contenuto = str_replace("5-placeholder", "", $contenuto);
            } elseif ($esperienza == '4') {
                $contenuto = str_replace("1-placeholder", "", $contenuto);
                $contenuto = str_replace("2-placeholder", "", $contenuto);
                $contenuto = str_replace("3-placeholder", "", $contenuto);
                $contenuto = str_replace("4-placeholder", "selected", $contenuto);
                $contenuto = str_replace("5-placeholder", "", $contenuto);
            } elseif ($esperienza == '5') {
                $contenuto = str_replace("1-placeholder", "", $contenuto);
                $contenuto = str_replace("2-placeholder", "", $contenuto);
                $contenuto = str_replace("3-placeholder", "", $contenuto);
                $contenuto = str_replace("4-placeholder", "", $contenuto);
                $contenuto = str_replace("5-placeholder", "selected", $contenuto);
            }            

            $contenuto = str_replace("stipendio-placeholder", strval($stipendio), $contenuto);

            $contenuto = str_replace("titolo-errore-placeholder", $titoloErrore, $contenuto);
            $contenuto = str_replace("desc-breve-errore-placeholder", $descBreveErrore, $contenuto);
            $contenuto = str_replace("desc-completa-errore-placeholder", $descCompletaErrore, $contenuto);
            $contenuto = str_replace("locazione-errore-placeholder", $locazioneErrore, $contenuto);
            $contenuto = str_replace("settore-errore-placeholder", $settoreErrore, $contenuto);
            $contenuto = str_replace("checkbox-errore-placeholder", $checkboxErrore, $contenuto);
            $contenuto = str_replace("radio-errore-placeholder", $radioErrore, $contenuto);
            $contenuto = str_replace("istruzione-errore-placeholder", $istruzioneErrore, $contenuto);
            $contenuto = str_replace("esperienza-errore-placeholder", $esperienzaErrore, $contenuto);
            $contenuto = str_replace("stipendio-errore-placeholder", $stipendioErrore, $contenuto);  
        }    
        } else {
                echo json_encode(
                array('message' => 'Nessun annuncio trovato')
                );
        }

      echo $contenuto;
    }

  