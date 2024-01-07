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

    //server-side validation
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

    if ($_FILES['cv']['type'] !== 'application/pdf') {
        $errors['cv'] = "Inserire un cv valido (formato PDF)";
    }

    if (!empty($errors)) {
        header("Location: http://localhost/TW/EazyJobs/RegistraUser.php?errors=".urlencode(json_encode($errors)));
        exit();
    }

    //form implementation
    $utente = new Utente($db);

    $utente->nome = $_POST['nome'];
    $utente->email = $_POST['email'];
    $utente->password = $_POST['password'];

    if ($utente->findEmailMatch() || $utente->findMatch()) {
        $errors['credenziali'] = "Le credenziali inserite sono già in uso.";
        header("Location: http://localhost/TW/EazyJobs/RegistraUser.php?errors=".urlencode(json_encode($errors)));
        exit();
    }

    $result = $utente->insertNew();
    $num = $result->rowCount();

    if($num > 0) {
        $userIdInserito = Utente::getLastInsertedId($db);
    
        $uploadDirectory = '../../assets/cvs/';
        $newFileName = $userIdInserito . '_cv.pdf';
    
        if (move_uploaded_file($_FILES['cv']['tmp_name'], $uploadDirectory . $newFileName)) {
            $utente->cv_path = $uploadDirectory . $newFileName;
            $utente->updateCVPath($userIdInserito);
        }

        header("Location: http://localhost/TW/EazyJobs/Accedi.php");
        exit();
    }
    else {}
}

  

