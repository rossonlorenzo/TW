<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Content-Type: text/html; charset=utf-8');


include_once 'config/connection.php';
include_once 'models/annuncio.php';
include_once 'models/preferito.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();
session_start();

// da fare che se utente loggato, non si mostra bottone salva, ma banner "già salvato"
$preferiti = array();
if (isset($_SESSION['user_id'])) {
    $utenteID = $_SESSION['user_id'];
    $preferito = new Preferito($db);

    $result = $preferito->getAllFromID($utenteID);
    $num = $result->rowCount();
    if ($num > 0) {
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            array_push($preferiti, $annuncio_id);
        }
    }
}

$annuncio = new Annuncio($db);

$data_pub = $_GET['data_pub'] ?? null;
$nome = $_GET['nome'] ?? null;
$locazione = $_GET['locazione'] ?? null;
$settore = $_GET['settore'] ?? null;
$remoto = $_GET['remoto'] ?? null;
$presenza = $_GET['presenza'] ?? null;
$contratto = $_GET['contratto'] ?? null;
$livello_istruzione = $_GET['livello_istruzione'] ?? null;
$esperienza = $_GET['esperienza'] ?? null;
$stipendio = $_GET['stipendio'] ?? null;

// serve per gestire la ricerca quando i filtri di tipo select sono impostati su "Nessuna" 
$nome = ($nome === "Nessuna") ? null : $nome;
$locazione = ($locazione === "Nessuna") ? null : $locazione;
$settore = ($settore === "Nessuna") ? null : $settore;
$livello_istruzione = ($livello_istruzione === "Nessuna") ? null : $livello_istruzione;


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

// popola i filtri 
// l'unica cosa che non mi piace è che lo deve fare anche quando
// si filtrano gli annunci e quindi si fa una ricerca e si ricarica la pagina, però penso non si possa evitare
// Bisogna farlo perchè altrimenti i filtri si adattano alla query "filtrata" e quindi non ci sarebbero tutti i campi

$result = $annuncio->getAll();
$num = $result->rowCount();

if ($num > 0) {
    $min = "flag";
    $str_professione = "";
    $str_locazione = "";
    $str_provincie = "";
    $str_nome = "";
    $str_settore = "";
    $max = 0;
    $duplicate = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        if ($min == "flag") {
            $min = $stipendio;
        };

            if (!in_array($titolo, $duplicate)) {
                array_push($duplicate, $titolo);
                $str_professione .=
                    "<option value='" . $titolo . "'> \n";
            }

            if (!in_array($locazione, $duplicate)) {
                array_push($duplicate, $locazione);
                $str_locazione .=
                    "<option value='" . $locazione . "'> \n";
                $str_provincie .=
                    "<option value='" . $locazione . "'> " . $locazione . "</option>\n";
            }

            if (!in_array($nome, $duplicate)) {
                array_push($duplicate, $nome);
                $str_nome .=
                    "<option value='" . $nome . "'> \n";
            }

            if (!in_array($settore, $duplicate)) {
                array_push($duplicate, $settore);
                $str_settore .=
                    "<option value='" . $settore . "'> " . $settore . "</option>\n";
            }

            if ($stipendio > $max)
                $max = $stipendio;

            if ($stipendio < $min)
                $min = $stipendio;
        };
} else {
    echo json_encode(
        array('message' => 'Nessun annuncio trovato')
    );
}

// popola gli annunci, se non ci sono filtri, o meglio, al primo caricamento fa getAll. 
// Questo perchè se si fa una ricerca filtrata, i filtri di stipendio ed esperienza non si possono mettere a null (l'utente non può)
// quindi anche se si imposta tutto su "Nessuna" o si lasciano dei campi vuoti, il sistema lo vedrà comunque come una ricerca 
// filtrata. Ovviamente non rappresenta un problema, a livello funzionale. Volevo solo condividere l'info con voi
if (empty($filters)) {
    $result1 = $annuncio->getAll();
} else {
    $result1 = $annuncio->getFiltered($filters);
}

$num = $result1->rowCount();

