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

    //Insert new listing
    public function insertNew() {
      // Create query
      $query = 'INSERT INTO ' . $this->table . '
        SET
            titolo = :titolo,
            locazione = :locazione,
            data_pub = :data_pub,
            ambito = :ambito,
            remoto = :remoto,
            contratto = :contratto,
            desc_breve = :desc_breve,
            desc_completa = :desc_completa,
            titoli_r = :titoli_r,
            esperienza = :esperienza,
            paga_m = :paga_m,
            azienda_id = :azienda_id';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Bind data
      $stmt->bindParam(':titolo', $this->titolo);
      $stmt->bindParam(':locazione', $this->locazione);
      // ... (bind other fields)

      // Execute query
      $stmt->execute();

      return $stmt;
    }
  }