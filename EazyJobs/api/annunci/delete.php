<?php 

  include_once '../../config/connection.php';
  include_once '../../models/annuncio.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $conn = $database->connect();

    $data = json_decode(file_get_contents("php://input"));
    $annuncioId = $data->id;

    $result = Annuncio::delete($conn, $annuncioId);
    if ($result > 0) {
        echo 'Annuncio rimosso';
    }
}
?>