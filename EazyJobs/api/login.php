<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../config/connection.php';
  include_once '../models/azienda.php';
  include_once '../models/utente.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->connect();

    if(isset($_POST['ruolo'])) {
        $ruolo = $_POST['ruolo'];
        
        //server-side form validation
        $errors = [];

        if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = "Inserire un'email valida.";
        }

        if (empty($_POST['password'])) {
            $errors['password'] = "Inserire una password valida.";
        }

        if (!empty($errors)) {
            header("Location: http://localhost/TW/EazyJobs/Accedi.php?errors=".urlencode(json_encode($errors)));
            exit();
        }

        if ($ruolo === 'candidati') {
            $utente = new Utente($db);

            $utente->email = $_POST['email'];
            $utente->password = $_POST['password'];

            $userID = $utente->findMatch();
            session_start();

            if ($userID) {
                $_SESSION['user_id'] = $userID;
                header("Location: http://localhost/TW/EazyJobs/User.php");
                exit();
            } else {
                $errors = [];
                $errors['credenziali'] = "Credenziali non valide.";

                header("Location: http://localhost/TW/EazyJobs/Accedi.php?errors=".urlencode(json_encode($errors)));
                exit();
            }
        } else if ($ruolo = 'aziende') {
            $azienda = new Azienda($db);

            $azienda->email = $_POST['email'];
            $azienda->password = $_POST['password'];

            $aziendaID = $azienda->findMatch();
            session_start();

            if ($aziendaID) {
                $_SESSION['admin_id'] = $aziendaID;
                header("Location: http://localhost/TW/EazyJobs/Admin.php");
                exit();
            } else {
                $errors = [];
                $errors['credenziali'] = "Credenziali non valide.";

                header("Location: http://localhost/TW/EazyJobs/Accedi.php?errors=".urlencode(json_encode($errors)));
                exit();
            }
        }
    }
}

  

