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
    public $media;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
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
  }