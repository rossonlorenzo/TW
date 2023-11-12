<?php
  class Annuncio {
    // DB Stuff
    private $conn;
    private $table = 'annuncio';

    // Properties
    public $titolo;
    public $locazione;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get categories
    public function getAll() {
      // Create query
      $query = 'SELECT titolo, locazione FROM annunci';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }
  }