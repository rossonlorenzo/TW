<?php
header("Access-Control-Allow-Origin: *");

include_once '../../config/connection.php';
include_once '../../models/valutazione.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->connect();
    session_start();

    $valutazione = new Valutazione($db);

    $errors = [];

    if (!empty($_POST['commento'])) {
        $commento = $_POST['commento'];
        $maxLength = 300;
    
        if (is_numeric($_POST['commento']) || strlen($commento) > $maxLength) {
            $errors['commento'] = "Inserire un commento valido (0-{$max_length} caratteri)";
        }
    }    

    $aziendaId = $_POST['aziendaId'];

    if (!empty($errors)) {
        header("Location: ./../../Aziende.php?id=$aziendaId&errors=" . urlencode(json_encode($errors)));
        exit();

    } else {
        if (isset($_SESSION['user_id'])) {
            $loggedInUserId = $_SESSION['user_id'];
            $valutazione->utenti_id = $loggedInUserId;
            $valutazione->aziende_id = $aziendaId;

            if ($valutazione->checkDuplicate()) {
                $errors = [];
                $errors['duplicato'] = "Non è possibile pubblicare più di una recensione per azienda. Modificare o eliminare la recensione già pubblicata.";

                header("Location: ./../../Aziende.php?id=$aziendaId&errors=" . urlencode(json_encode($errors)));
                exit();
            }

            $valutazione->voto = $_POST['valutazione'];
            $valutazione->commento = $_POST['commento'];
        
            $result = $valutazione->insertNew();
            $num = $result->rowCount();

            if($num > 0) {
                header("Location: ./../../Aziende.php?id=$aziendaId");
                exit();
            }
        } else {
            $errors = [];
            $errors['login'] = "Bisogna aver effettuato il login da candidato per poter pubblicare una recensione.";

            header("Location: ./../../Aziende.php?id=$aziendaId&errors=" . urlencode(json_encode($errors)));
            exit();
        }
    }
}
?>