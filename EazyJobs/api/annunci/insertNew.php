<?php
header("Access-Control-Allow-Origin: *");

include_once '../../config/connection.php';
include_once '../../models/annuncio.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate Annuncio object
    $annuncio = new Annuncio($db);

    // Get form data
    $annuncio->titolo = $_POST['titolo'];
    $annuncio->locazione = $_POST['locazione'];
    $annuncio->data_pub = date('Y-m-d H:i:s');
    $annuncio->settore = $_POST['settore'];
    if (isset($_POST['workMode1'])) {   //add "presenza" as an attribute to the annunci table
        $annuncio->remoto = true;
    } else {
        $annuncio->remoto = false;
    }
    $annuncio->contratto = $_POST['contractType'];
    $annuncio->desc_breve = $_POST['desc_breve'];
    $annuncio->desc_completa = $_POST['desc_completa'];
    $annuncio->livello_istruzione = $_POST['livello_istruzione'];    //add facolta' to the html form
    $annuncio->esperienza = $_POST['esperienza'];
    $annuncio->stipendio = $_POST['stipendio'];
    $annuncio->azienda_id = '1';    //replace with the id of the azienda logged in

    // Call insertNew method
    $annuncio->insertNew();
}
?>
