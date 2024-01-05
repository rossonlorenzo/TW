<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/connection.php';
  include_once '../../models/utente.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->connect();
    session_start();

    //server-side validation
    $errors = [];

    if (empty($_POST['nome'])) {
        $errors['nome'] = "Inserire un nome valido.";
    }

    if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Inserire un'email valida.";
    }

    $minLength = 8;
    $maxLength = 12;
    if (!empty($_POST['password']) && (strlen($_POST['password']) < $minLength || strlen($_POST['password']) > $maxLength)) {
        $errors['password'] = "La password deve avere tra $minLength e $maxLength caratteri.";
    }

    if (empty($_POST['password'])) {
        $errors['password'] = "Inserire una password valida.";
    }

    //inserisci errore nel caso in cui i dati non siano cambiati affatto
    if (!empty($errors)) {
        header("Location: http://localhost/TW/EazyJobs/ModificaUser.php?errors=".urlencode(json_encode($errors)));
        exit();
    }

    //form implementation
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $utente = new Utente($db);
        
        $utente->id = $userId;
        $utente->nome = $_POST['nome'];
        $utente->email = $_POST['email'];
        $utente->password = $_POST['password'];
    
        $emailCorrente = $utente->getEmail();
        if ($utente->email !== $emailCorrente) {
            if ($utente->findEmailMatch()) {
                $errors['email'] = "L'email inserita è già in uso.";
                header("Location: http://localhost/TW/EazyJobs/ModificaUser.php?errors=".urlencode(json_encode($errors)));
                exit();
            }
        }
    
        $result = $utente->modifyOld();
    
        if ($result) {
            header("Location: http://localhost/TW/EazyJobs/User.php");
            exit();
        }
        else {}
    }
}

  

