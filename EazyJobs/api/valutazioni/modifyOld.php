<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");

include_once '../../config/connection.php';
include_once '../../models/valutazione.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->connect();
    session_start();

    $valutazione = new Valutazione($db);

    //server-side validation
    $errors = [];

    if (!empty($_POST['commento'])) {
        $commento = $_POST['commento'];
        $minLength = 0;
        $maxLength = 300;
    
        if (is_numeric($_POST['commento'])) {
            $errors['commento'] = "Inserire del testo.";
        }
    
        if (strlen($commento) < $minLength || strlen($commento) > $maxLength) {
            $errors['commento'] = "Il commento deve avere tra $minLength e $maxLength caratteri.";
        }
    }    

    // If there are errors, handle them (e.g., display error messages or prevent form submission)
    $aziendaId = $_POST['aziendaId'];

    if (!empty($errors)) {
        header("Location: http://localhost/TW/EazyJobs/Aziende.php?id=$aziendaId&errors=" . urlencode(json_encode($errors)));
        exit();

    } else {
        // If validation passes, proceed with form processing (sanitize, save to database, etc.)
        if (isset($_SESSION['user_id'])) {
            $loggedInUserId = $_SESSION['user_id'];
            $valutazione->utenti_id = $loggedInUserId;
            $valutazione->aziende_id = $aziendaId;

            $valutazione->voto = $_POST['valutazione'];
            $valutazione->commento = $_POST['commento'];
        
            $result = $valutazione->modifyOld();
            $num = $result->rowCount();

            if($num > 0) {
                header("Location: http://localhost/TW/EazyJobs/Aziende.php?id=$aziendaId");
                exit();
            }
            else {}     //messaggio da inviare a Aziende.php
        }
    }
}
?>