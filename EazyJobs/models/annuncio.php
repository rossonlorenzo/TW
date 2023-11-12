<?php
  class Annuncio {
    // DB Stuff
    private $conn;
    private $table = 'annuncio';

    // Properties
    public $id;
    public $titolo;
    public $locazione;
    public $data_pub;
    public $ambito;
    public $remoto;
    public $contratto;
    public $desc_breve;
    public $desc_completa;
    public $titoli_r;
    public $esperienza;
    public $paga_m;
    public $azienda_id;
    public $nome;
    public $mail;


    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get categories
    public function getAll() {
      // Create query
      $query = 'SELECT * FROM annunci INNER JOIN aziende ON azienda_id = aziende.id ORDER BY annunci.id DESC';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }
  }