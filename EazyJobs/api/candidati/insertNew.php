<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  session_start();

  if (isset($_SESSION['user_id'])) {

    include_once '../../config/connection.php';
    include_once '../../models/candidato.php';

    // Instantiate DB & connect
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $database = new Database();
        $conn = $database->connect();

        $data = json_decode(file_get_contents("php://input"));
        $annuncioId = $data->id;
        $userId = $_SESSION['user_id'];

        $result = Candidato::insertNew($conn, $annuncioId, $userId);
        if ($result > 0) {
            echo 'Annuncio aggiunto ai candidati';
        }
    }
}
?>