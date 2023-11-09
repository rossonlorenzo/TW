<?php
  class Azienda {
    // DB Stuff
    private $conn;
    private $table = 'aziende';

    // Properties
    public $id;
    public $nome;
    // //public $logo;
    public $ambito;
    public $media;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get categories
    public function getAll_byVote() {
      // Create query
      $query = 'SELECT aziende.id, aziende.nome, aziende.ambito, AVG(valutazioni.voto) AS media
      FROM aziende
      INNER JOIN valutazioni ON aziende.id = valutazioni.aziende_id
      GROUP BY aziende.id, aziende.nome, aziende.ambito
      ORDER BY media ASC;';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }
  }