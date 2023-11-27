<?php
header("Access-Control-Allow-Origin: *");

include_once '../../config/connection.php';
include_once '../../models/annuncio.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->connect();

    $annuncio = new Annuncio($db);

    $annuncio->id = $_POST['id'];
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
    $annuncio->azienda_id = '1';    //replace with the id of the azienda logged in

    $annuncio->modifyOld();
}