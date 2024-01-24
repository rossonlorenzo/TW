<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);

  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/connection.php';
  include_once '../../models/utente.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->connect();
    session_start();

    //server-side validation
    $errors = [];

    if ($_FILES['cv']['type'] !== 'application/pdf') {
        $errors['cv'] = "Inserire un cv valido (formato PDF)";
    }

    if (!empty($errors)) {
        header("Location: ../../User.php?errors=".urlencode(json_encode($errors)));
        exit();
    }

    //form implementation
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $utente = new Utente($db);
        $utente->id = $userId;
        
        if ($_FILES['cv']['size'] > 0) {
            $uploadDirectory = '../../assets/cvs/';
            $currentCVPath = $utente->getCVPath();
            $newFileName = $userId . '_cv.pdf';

            if (file_exists($currentCVPath)) {
                unlink($currentCVPath);
            }
            if (move_uploaded_file($_FILES['cv']['tmp_name'], $uploadDirectory . $newFileName)) {
                header("Location: ../../User.php");
                exit();
            }
        }   
    }
}

  

