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

    if (!empty($_POST['modifica-commento'])) {
        $commento = $_POST['modifica-commento'];
        $maxLength = 300;
    
        if (is_numeric($_POST['modifica-commento']) || strlen($commento) > $maxLength) {
            $errors['modifica-commento'] = "Inserire un commento valido (0-{$max_length} caratteri)";
        }
    }    

    // If there are errors, handle them (e.g., display error messages or prevent form submission)
    $aziendaId = $_POST['aziendaId'];

    if (!empty($errors)) {
        header("Location: ./../../Aziende.php?id=$aziendaId&errors=" . urlencode(json_encode($errors)));
        exit();

    } else {
        // If validation passes, proceed with form processing (sanitize, save to database, etc.)
        if (isset($_SESSION['user_id'])) {
            $loggedInUserId = $_SESSION['user_id'];
            $valutazione->utenti_id = $loggedInUserId;
            $valutazione->aziende_id = $aziendaId;

            $valutazione->voto = $_POST['valutazione'];
            $valutazione->commento = $_POST['modifica-commento'];
        
            $result = $valutazione->modifyOld();

            if($result) {
                header("Location: ./../../Aziende.php?id=$aziendaId");
                exit();
            }
            else {}     //messaggio da inviare a Aziende.php
        }
    }
}
?>