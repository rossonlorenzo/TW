<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/connection.php';
  include_once '../../models/valutazione.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  $valutazioni = new Valutazione($db);

  $result = $valutazioni->getAll_byAziendaId();
  
  $num = $result->rowCount();

  if($num > 0) {
        $cat_arr = array();
        $cat_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $cat_item = array(
            'utenti_id' => $utenti_id,
            'aziende_id' => $aziende_id,
            'commento' => $commento,
            'voto' => $voto,
            'nome' => $nome,
          );

          array_push($cat_arr['data'], $cat_item);
        }

        echo json_encode($cat_arr);

  } else {
        echo json_encode(
          array('message' => 'No valutazioni Found')
        );
  }
