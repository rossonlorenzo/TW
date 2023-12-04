<?php
// Headers

use function PHPSTORM_META\type;

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/connection.php';
include_once '../../models/annuncio.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

$annuncio = new Annuncio($db);

$data_pub = $_GET['data_pub'] ?? 'Nessuna';
$nome = $_GET['nome'] ?? 'Nessuna';
$locazione = $_GET['locazione'] ?? 'Nessuna';
$settore = $_GET['settore'] ?? 'Nessuna';
$remoto = $_GET['remoto'] ?? 'Nessuna';
$presenza = $_GET['presenza'] ?? 'Nessuna';
$contratto = $_GET['contratto'] ?? 'Nessuna';
$livello_istruzione = $_GET['livello_istruzione'] ?? 'Nessuna';
$esperienza = $_GET['esperienza'] ?? "Nessuna";
$stipendio = $_GET['stipendio'] ?? "Nessuna";


// Crea un array con i filtri non nulli
$filters = array_filter(compact(
  'data_pub',
  'nome',
  'locazione',
  'settore',
  'remoto',
  'presenza',
  'contratto',
  'livello_istruzione',
  'esperienza',
  'stipendio'
));

if (empty($filters)) {
  $result = $annuncio->getAll();
} else {
  $result = $annuncio->getFiltered($filters);
}

$num = $result->rowCount();

if ($num > 0) {
  $cat_arr = array();
  $cat_arr['data'] = array();

  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $cat_item = array(
      'id' => $id,
      'titolo' => $titolo,
      'locazione' => $locazione,
      'data_pub' => $data_pub,
      'settore' => $settore,
      'remoto' => $remoto,
      'presenza' => $presenza,
      'contratto' => $contratto,
      'desc_breve' => $desc_breve,
      'desc_completa' => $desc_completa,
      'livello_istruzione' => $livello_istruzione,
      'esperienza' => $esperienza,
      'stipendio' => $stipendio,
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
