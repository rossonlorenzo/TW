<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  $nomefile = "./templates/PubblicaAnnuncio.html";
  $contenuto = file_get_contents($nomefile);

  $errors = isset($_GET['errors']) ? json_decode(urldecode($_GET['errors']), true) : [];
  $userValues = isset($_GET['userValues']) ? json_decode(urldecode($_GET['userValues']), true) : [];

  //variable extraction
  $titolo = isset($userValues['titolo']) ? htmlspecialchars($userValues['titolo']) : '';
  $descBreve = isset($userValues['desc_breve']) ? htmlspecialchars($userValues['desc_breve']) : '';
  $descCompleta = isset($userValues['desc_completa']) ? htmlspecialchars($userValues['desc_completa']) : '';
  $locazione = isset($userValues['locazione']) ? htmlspecialchars($userValues['locazione']) : '';
  $settore = isset($userValues['settore']) ? htmlspecialchars($userValues['settore']) : '';
  $remoto = isset($userValues['modalità-remoto']) ? htmlspecialchars($userValues['modalità-remoto']) : '';
  $presenza = isset($userValues['modalità-presenza']) ? htmlspecialchars($userValues['modalità-presenza']) : '';
  $contratto = isset($userValues['contratto']) ? htmlspecialchars($userValues['contratto']) : '';
  $livello_istruzione = isset($userValues['livello_istruzione']) ? htmlspecialchars($userValues['livello_istruzione']) : '';
  $esperienza = isset($userValues['esperienza']) ? htmlspecialchars($userValues['esperienza']) : '';
  $stipendio = isset($userValues['stipendio']) ? htmlspecialchars($userValues['stipendio']) : '';

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
  // $contenuto = str_replace("titolo-placeholder", $titolo, $contenuto);
  // $contenuto = str_replace("desc-breve-placeholder", $descBreve, $contenuto);
  // $contenuto = str_replace("desc-completa-placeholder", $descCompleta, $contenuto);
  // $contenuto = str_replace("locazione-placeholder", $locazione, $contenuto);
  // $contenuto = str_replace("settore-placeholder", $settore, $contenuto);

  // if ($remoto == 'on') {$contenuto = str_replace("remoto-placeholder", "checked", $contenuto);}
  // if ($presenza == 'on') {$contenuto = str_replace("presenza-placeholder", "checked", $contenuto);}
  // if ($contratto == "Tempo determinato") {
    //   $contenuto = str_replace("determinato-placeholder", "checked", $contenuto);
  // } elseif ($contratto == "Tempo indeterminato") {
      //     $contenuto = str_replace("indeterminato-placeholder", "checked", $contenuto);
  // }

  // if ($livello_istruzione === 'Diploma') {
    //   $contenuto = str_replace("diploma-placeholder", "selected", $contenuto);
  // } elseif ($livello_istruzione === 'Laurea Triennale') {
      //     $contenuto = str_replace("triennale-placeholder", "selected", $contenuto);
  // } elseif ($livello_istruzione === 'Laurea Magistrale') {
      //     $contenuto = str_replace("magistrale-placeholder", "selected", $contenuto);
  // } elseif ($livello_istruzione === 'Dottorato') {
      //     $contenuto = str_replace("dottorato-placeholder", "selected", $contenuto);
  // }

  // if ($esperienza == 1) {
    //   $contenuto = str_replace("1-placeholder", "selected", $contenuto);
  // } elseif ($esperienza == 2) {
    //   $contenuto = str_replace("2-placeholder", "selected", $contenuto);
  // } elseif ($esperienza == 3) {
    //   $contenuto = str_replace("3-placeholder", "selected", $contenuto);
  // } elseif ($esperienza == 4) {
    //   $contenuto = str_replace("4-placeholder", "selected", $contenuto);
  // } elseif ($esperienza == 5) {
    //   $contenuto = str_replace("5-placeholder", "selected", $contenuto);
  // }
  
  // $contenuto = str_replace("stipendio-placeholder", $stipendio, $contenuto);

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

  echo $contenuto;