<?php
  class Utente {
    // DB Stuff
    private $conn;
    private $table = 'utenti';

    // Properties
    public $id;
    public $email;
    public $password;
    public $nome;
    public $cv_path;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    public function getById($utenteId) {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE id = :utenteId';

      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':utenteId', $utenteId);

      $stmt->execute();

      return $stmt;
  }

    public function findMatch() {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email AND password = :password';
    
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
    
        $stmt->execute();
    
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $userId = $row['id'];
    
            return $userId;
        } else {
            return null;
        }
    }    
}