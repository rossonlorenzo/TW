<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/connection.php';
  include_once '../../models/utente.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->connect();
    session_start();

    $errors = [];

    $max_name_length = 60;
    if (empty($_POST['nome']) || is_numeric($_POST['nome']) || strlen($_POST['nome']) > $max_name_length) {
        $errors['nome'] = "Inserire un nome valido";
    }

    if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Inserire un'email valida";
    }

    $min_length = 8;
    $max_length = 12;
    if (empty($_POST['password']) || strlen($_POST['password']) < $min_length || strlen($_POST['password']) > $max_length) {
        $errors['password'] = "Inserire una password valida ({$min_length}-{$max_length} caratteri)";
    }

    if (!empty($errors)) {
        header("Location: ../../ModificaUser.php?errors=".urlencode(json_encode($errors)));
        exit();
    }

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
                header("Location: ../../ModificaUser.php?errors=".urlencode(json_encode($errors)));
                exit();
            }
        }
    
        $result = $utente->modifyOld();
    
        if ($result) {
            header("Location: ../../User.php");
            exit();
        }
    }
}
?>

  

