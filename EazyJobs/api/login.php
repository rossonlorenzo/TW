<?php 

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
        $test = NULL;

        if (
            ($_POST['email'] === 'user' && $_POST['password'] === 'user') ||
            ($_POST['email'] === 'admin' && $_POST['password'] === 'admin')
        ) {
            $test = true;
        }
        
        if (!$test) {
            $errors = [];

            if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                $errors['email'] = "Inserire un'email valida";
            }

            $min_length = 8;
            $max_length = 12;
            if (empty($_POST['password']) || strlen($_POST['password']) < $min_length || strlen($_POST['password']) > $max_length) {
                $errors['password'] = "Inserire una password valida ({$min_length}-{$max_length} caratteri)";
            }

            if (!empty($errors)) {
                header("Location: ./../Accedi.php?errors=".urlencode(json_encode($errors)));
                exit();
            }
        }

        if ($ruolo === 'candidati') {
            $utente = new Utente($db);

            $utente->email = $_POST['email'];
            $utente->password = $_POST['password'];

            $userID = $utente->findMatch();
            session_start();

            if ($userID) {
                $_SESSION['user_id'] = $userID;
                header("Location: ./../User.php");
                exit();
            } else {
                $errors = [];
                $errors['credenziali'] = "Credenziali non valide.";

                header("Location: ./../Accedi.php?errors=".urlencode(json_encode($errors)));
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
                header("Location: ./../Admin.php");
                exit();
            } else {
                $errors = [];
                $errors['credenziali'] = "Credenziali non valide.";

                header("Location: ./../Accedi.php?errors=".urlencode(json_encode($errors)));
                exit();
            }
        }
    }
}
?>

  

