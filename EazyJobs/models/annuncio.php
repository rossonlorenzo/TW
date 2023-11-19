<?php
  class Annuncio {
    // DB Stuff
    private $conn;
    private $table = 'annunci';

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
      $stmt->bindParam(':data_pub', $this->data_pub);
      $stmt->bindParam(':ambito', $this->ambito);
      $stmt->bindParam(':remoto', $this->remoto);
      $stmt->bindParam(':contratto', $this->contratto);
      $stmt->bindParam(':desc_breve', $this->desc_breve);
      $stmt->bindParam(':desc_completa', $this->desc_completa);
      $stmt->bindParam(':titoli_r', $this->titoli_r);
      $stmt->bindParam(':esperienza', $this->esperienza);
      $stmt->bindParam(':paga_m', $this->paga_m);
      $stmt->bindParam(':azienda_id', $this->azienda_id);

      // Execute query
      $result = $stmt->execute();

      if ($result) {
          echo 'Success';
      } else {
          echo 'Failure';
      }
    }
  }