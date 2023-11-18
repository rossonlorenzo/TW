<?php
header("Access-Control-Allow-Origin: *");

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../../config/connection.php';
include_once '../../models/annuncio.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Log received data for debugging purposes
    file_put_contents('received_data.log', print_r($_POST, true));

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate Annuncio object
    $annuncio = new Annuncio($db);

    // Get form data
    $annuncio->titolo = $_POST['titolo'];
    $annuncio->locazione = $_POST['locazione'];
    // ... (add other form fields)

    // Call insertNew method
    if ($annuncio->insertNew()) {
        // On success, redirect or send a success message
        header('Location: success.php');
        exit();
    } else {
        // On failure, handle the error (redirect, show error message, etc.)
        header('Location: error.php');
        exit();
    }
}
?>
