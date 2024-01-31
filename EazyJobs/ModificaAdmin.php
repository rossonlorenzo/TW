<?php 

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  include_once './config/connection.php';
  include_once './models/azienda.php';

  session_start();

  if (isset($_SESSION['admin_id'])) {
    $adminId = $_SESSION['admin_id'];

    $database = new Database();
    $conn = $database->connect();

    $azienda = new Azienda($conn);

    $result = $azienda->getById($adminId);
    $num = $result->rowCount();

    if($num > 0) {
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $nomefile = "./templates/ModificaAdmin.html";
            $contenuto = file_get_contents($nomefile);

            $errors = isset($_GET['errors']) ? json_decode(urldecode($_GET['errors']), true) : [];

            
            $nomeErrore = isset($errors['nome']) ? htmlspecialchars($errors['nome']) : '';
            $emailErrore = isset($errors['email']) ? htmlspecialchars($errors['email']) : '';
            $passwordErrore = isset($errors['password']) ? htmlspecialchars($errors['password']) : '';
            $sitoErrore = isset($errors['sito']) ? htmlspecialchars($errors['sito']) : '';
            $fondazioneErrore = isset($errors['fondazione']) ? htmlspecialchars($errors['fondazione']) : '';
            $dipendentiErrore = isset($errors['dipendenti']) ? htmlspecialchars($errors['dipendenti']) : '';
            $fatturatoErrore = isset($errors['fatturato']) ? htmlspecialchars($errors['fatturato']) : '';
            $locazioneErrore = isset($errors['locazione']) ? htmlspecialchars($errors['locazione']) : '';
            $settoreErrore = isset($errors['settore']) ? htmlspecialchars($errors['settore']) : '';
            $descCompletaErrore = isset($errors['desc_completa']) ? htmlspecialchars($errors['desc_completa']) : '';
            $logoErrore = isset($errors['logo']) ? htmlspecialchars($errors['logo']) : '';
            $credenzialiErrore = isset($errors['credenziali']) ? htmlspecialchars($errors['credenziali']) : '';
          
            
            $contenuto = str_replace("nome-placeholder", strval($nome), $contenuto);
            $contenuto = str_replace("email-placeholder", strval($email), $contenuto);
            $contenuto = str_replace("password-placeholder", strval($password), $contenuto);
            $contenuto = str_replace("sito-placeholder", strval($sito), $contenuto);   
            $contenuto = str_replace("currentYear-placeholder", date('Y'), $contenuto);  
            $contenuto = str_replace("fondazione-placeholder", strval($fondazione), $contenuto); 
            $contenuto = str_replace("dipendenti-placeholder", strval($dipendenti), $contenuto); 
            $contenuto = str_replace("fatturato-placeholder", strval($fatturato), $contenuto); 
            $contenuto = str_replace("locazione-placeholder", strval($sede), $contenuto); 
            $contenuto = str_replace("settore-placeholder", strval($settore), $contenuto); 
            $contenuto = str_replace("desc-completa-placeholder", strval($desc), $contenuto); 
            
            $contenuto = str_replace("nome-errore-placeholder", $nomeErrore, $contenuto);
            $contenuto = str_replace("email-errore-placeholder", $emailErrore, $contenuto);
            $contenuto = str_replace("password-errore-placeholder", $passwordErrore, $contenuto);
            $contenuto = str_replace("sito-errore-placeholder", $sitoErrore, $contenuto);
            $contenuto = str_replace("fondazione-errore-placeholder", $fondazioneErrore, $contenuto);
            $contenuto = str_replace("dipendenti-errore-placeholder", $dipendentiErrore, $contenuto);
            $contenuto = str_replace("fatturato-errore-placeholder", $fatturatoErrore, $contenuto);
            $contenuto = str_replace("locazione-errore-placeholder", $locazioneErrore, $contenuto);
            $contenuto = str_replace("settore-errore-placeholder", $settoreErrore, $contenuto);
            $contenuto = str_replace("desc-completa-errore-placeholder", $descCompletaErrore, $contenuto);
            $contenuto = str_replace("logo-errore-placeholder", $logoErrore, $contenuto);
            $contenuto = str_replace("credenziali-errore-placeholder", $credenzialiErrore, $contenuto);
        }
    } else {
        echo json_encode(
        array('message' => 'Nessuna azienda trovata')
        );
    }
    echo $contenuto;
  }
?>