if ($num > 0) {
    $str_annunci = "";
    $str_completo = "";
    $first = true;

    while ($row = $result1->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $str_annunci .=
            "<li id='#" . $id . "'>" .
            "<a href='#id=" . $id . "' class='annuncio-link' data-target='annuncio-" . $id ."'>" .
            "<h3>" . $titolo . "</h3>" .
            "</a>" .

            "<div class='header-annunci'>" .
            "<h4>" . $nome . "</h4>" .
            //logo
            "<img src='./assets/logos/SyncLab-logo.png' alt='SyncLab-logo'>" .
            "</div>" .

            "<h5>Descrizione:</h5>" .
            "<p>" . $desc_breve . "</p>" .

            "<ul class='job-info'>" .
            "<li><h5>Loco:</h5><p>" . $locazione . "</p></li>" .
            "<li><h5>Stipendio medio:</h5><p>" . $stipendio . "€</p></li>" .
            "<li><h5>Contatti:</h5><p>" . $email . "</p></li>" .
            "</ul>" .
            "</li>";

        if ($first == true) {
            $str_completo .=
            "<article id='annuncio-" . $id . "' class='annuncio-completo'>";
            $first = false;
        }else{
            $str_completo .=
            "<article id='annuncio-" . $id . "' class='annuncio-completo hidden'>";
        }
            $ml = "";

            if ($presenza == 1) {
                $ml = " In presenza";
            }

            if ($remoto == 1) {
                $ml = "Da remoto";
                if ($presenza == 1) {
                    $ml .= " e in presenza";
                }
            }

            $str_completo .=
                "<h3>" . $titolo . "</h3>" .

                "<div class='header-annunci'>" .
                "<h4>" . $nome . "</h4>" .
                //logo
                "<img src='./assets/logos/SyncLab-logo.png' alt='SyncLab-logo'>" .
                "</div>" .

                "<h5>Descrizione:</h5>" .
                "<p>" . $desc_completa . "</p>" .

                "<ul class='annuncio-info'>" .
                //da fare
                "<li><h5>Candidati all'annuncio:</h5><p>5</p></li>" .
                "<li><h5>Recensioni dell'azienda:</h5><p>20</p></li>" .
                "</ul>" .

                "<div class='dettagli'>" .
                "<ul class='job-complete-info'>" .
                "<li><h5>Data di pubblicazione:</h5><p>" . $data_pub . "</p></li>" .
                "<li><h5>Loco:</h5><p>" . $locazione . "</p></li>" .
                "<li><h5>Settore:</h5><p>" . $settore . "</p></li>" .
                "<li><h5>Modalita' di lavoro:</h5><p>" . $ml . "</p></li>" .
                "<li><h5>Tipo di contratto:</h5><p>" . $contratto . "</p></li>" .
                "<li><h5>Livello di istruzione richiesto:</h5><p>" . $livello_istruzione . "</p></li>" .
                "<li><h5>Esperienza minima richiesta:</h5><p>" . $esperienza . "</p></li>" .
                "<li><h5>Stipendio:</h5><p>" . $stipendio . " €</p></li>" .
                "<li><h5>Contatti:</h5><p>s" . $email . "</p></li>" .
                "</ul>" .
                "</div>" .

                "<ul class='azioni-aggiuntive'>" .
                "<li><input type='submit' class='bottone-dettagli' value='Mostra più dettagli'></li>" .
                "<li><input type='submit' class='bottone-candidati' value='Candidati'></li>" ;
                if(!in_array($id, $preferiti)){
                    $str_completo .= "<li><input type='submit' class='bottone-salva' data-id='" . $id ."' value='Salva'></li>" ;
                } else{
                    $str_completo .= "<p id='salvato'>Annuncio già salvato.</p>" ;
                }
                $str_completo .= 
                    "</ul>".
                    "<input type='submit' class='bottone-annunci' data-target='annuncio-" . $id ."' value='Torna agli annunci'>" .
                    "</article>";
        
    }
} else {
    echo json_encode(
        array('message' => 'Nessun annuncio trovato')
    );
}

$nomefile = "./templates/Annunci.html";
$contenuto = file_get_contents($nomefile);

if (isset($_SESSION['user_id'])) {
    $contenuto = str_replace("php-placeholder", "User.php", $contenuto);
    $contenuto = str_replace("link-placeholder", "Area personale", $contenuto);
} else if (isset($_SESSION['admin_id'])) {
    $contenuto = str_replace("php-placeholder", "Admin.php", $contenuto);
    $contenuto = str_replace("link-placeholder", "Area personale", $contenuto);
} else {
    $contenuto = str_replace("php-placeholder", "Accedi.php", $contenuto);
    $contenuto = str_replace("link-placeholder", "Accedi", $contenuto);
}

$contenuto = str_replace("<!--annunci-placeholder-->", $str_annunci, $contenuto);
$contenuto = str_replace("<!--completo-placeholder-->", $str_completo, $contenuto);
$contenuto = str_replace("<!--titolo-placeholder-->", $str_professione, $contenuto);
$contenuto = str_replace("<!--locazione-placeholder-->", $str_locazione, $contenuto);
$contenuto = str_replace("<!--provincie-placeholder-->", $str_provincie, $contenuto);
$contenuto = str_replace("<!--nome-placeholder-->", $str_nome, $contenuto);
$contenuto = str_replace("<!--settore-placeholder-->", $str_settore, $contenuto);
$contenuto = str_replace("min-placeholder", $min, $contenuto);
$contenuto = str_replace("max-placeholder", $max, $contenuto);
$contenuto = str_replace("value-placeholder", $max, $contenuto);
echo $contenuto;
