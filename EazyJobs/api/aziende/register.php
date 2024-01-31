<?php 

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/connection.php';
  include_once '../../models/azienda.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->connect();

    $errors = [];

    $max_name_length = 60;
    if (empty($_POST['nome']) || is_numeric($_POST['nome']) || strlen($_POST['nome']) > $max_name_length) {
        $errors['nome'] = "Inserire un nome valido";
    }

    if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Inserire un'email valida";
    }

    $min_length = 8;
    $max_length = 12;
    if (empty($_POST['password']) || strlen($_POST['password']) < $min_length || strlen($_POST['password']) > $max_length) {
        $errors['password'] = "Inserire una password valida ({$min_length}-{$max_length} caratteri)";
    }

    if (empty($_POST['sito']) || !filter_var($_POST['sito'], FILTER_VALIDATE_URL)) {
        $errors['sito'] = "Inserire un sito valido";
    }

    $min_year = 1800;
    $max_year = (int)date('Y');
    if (!isset($_POST['fondazione']) || !ctype_digit($_POST['fondazione']) || $_POST['fondazione'] === '' || (int)$_POST['fondazione'] < $min_year || (int)$_POST['fondazione'] > $max_year) {
        $errors['fondazione'] = "Inserire un anno valido";
    }
    
    if (!is_numeric($_POST['dipendenti']) || $_POST['dipendenti'] === '') {
        $errors['dipendenti'] = "Inserire un numero di dipendenti valido";
    }

    if (!is_numeric($_POST['fatturato']) || $_POST['fatturato'] === '') {
        $errors['fatturato'] = "Inserire un fatturato valido";
    }

    $max_length = 60;
    if (empty($_POST['locazione']) || is_numeric($_POST['locazione']) || strlen($_POST['locazione']) > $max_length) {
        $errors['locazione'] = "Inserire una provincia valida";
    }

    if (empty($_POST['settore']) || is_numeric($_POST['settore']) || strlen($_POST['settore']) > $max_length) {
        $errors['settore'] = "Inserire un settore valido";
    }

    $min_desc_length = 100;
    $max_desc_length = 500;
    if (empty($_POST['desc_completa']) || is_numeric($_POST['desc_completa']) || strlen($_POST['desc_completa']) < $min_desc_length || strlen($_POST['desc_completa']) > $max_desc_length) {
        $errors['desc_completa'] = "Inserire una descrizione completa valida ({$min_desc_length}-{$max_desc_length} caratteri)";
    }

    if ($_FILES['logo']['type'] !== 'application/png') {
        $errors['logo'] = "Inserire un logo valido (formato PNG)";
    }

    if (!empty($errors)) {
        header("Location: ../../RegistraAdmin.php?errors=".urlencode(json_encode($errors)));
        exit();
    }

    $azienda = new Azienda($db);

    $azienda->nome = $_POST['nome'];
    $azienda->email = $_POST['email'];
    $azienda->password = $_POST['password'];
    $azienda->sito = $_POST['sito'];
    $azienda->fondazione = $_POST['fondazione'];
    $azienda->dipendenti = $_POST['dipendenti'];
    $azienda->fatturato = $_POST['fatturato'];
    $azienda->sede = $_POST['locazione'];
    $azienda->settore = $_POST['settore'];
    $azienda->desc = $_POST['desc_completa'];

    if ($azienda->findEmailMatch() || $azienda->findMatch()) {
        $errors['credenziali'] = "Le credenziali inserite sono già in uso.";
        header("Location: ../../RegistraAdmin.php?errors=".urlencode(json_encode($errors)));
        exit();
    }

    $result = $azienda->insertNew();
    $num = $result->rowCount();

    if($num > 0) {
        $adminIdInserito = Azienda::getLastInsertedId($db);
    
        $uploadDirectory = '../../assets/logos/';
        $newFileName = $adminIdInserito . '_logo.png';
    
        if (move_uploaded_file($_FILES['logo']['tmp_name'], $uploadDirectory . $newFileName)) {
            $azienda->logo_path = $uploadDirectory . $newFileName;
            $azienda->updateLogoPath($adminIdInserito);
        }

        header("Location: ../../Accedi.php");
        exit();
    }
}
?>

  

