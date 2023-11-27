<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/connection.php';
  include_once '../../models/annuncio.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $conn = $database->connect();

    $data = json_decode(file_get_contents("php://input"));
    $annuncioId = $data;
    $annuncio = Annuncio::getById($conn, $annuncioId);

    if ($annuncio) {
        // Annuncio found, return the details as JSON
        header('Content-Type: application/json');
        echo json_encode($annuncio);
    } else {
        // Annuncio not found or error occurred
        echo json_encode(array('message' => 'Annuncio not found'));
    }
}