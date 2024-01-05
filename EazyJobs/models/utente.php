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

    public function insertNew() {
      $query = 'INSERT INTO utenti (email, password, nome, cv_path) VALUES (:email, :password, :nome, :cv_path)';
  
      $stmt = $this->conn->prepare($query);
  
      $stmt->bindParam(':email', $this->email);
      $stmt->bindParam(':password', $this->password);
      $stmt->bindParam(':nome', $this->nome);
      $stmt->bindParam(':cv_path', $this->cv_path);
  
      $stmt->execute();
      return $stmt;
  }

  public function modifyOld() {
    $query = 'UPDATE utenti
        SET 
            email = :email,
            password = :password,
            nome = :nome
        WHERE id = :utenteId';

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password);
    $stmt->bindParam(':utenteId', $this->id);
    $stmt->bindParam(':nome', $this->nome);
  
    return $stmt->execute();
  }

    public function getById($utenteId) {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE id = :utenteId';

      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':utenteId', $utenteId);

      $stmt->execute();

      return $stmt;
  }

  public function findEmailMatch() {
    $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email';

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':email', $this->email);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $userId = $row['id'];

        return $userId;
    } else {
        return null;
    }
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

    public function getEmail() {
      $query = 'SELECT email FROM ' . $this->table . ' WHERE id = :utenteId';
  
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':utenteId', $this->id);
      $stmt->execute();
  
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      
      if ($result) {
          return $result['email'];
      } else {
          return null;
      }
  }  

  public function getCVPath() {
    $query = 'SELECT cv_path FROM ' . $this->table . ' WHERE id = :utenteId';
  
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':utenteId', $this->id);
      $stmt->execute();
  
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      
      if ($result) {
          return $result['cv_path'];
      } else {
          return null;
      }
  }

  public static function getLastInsertedId($db) {
    $query = "SELECT LAST_INSERT_ID() as last_id";

    $stmt = $db->prepare($query);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    return $row['last_id'];
  }

  public function updateCVPath($userId) {
    $query = "UPDATE utenti SET cv_path = :cvPath WHERE id = :userId";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':cvPath', $this->cv_path);
    $stmt->bindParam(':userId', $userId);

    $stmt->execute();
}
}