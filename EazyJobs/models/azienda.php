<?php
  class Azienda {
    // DB Stuff
    private $conn;
    private $table = 'aziende';

    // Properties
    public $id;
    public $email;
    public $password;
    public $nome;
    public $sito;
    public $fondazione;
    public $dipendenti;
    public $fatturato;
    public $sede;
    public $settore;
    public $desc;
    public $logo_path;
    public $media;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    public function insertNew() {
      $query = 'INSERT INTO aziende 
                (email, password, nome, sito, fondazione, dipendenti, fatturato, sede, settore, `desc`, logo_path) 
                VALUES 
                (:email, :password, :nome, :sito, :fondazione, :dipendenti, :fatturato, :sede, :settore, :description, :logo_path)';
  
      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':email', $this->email);
      $stmt->bindParam(':password', $this->password);
      $stmt->bindParam(':nome', $this->nome);
      $stmt->bindParam(':sito', $this->sito);
      $stmt->bindParam(':fondazione', $this->fondazione);
      $stmt->bindParam(':dipendenti', $this->dipendenti);
      $stmt->bindParam(':fatturato', $this->fatturato);
      $stmt->bindParam(':sede', $this->sede);
      $stmt->bindParam(':settore', $this->settore);
      $stmt->bindParam(':description', $this->desc);
      $stmt->bindParam(':logo_path', $this->logo_path);
  
      $stmt->execute();
      return $stmt;
  }  

  public function modifyOld() {
    $query = 'UPDATE aziende 
              SET email = :email, 
                  password = :password, 
                  nome = :nome, 
                  sito = :sito, 
                  fondazione = :fondazione, 
                  dipendenti = :dipendenti, 
                  fatturato = :fatturato, 
                  sede = :sede, 
                  settore = :settore, 
                  `desc` = :description 
              WHERE id = :id';

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password);
    $stmt->bindParam(':nome', $this->nome);
    $stmt->bindParam(':sito', $this->sito);
    $stmt->bindParam(':fondazione', $this->fondazione);
    $stmt->bindParam(':dipendenti', $this->dipendenti);
    $stmt->bindParam(':fatturato', $this->fatturato);
    $stmt->bindParam(':sede', $this->sede);
    $stmt->bindParam(':settore', $this->settore);
    $stmt->bindParam(':description', $this->desc);
    $stmt->bindParam(':id', $this->id);

    return $stmt->execute();
}


    public function getById($aziendaId) {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE id = :aziendaId';

      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':aziendaId', $aziendaId);

      $stmt->execute();

      return $stmt;
    }

    public function getAll_byVote() {
      $query = 'SELECT aziende.id, aziende.nome, aziende.settore, AVG(valutazioni.voto) AS media
      FROM aziende
      INNER JOIN valutazioni ON aziende.id = valutazioni.aziende_id
      GROUP BY aziende.id, aziende.nome, aziende.settore

      ORDER BY media ASC';

      $stmt = $this->conn->prepare($query);

      $stmt->execute();

      return $stmt;
    }

    public function getEmail() {
      $query = 'SELECT email FROM ' . $this->table . ' WHERE id = :aziendaId';
  
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':aziendaId', $this->id);
      $stmt->execute();
  
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      
      if ($result) {
          return $result['email'];
      } else {
          return null;
      }
  } 

  public function getLogoPath() {
    $query = 'SELECT logo_path FROM ' . $this->table . ' WHERE id = :aziendaId';
  
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':aziendaId', $this->id);
      $stmt->execute();
  
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      
      if ($result) {
          return $result['logo_path'];
      } else {
          return null;
      }
  }

    public function findEmailMatch() {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email';
  
      $stmt = $this->conn->prepare($query);
  
      $stmt->bindParam(':email', $this->email);
  
      $stmt->execute();
  
      if ($stmt->rowCount() > 0) {
          $row = $stmt->fetch(PDO::FETCH_ASSOC);
          $adminId = $row['id'];
  
          return $adminId;
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
          $adminId = $row['id'];
  
          return $adminId;
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

  public function updateLogoPath($adminId) {
    $query = "UPDATE aziende SET logo_path = :logoPath WHERE id = :adminId";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':logoPath', $this->logo_path);
    $stmt->bindParam(':adminId', $adminId);

    $stmt->execute();
  }
}