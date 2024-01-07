<?php
  class Preferito {
    // DB Stuff
    private $conn;
    private $table = 'preferiti';

    // Properties
    public $utenti_id;
    public $annuncio_id;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    public function getAllFromID($utenteId) {
      $query = 'SELECT * FROM preferiti WHERE utenti_id = :utenteId';

      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':utenteId', $utenteId);

      $stmt->execute();

      return $stmt;
  }

    public static function insertNew($conn, $annuncioId, $userId) {
      $query = 'INSERT INTO preferiti (utenti_id, annuncio_id) VALUES (:userId ,:annuncioId)';

      $stmt = $conn->prepare($query);

      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':annuncioId', $annuncioId);

      $stmt->execute();
      return $stmt->rowCount();
  }

    public static function delete($conn, $annuncioId, $userId) {
        $query = 'DELETE FROM preferiti WHERE utenti_id = :userId AND annuncio_id = :annuncioId';

        $stmt = $conn->prepare($query);

        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':annuncioId', $annuncioId);

        $stmt->execute();
        return $stmt->rowCount();
    }
  }
?>