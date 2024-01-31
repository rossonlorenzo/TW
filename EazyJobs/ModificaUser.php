<?php 

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  include_once './config/connection.php';
  include_once './models/utente.php';

  $database = new Database();
  $db = $database->connect();
  session_start();

  $nomefile = "./templates/ModificaUser.html";
  $contenuto = file_get_contents($nomefile);

  if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];

        $utente = new Utente($db);
        $result = $utente->getById($userId);
        $num = $result->rowCount();

        if($num > 0) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $errors = isset($_GET['errors']) ? json_decode(urldecode($_GET['errors']), true) : [];

                $nomeErrore = isset($errors['nome']) ? htmlspecialchars($errors['nome']) : '';
                $emailErrore = isset($errors['email']) ? htmlspecialchars($errors['email']) : '';
                $passwordErrore = isset($errors['password']) ? htmlspecialchars($errors['password']) : '';
                $credenzialiErrore = isset($errors['credenziali']) ? htmlspecialchars($errors['credenziali']) : '';

                $contenuto = str_replace("nome-placeholder", strval($nome), $contenuto);
                $contenuto = str_replace("email-placeholder", strval($email), $contenuto);
                $contenuto = str_replace("password-placeholder", strval($password), $contenuto);

                $contenuto = str_replace("nome-errore-placeholder", $nomeErrore, $contenuto);
                $contenuto = str_replace("email-errore-placeholder", $emailErrore, $contenuto);
                $contenuto = str_replace("password-errore-placeholder", $passwordErrore, $contenuto);
                $contenuto = str_replace("credenziali-errore-placeholder", $credenzialiErrore, $contenuto);
            
                echo $contenuto;
            }
        }
        else {
            echo json_encode(
                array('message' => 'Utente non trovato')
            );
        }
  }
?>