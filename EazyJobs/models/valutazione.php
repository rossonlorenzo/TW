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
    

}


