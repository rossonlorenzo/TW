<?php 

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  $nomefile = "./templates/PubblicaAnnuncio.html";
  $contenuto = file_get_contents($nomefile);

  $errors = isset($_GET['errors']) ? json_decode(urldecode($_GET['errors']), true) : [];

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
?>