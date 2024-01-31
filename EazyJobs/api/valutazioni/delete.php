<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/connection.php';
  include_once '../../models/valutazione.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $conn = $database->connect();
    session_start();

    $data = json_decode(file_get_contents("php://input"));

    $utenteId = $_SESSION['user_id'];
    $aziendaId = $data->id;

    $result = Valutazione::delete($conn, $utenteId, $aziendaId);
    if ($result > 0) {
        echo 'Recensione rimossa';
    }
}
?>