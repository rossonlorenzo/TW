<?php
  class Valutazione {
    // DB Stuff
    private $conn;
    private $table = 'valutazioni';

    // Properties
    public $utenti_id;
    public $aziende_id;
    public $commento;
    public $voto;
    public $nome;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    public static function getById($conn, $utenteId, $aziendaId) {
      $query = 'SELECT * FROM valutazioni WHERE utenti_id = :utenteId AND aziende_id = :aziendaId';
      $stmt = $conn->prepare($query);
      $stmt->bindParam(':utenteId', $utenteId);
      $stmt->bindParam(':aziendaId', $aziendaId);
      $stmt->execute();
  
      return $stmt;
  }  

    public function insertNew() {
      $query = 'INSERT INTO valutazioni (utenti_id, aziende_id, commento, voto) VALUES (:utenti_id, :aziende_id, :commento, :voto)';
  
      $stmt = $this->conn->prepare($query);
  
      $stmt->bindParam(':utenti_id', $this->utenti_id);
      $stmt->bindParam(':aziende_id', $this->aziende_id);
      $stmt->bindParam(':commento', $this->commento);
      $stmt->bindParam(':voto', $this->voto);
  
      $stmt->execute();
      return $stmt;
  }

  public function modifyOld() {
    $query = 'UPDATE valutazioni 
        SET 
            commento = :commento,
            voto = :voto
        WHERE utenti_id = :utenteId AND aziende_id = :aziendaId';

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':commento', $this->commento);
    $stmt->bindParam(':voto', $this->voto);
    $stmt->bindParam(':utenteId', $this->utenti_id);
    $stmt->bindParam(':aziendaId', $this->aziende_id);

    $stmt->execute();
  
    return $stmt;
}

  public function checkDuplicate() {
    $query = "SELECT COUNT(*) as count FROM valutazioni WHERE utenti_id = :utenti_id AND aziende_id = :aziende_id";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':utenti_id', $this->utenti_id);
    $stmt->bindParam(':aziende_id', $this->aziende_id);

    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    return ($row['count'] > 0);
  }

    //get all Valutazioni filtered by azienda_id
    public function getAll_byAziendaId($aziendaId) {
        $query = 'SELECT valutazioni.*, utenti.nome AS nome
        FROM valutazioni
        INNER JOIN utenti ON valutazioni.utenti_id = utenti.id
        WHERE valutazioni.aziende_id = :aziendaId';    
  
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':aziendaId', $aziendaId);
  
        $stmt->execute();
  
        return $stmt;
      }

      public function getAll_byUtenteId($utenteId) {
        // Create query
        $query = 'SELECT valutazioni.*, utenti.nome AS nome
                  FROM valutazioni
                  INNER JOIN utenti ON valutazioni.utenti_id = utenti.id
                  WHERE valutazioni.utenti_id = :utenteId';
    
        // Prepare statement
        $stmt = $this->conn->prepare($query);
    
        // Bind parameter
        $stmt->bindParam(':utenteId', $utenteId);
    
        // Execute query
        $stmt->execute();
    
        return $stmt;
    }

    public static function delete($conn, $utenteId, $aziendaId) {
      $query = 'DELETE FROM valutazioni WHERE utenti_id = :utenteId AND aziende_id = :aziendaId';
      $stmt = $conn->prepare($query);
      $stmt->bindParam(':utenteId', $utenteId);
      $stmt->bindParam(':aziendaId', $aziendaId);
      $stmt->execute();
  
      return $stmt->rowCount();
    }
}


