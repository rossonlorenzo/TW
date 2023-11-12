<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/connection.php';
  include_once '../../models/annuncio.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  $annuncio = new Annuncio($db);

  $result = $annuncio->getAll();
  
  $num = $result->rowCount();

  if($num > 0) {
        $cat_arr = array();
        $cat_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $cat_item = array(
            'id' => $id,
            'titolo' => $titolo,
            'locazione' => $locazione,
            'data_pub' => $data_pub,
            'ambito' => $ambito,
            'remoto' => $remoto,
            'contratto' => $contratto,
            'desc_breve' => $desc_breve,
            'desc_completa' => $desc_completa,
            'titoli_r' => $titoli_r,
            'esperienza' => $esperienza,
            'paga_m' => $paga_m,
            'azienda_id' => $azienda_id,
            'nome' => $nome,
            'mail' => $mail,
          );

          array_push($cat_arr['data'], $cat_item);
        }

        echo json_encode($cat_arr);

  } else {
        echo json_encode(
          array('message' => 'No annunci Found')
        );
  }