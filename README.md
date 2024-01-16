# TW
progetto di TW unipd 2023/24

## Guida al utilizzo
- ### Windows e Linux
    Prima di tutto scaricare XAMPP, e avviare il software. Nella cartella di installazione di XAMPP ci sarà una sottocartella htdocs, li dentro clonate la repo. Una volta avviato xampp sarà possibile collegarsi al "server locale" http://localhost. Prima di aprire il sito in sè, sarà necessario aprire phpmyAdmin (dovreste trovare l'opzione sulla pagina di xampp del server locale appena citata) e in esso caricare il db, utilizzando lo script nel file db.sql disponibile sul repo. Per visualizzare il sito e aprire, ad esempio, la home, basterà visitare il link http://localhost/nome_cartella_contenente_il_repo/ e navigare tra i file fino a raggiungere la home.
- ### Mac
    Uguale a windows ma il software si chiama MAMP


## Utilizzo del server tec web da remoto
- ### Creazione tunnel:
  Da qualsiasi shell (anche command prompt di Windows) inviare il comando:\
  `ssh username_lab@sshpaolotti.studenti.math.unipd.it -L8080:tecweb:80 -L8022:tecweb:22`

- ### Gestione file con client ftp FileZilla (download at https://filezilla-project.org):
    1. creare tunnel come visto sopra

    2. compilare i campi:\
	    Host -> sftp://localhost\
	    Nome utente -> username lab\
	    Password -> password lab\
	    Porta -> 8022 (numero porta che avete associato alla porta 22 del server tw nel comando di             creazione tunnel)

     3. cliccare su connessione rapida
  
    *RICORDA: i file del sito vanno messi nella cartella public_html*
  
- ### Accesso al server tec web da shell:
  Dopo aver creato il tunnel con si può accedere al server tec web dalla stessa shell con:\
  `ssh username_lab@tecweb.studenti.math.unipd.it`

- ### Setup database su server tec web:
  1. recuperare la password per accedere al vostro db (si trova in un file .txt)\
    tramite filezilla oppure o direttamente dalla shell
  2. All'inizio del file.sql da eseguire inserire `USE username_lab;`
  3. per accedere al dbms, dalla shell digitare:\
    `mysql -u username_lab -p`\
    la password da inserire sarà quella recuperata dal file .txt
  4. eseguire il file.sql dal dbms:\
     `source TW.sql`
  5. nel file php dedicato alla connessione al db:\
     db_name = username_lab\
	 username = username_lab\
	 host = localhost\
	 password = password del server tecweb
     
- ### Accedere al sito da browser:
  è sufficiente creare il tunnel e collgarsi da browser a:\
  `http://localhost:8080/username_lab/percorso_partendo_da_public_html`
  
