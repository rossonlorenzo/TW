<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");

include_once '../../config/connection.php';
include_once '../../models/annuncio.php';

var_dump($_POST);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->connect();
    session_start();

    $annuncio = new Annuncio($db);

    //server-side validation
    $requiredFields = ['titolo', 'desc_breve', 'desc_completa', 'locazione', 'settore'];
    $errors = [];

    foreach ($requiredFields as $field) {
        if (empty($_POST[$field]) || is_numeric($_POST[$field])) {
            $errors[$field] = "Campo obbligatorio. Inserire del testo.";
        }
    }

    if (!isset($_POST['modalità-remoto']) && !isset($_POST['modalità-presenza'])) {
        $errors['checkbox_group'] = "Seleziona almeno una modalità.";
    }

    if (!isset($_POST['contratto'])) {
        $errors['radio_group'] = "Seleziona un tipo di contratto.";
    }

    if (!is_numeric($_POST['stipendio']) || $_POST['stipendio'] === '') {
        $errors['stipendio'] = "Campo obbligatorio. Inserire un numero.";
    }

    // If there are errors, handle them (e.g., display error messages or prevent form submission)
    if (!empty($errors)) {
        $userValues = $_POST;
        header("Location: http://localhost/TW/EazyJobs/PubblicaAnnuncio.php?errors=".urlencode(json_encode($errors))
        ."&userValues=".urlencode(json_encode($userValues)));
    exit();

    } else {
        // If validation passes, proceed with form processing (sanitize, save to database, etc.)
        $annuncio->titolo = $_POST['titolo'];
        $annuncio->locazione = $_POST['locazione'];
        $annuncio->data_pub = date('Y-m-d H:i:s');
        $annuncio->settore = $_POST['settore'];

        $annuncio->remoto = 0;
        if (isset($_POST['modalità-remoto'])) {$annuncio->remoto = 1;}
        $annuncio->presenza = 0;
        if (isset($_POST['modalità-presenza'])) {$annuncio->presenza = 1;}

        $annuncio->contratto = $_POST['contratto'];
        $annuncio->desc_breve = $_POST['desc_breve'];
        $annuncio->desc_completa = $_POST['desc_completa'];
        $annuncio->livello_istruzione = $_POST['livello_istruzione'];
        $annuncio->esperienza = $_POST['esperienza'];
        $annuncio->stipendio = $_POST['stipendio'];
        $annuncio->azienda_id = $_SESSION['admin_id'];

        $result = $annuncio->insertNew();
        $num = $result->rowCount();

        if($num > 0) {
            header("Location: http://localhost/TW/EazyJobs/Admin.php");
            exit();
        }
        else {}     //think of suitable error message to pass onto PubblicaAnnuncio.php
        }
}
?>