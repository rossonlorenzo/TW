<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  $nomefile = "./templates/RegistraAdmin.html";
  $contenuto = file_get_contents($nomefile);

  $errors = isset($_GET['errors']) ? json_decode(urldecode($_GET['errors']), true) : [];

  $nomeErrore = isset($errors['nome']) ? htmlspecialchars($errors['nome']) : '';
  $emailErrore = isset($errors['email']) ? htmlspecialchars($errors['email']) : '';
  $passwordErrore = isset($errors['password']) ? htmlspecialchars($errors['password']) : '';
  $sitoErrore = isset($errors['sito']) ? htmlspecialchars($errors['sito']) : '';
  $fondazioneErrore = isset($errors['fondazione']) ? htmlspecialchars($errors['fondazione']) : '';
  $dipendentiErrore = isset($errors['dipendenti']) ? htmlspecialchars($errors['dipendenti']) : '';
  $fatturatoErrore = isset($errors['fatturato']) ? htmlspecialchars($errors['fatturato']) : '';
  $locazioneErrore = isset($errors['locazione']) ? htmlspecialchars($errors['locazione']) : '';
  $settoreErrore = isset($errors['settore']) ? htmlspecialchars($errors['settore']) : '';
  $descCompletaErrore = isset($errors['desc_completa']) ? htmlspecialchars($errors['desc_completa']) : '';
  $logoErrore = isset($errors['logo']) ? htmlspecialchars($errors['logo']) : '';
  $credenzialiErrore = isset($errors['credenziali']) ? htmlspecialchars($errors['credenziali']) : '';

  $contenuto = str_replace("currentYear-placeholder", date('Y'), $contenuto);

  $contenuto = str_replace("nome-errore-placeholder", $nomeErrore, $contenuto);
  $contenuto = str_replace("email-errore-placeholder", $emailErrore, $contenuto);
  $contenuto = str_replace("password-errore-placeholder", $passwordErrore, $contenuto);
  $contenuto = str_replace("sito-errore-placeholder", $sitoErrore, $contenuto);
  $contenuto = str_replace("fondazione-errore-placeholder", $fondazioneErrore, $contenuto);
  $contenuto = str_replace("dipendenti-errore-placeholder", $dipendentiErrore, $contenuto);
  $contenuto = str_replace("fatturato-errore-placeholder", $fatturatoErrore, $contenuto);
  $contenuto = str_replace("locazione-errore-placeholder", $locazioneErrore, $contenuto);
  $contenuto = str_replace("settore-errore-placeholder", $settoreErrore, $contenuto);
  $contenuto = str_replace("desc-completa-errore-placeholder", $descCompletaErrore, $contenuto);
  $contenuto = str_replace("logo-errore-placeholder", $logoErrore, $contenuto);
  $contenuto = str_replace("credenziali-errore-placeholder", $credenzialiErrore, $contenuto);

  echo $contenuto;
?>