<!-- 
come far funzionare php, tutorial:
questo riguarda una misera connessione al db per ora.
se funziona dovrebbe stampare su consolo connection OK, e ritornarvi dei dati della tabelle aziende

1.  creare in locale sul proprio pc il db su pgAdmin, utilizzando lo script reperibile nel repo
2.  cambiare i dati qui sotto con i propri:
                                                $servername = "localhost"; dovrebbe andare così, in caso 127.0.0.1 dovrebbe andare se non va chiedetemi
                                                $username = "postgres"; se non avete smanettato con pgAdmin è quello di default ("postgres"), se ci avete smanettato probabilmente ci sapete fare.
                                                $password = "LorRos00" la vostra password di accesso al db, non la Master;
                                                $dbname = "TW" nome del db;   
-->
<?php
$servername = "localhost";
$username = "postgres";
$password = "LorRos00";
$dbname = "TW";

try {
  $conn = new PDO("pgsql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "connection OK";
  $stmt = $conn->prepare("SELECT * FROM aziende");
  $stmt->execute();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "ID: " . $row['id']. "\n";
    echo "Nome: " . $row['nome']. "\n";
  }
} catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>