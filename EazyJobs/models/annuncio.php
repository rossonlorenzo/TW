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
    public $settore;
    public $remoto;
    public $presenza;
    public $contratto;
    public $desc_breve;
    public $desc_completa;
    public $livello_istruzione;
    public $esperienza;
    public $stipendio;
    public $azienda_id;
    public $nome;
    public $mail;


    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    //Get listing by id
    public static function getById($conn, $id) {
      $query = 'SELECT * FROM annunci WHERE id = :annuncioId';
      $stmt = $conn->prepare($query);
      $stmt->bindParam(':annuncioId', $id);
      $stmt->execute();

      $annuncio = $stmt->fetch(PDO::FETCH_ASSOC);
      return $annuncio;
    }

    // Get all listings
    public function getAll() {
      // Create query
      $query = 'SELECT * FROM annunci INNER JOIN aziende ON azienda_id = aziende.id ORDER BY annunci.id DESC';
      // Prepare statement
      $stmt = $this->conn->prepare($query);
      // Execute query
      $stmt->execute();
      return $stmt;
    }

    //Get listings filtered by id
    public function getAllbyId() {
      // Create query
      $query = 'SELECT 
      annunci.id AS annuncio_id,  
      annunci.*, aziende.*
      FROM annunci
      INNER JOIN aziende ON annunci.azienda_id = aziende.id
      WHERE annunci.azienda_id = 1  /*change to the logged in azienda id*/
      ORDER BY annunci.id DESC
      ';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    public function getFiltered($filters) {
      // Create the base query
      $query = 'SELECT annunci.id, azienda_id, titolo, mail, desc_completa, desc_breve, data_pub, nome, locazione, annunci.settore, remoto, presenza, contratto, livello_istruzione, esperienza, stipendio FROM annunci INNER JOIN aziende ON azienda_id = aziende.id WHERE 1';
  
      // Create an array to store conditions
      $conditions = array();
  
      // Check and add conditions for each filter parameter
      if (($filters['nome'])!="Nessuna") {
          $conditions[] = 'nome = :nome';
      }
      if (($filters['locazione'])!="Nessuna") {
          $conditions[] = 'locazione = :locazione';
      }
      if (($filters['settore'])!="Nessuna") {
          $conditions[] = 'annunci.settore = :settore';
      }
      if (($filters['remoto'])!= 'Nessuna') {
          $conditions[] = 'remoto = :remoto';
      }
      if (($filters['presenza'])!= 'Nessuna') {
        $conditions[] = 'presenza = :presenza';
    }
      if (($filters['contratto']) != 'Nessuna') {
          $conditions[] = 'contratto = :contratto';
      }
      if (($filters['livello_istruzione'])!="Nessuna") {
          $conditions[] = 'livello_istruzione = :livello_istruzione';
      }
    //   if (!empty($filters['esperienza'])) {
    //       $conditions[] = 'esperienza = :esperienza';
    //   }
    //   if (!empty($filters['stipendio'])) {
    //       $conditions[] = 'stipendio <= :stipendio';
    //   }
  
      // If conditions exist, add them to the query
      if (!empty($conditions)) {
          $query .= ' AND ' . implode(' AND ', $conditions);
      }
  
      // Prepare statement
      $stmt = $this->conn->prepare($query);
  
      // Bind parameters
      if (($filters['nome'])!="Nessuna") {
          $stmt->bindParam(':nome', $filters['nome']);
      }
      if (($filters['locazione'])!="Nessuna") {
          $stmt->bindParam(':locazione', $filters['locazione']);
      }
      if (($filters['settore'])!="Nessuna") {
          $stmt->bindParam(':settore', $filters['settore']);
      }
      if (($filters['remoto'])!='Nessuna') {
          $stmt->bindParam(':remoto', $filters['remoto']);
      }
      if (($filters['presenza'])!='Nessuna') {
        $stmt->bindParam(':presenza', $filters['presenza']);
      }
      if (($filters['contratto'])!= 'Nessuna') {
          $stmt->bindParam(':contratto', $filters['contratto']);
      }
      if (($filters['livello_istruzione'])!="Nessuna") {
          $stmt->bindParam(':livello_istruzione', $filters['livello_istruzione']);
      }
    //   if (!empty($filters['esperienza'])) {
    //       $stmt->bindParam(':esperienza', $filters['esperienza']);
    //   }
    //   if (!empty($filters['stipendio'])) {
    //       $stmt->bindParam(':stipendio', $filters['stipendio']);
    //   }
  
      // Execute query
      $stmt->execute();
  
      return $stmt;
  }
  

    //Insert new listing
    public function insertNew() {
      $query = 'INSERT INTO ' . $this->table . '
        SET
            titolo = :titolo,
            locazione = :locazione,
            data_pub = :data_pub,
            settore = :settore,
            remoto = :remoto,
            presenza = :presenza,
            contratto = :contratto,
            desc_breve = :desc_breve,
            desc_completa = :desc_completa,
            livello_istruzione = :livello_istruzione,
            esperienza = :esperienza,
            stipendio = :stipendio,
            azienda_id = :azienda_id';

      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':titolo', $this->titolo);
      $stmt->bindParam(':locazione', $this->locazione);
      $stmt->bindParam(':data_pub', $this->data_pub);
      $stmt->bindParam(':settore', $this->settore);
      $stmt->bindParam(':remoto', $this->remoto);
      $stmt->bindParam(':presenza', $this->presenza);
      $stmt->bindParam(':contratto', $this->contratto);
      $stmt->bindParam(':desc_breve', $this->desc_breve);
      $stmt->bindParam(':desc_completa', $this->desc_completa);
      $stmt->bindParam(':livello_istruzione', $this->livello_istruzione);
      $stmt->bindParam(':esperienza', $this->esperienza);
      $stmt->bindParam(':stipendio', $this->stipendio);
      $stmt->bindParam(':azienda_id', $this->azienda_id);

      $stmt->execute();

      if ($stmt->rowCount() > 0) {
          echo 'Success';
      } else {
          echo 'Failure';
      }
    }

    public function modifyOld() {
      $query = 'UPDATE annunci 
        SET 
          titolo = :titolo,
          locazione = :locazione,
          data_pub = :data_pub,
          settore = :settore,
          remoto = :remoto,
          presenza = :presenza,
          contratto = :contratto,
          desc_breve = :desc_breve,
          desc_completa = :desc_completa,
          livello_istruzione = :livello_istruzione,
          esperienza = :esperienza,
          stipendio = :stipendio,
          azienda_id = :azienda_id
        WHERE annunci.id = :id';
      
      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':id', $this->id);
      $stmt->bindParam(':titolo', $this->titolo);
      $stmt->bindParam(':locazione', $this->locazione);
      $stmt->bindParam(':data_pub', $this->data_pub);
      $stmt->bindParam(':settore', $this->settore);
      $stmt->bindParam(':remoto', $this->remoto);
      $stmt->bindParam(':presenza', $this->presenza);
      $stmt->bindParam(':contratto', $this->contratto);
      $stmt->bindParam(':desc_breve', $this->desc_breve);
      $stmt->bindParam(':desc_completa', $this->desc_completa);
      $stmt->bindParam(':livello_istruzione', $this->livello_istruzione);
      $stmt->bindParam(':esperienza', $this->esperienza);
      $stmt->bindParam(':stipendio', $this->stipendio);
      $stmt->bindParam(':azienda_id', $this->azienda_id);

      $stmt->execute();
    
      if ($stmt->rowCount() > 0) {
        echo 'Success';
      } else {
          echo 'Failure';
      }
    }

    public static function delete($conn, $id) {
      $query = 'DELETE FROM annunci WHERE id = :annuncioId';
      $stmt = $conn->prepare($query);
      $stmt->bindParam(':annuncioId', $id);
      $stmt->execute();
      
      return $stmt->rowCount();
  }
}