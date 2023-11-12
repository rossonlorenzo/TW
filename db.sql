-- SQLINES DEMO *** enerated by the ERD tool in pgAdmin 4.
-- SQLINES DEMO *** ue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.

DROP TABLE IF EXISTS valutazioni;
DROP TABLE IF EXISTS candidate;
DROP TABLE IF EXISTS preferiti;
DROP TABLE IF EXISTS annunci;
DROP TABLE IF EXISTS utenti;
DROP TABLE IF EXISTS aziende;



-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS utenti
(
    id int NOT NULL AUTO_INCREMENT,
    mail character varying(60) NOT NULL,
    password character varying(60) NOT NULL,
	nome character varying(60) NOT NULL,
    cv_path character varying(90) NOT NULL,
    PRIMARY KEY (id)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO utenti(mail, password, nome, cv_path)
VALUES
	('marco.rossi@gmail.com', 'aoc72hdn!o', 'Marco Rossi', '/uploads/cvs/1/marcorossi_cv.pdf'),
    ('laura.bianchi@hotmail.com', '9Kp$u8*1', 'Laura Bianchi', '/uploads/cvs/2/laurabianchi_cv.pdf'),
    ('andrea.verdi@yahoo.it', 'P#2sTm7&', 'Andrea Verdi', '/uploads/cvs/3/andreaverdi_cv.pdf'),
	('giovanni.martini@gmail.com', 'C4vP@ssw0', 'Giovanni Martini', '/uploads/cvs/4/giovannimartini_cv.pdf'),
    ('eleonora.rossi@hotmail.com', 'Pwd$3crE@', 'Eleonora Rossi', '/uploads/cvs/5/eleonorarossi_cv.pdf'),
    ('francesco.verdi@yahoo.it', '5tr0n9#Pwd', 'Francesco Verdi', '/uploads/cvs/6/francescoverdi_cv.pdf'),
    ('alessia.bianchi@gmail.com', 'R@nD0m#Pwd', 'Alessia Bianchi', '/uploads/cvs/7/alessiabianchi_cv.pdf'),
    ('luca.rossi@hotmail.com', 'P@$$w0rd123', 'Luca Rossi', '/uploads/cvs/8/lucarossi_cv.pdf'),
    ('lucia.verdi@yahoo.it', '12345P@$$', 'Lucia Verdi', '/uploads/cvs/9/luciaverdi_cv.pdf'),
    ('simone.bianchi@gmail.com', 'MyPwd$123', 'Simone Bianchi', '/uploads/cvs/10/simonebianchi_cv.pdf'),
	('maria.martini@gmail.com', 'R@nD0mP@ss1', 'Maria Martini', '/uploads/cvs/11/mariamartini_cv.pdf'),
    ('gabriele.rossi@hotmail.com', 'P@$$1234', 'Gabriele Rossi', '/uploads/cvs/12/gabrielerossi_cv.pdf'),
    ('elena.verdi@yahoo.it', '3x@mpl3Pwd', 'Elena Verdi', '/uploads/cvs/13/elenaverdi_cv.pdf'),
    ('andrea.bianchi@gmail.com', 'MyPwd$567', 'Andrea Bianchi', '/uploads/cvs/14/andreabianchi_cv.pdf'),
    ('giulia.rossi@hotmail.com', 'Pwd$2023', 'Giulia Rossi', '/uploads/cvs/15/giuliarossi_cv.pdf'),
	('mario.verdi@gmail.com', 'P@ssw0rd2023', 'Mario Verdi', '/uploads/cvs/16/marioverdi_cv.pdf'),
    ('elisa.bianchi@hotmail.com', 'S3curePwd!', 'Elisa Bianchi', '/uploads/cvs/17/elisabianchi_cv.pdf'),
    ('alessio.rossi@yahoo.it', 'Rand0mPwd$', 'Alessio Rossi', '/uploads/cvs/18/alessiorossi_cv.pdf'),
    ('anna.martini@gmail.com', 'Str0ngP@$$', 'Anna Martini', '/uploads/cvs/19/annamartini_cv.pdf'),
    ('luigi.verdi@hotmail.com', 'C0mpl3xPwd$', 'Luigi Verdi', '/uploads/cvs/20/luigiverdi_cv.pdf');

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS aziende
(
    id int NOT NULL AUTO_INCREMENT,
    mail character varying(60) NOT NULL,
    password character varying(100) NOT NULL,
	nome character varying(60) NOT NULL,
	sito character varying(50) NOT NULL,
	fondazione integer NOT NULL,
	dipendenti integer NOT NULL,
	fatturato integer NOT NULL,
	sede character varying(60) NOT NULL,
	ambito character varying(60) NOT NULL,
	`desc` character varying (500) NOT NULL,
    PRIMARY KEY (id)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO aziende (mail, password, nome, sito, fondazione, dipendenti, fatturato, sede, ambito, `desc`)
VALUES
    ('alta.tech@altatech.it', 'P@ssw0rd1!', 'AltaTech Soluzioni', 'www.altatech.it', 1995, 1000, 5000000, 'Milano', 'Tecnologia', 'AltaTech Soluzioni è una società leader nel settore delle tecnologie innovative. La nostra missione è innovare costantemente per servire meglio i nostri clienti e superare le aspettative. Con un team altamente qualificato e un profondo impegno verso l''innovazione, stiamo ridefinendo il futuro delle tecnologie.'),
    ('innovazione@italiainnovazione.it', 'Str0ngP@$$2@', 'Italia Innovazione', 'www.italiainnovazione.it', 2000, 1500, 7000000, 'Roma', 'Ricerca e Sviluppo', 'Italia Innovazione è un centro di eccellenza nella ricerca e sviluppo di soluzioni innovative. La nostra passione è creare un impatto positivo sul mondo attraverso la scoperta e l''innovazione. Con un team di esperti dedicati, stiamo plasmando il futuro.'),
    ('costruzioni@mediterraneocostruzioni.it', 'S3cur3P@$$3#', 'Mediterraneo Costruzioni', 'www.mediterraneocostruzioni.it', 2010, 800, 3000000, 'Napoli', 'Edilizia', 'Mediterraneo Costruzioni è una società di costruzioni che si impegna per la qualità, l''eccellenza e la sicurezza nei progetti edilizi. Con una solida tradizione di realizzazione di opere d''arte, stiamo costruendo il futuro con maestria e passione.'),
	('tecnosoluzioni@tecnosoluzioni.it', 'D3l1ghtful#Pwd', 'TecnoSoluzioni', 'www.tecnosoluzioni.it', 2005, 1200, 6000000, 'Firenze', 'Innovazione Tecnologica', 'TecnoSoluzioni è sinonimo di innovazione tecnologica. La nostra passione è trasformare idee in soluzioni digitali all''avanguardia. Con un team creativo e visionario, stiamo scrivendo il futuro digitale.'),
    ('stelleitaliane@stelleitaliane.it', 'R@d1antFutur3', 'Stelle Italiane', 'www.stelleitaliane.it', 1990, 1800, 9000000, 'Bologna', 'Spettacolo', 'Stelle Italiane è una casa di produzione che porta l''arte e lo spettacolo al centro del palcoscenico. Con una storia ricca di successi, stiamo illuminando il mondo con la bellezza dell''arte.'),
    ('verdeedintorni@verdeedintorni.it', 'Sustainabl3World', 'Verde ed Intorni', 'www.verdeedintorni.it', 2008, 600, 4500000, 'Napoli', 'Ambiente Sostenibile', 'Verde ed Intorni è un pioniere nell''ambiente sostenibile. La nostra missione è preservare il pianeta e creare un mondo più verde per le future generazioni.'),
    ('innovazionefutura@innovazionefutura.it', 'Future$uccess!', 'Innovazione Futura', 'www.innovazionefutura.it', 2012, 400, 3500000, 'Milano', 'Tecnologia e Innovazione', 'Innovazione Futura è un faro nell''era digitale. Con tecnologie all''avanguardia e una visione di progresso, stiamo guidando la trasformazione digitale.'),
    ('creativeit@creativeit.it', 'Cr3at1v3M1nds#', 'Creative IT', 'www.creativeit.it', 2001, 900, 8000000, 'Roma', 'Creatività e Design', 'Creative IT è una fucina di idee creative e design innovativi. La nostra missione è rendere il mondo più bello e funzionale attraverso il potere della creatività.'),
    ('salutebene@salutebene.it', 'H3althyLiv1ng!', 'Salute Bene', 'www.salutebene.it', 1998, 1400, 7500000, 'Firenze', 'Sanità e Benessere', 'Salute Bene è il custode della salute e del benessere. Con un impegno totale per la salute, stiamo migliorando la vita di milioni.'),
    ('arteitaliana@arteitaliana.it', 'ArtisticVis1on$', 'Arte Italiana', 'www.arteitaliana.it', 1985, 2200, 9500000, 'Napoli', 'Arte e Cultura', 'Arte Italiana è una custode della cultura e dell''arte italiana. Con passione e dedizione, stiamo celebrando l''eredità artistica d''Italia.'),
	('innovitalia@innovitalia.it', 'Inn0vate4Success!', 'InnovaItalia', 'www.innovitalia.it', 2004, 1100, 5500000, 'Roma', 'Innovazione Tecnologica', 'InnovaItalia è un faro nell''innovazione tecnologica. La nostra missione è guidare il progresso e creare soluzioni all''avanguardia per un mondo migliore.'),
    ('designecreativita@designecreativita.it', 'D3signD3stiny!', 'Design e Creatività', 'www.designecreativita.it', 2007, 750, 6800000, 'Milano', 'Design e Creatività', 'Design e Creatività è un laboratorio di idee e soluzioni creative. Con passione e ingegno, stiamo trasformando visioni in realtà.'),
    ('naturavita@naturavita.it', 'Gr33nW0rld#', 'NaturaVita', 'www.naturavita.it', 2015, 400, 3000000, 'Firenze', 'Ambiente Naturale', 'NaturaVita è un custode dell''ambiente naturale. La nostra missione è preservare la bellezza della natura e promuovere uno stile di vita sostenibile.'),
    ('itinnovazionetech@itinnovazionetech.it', 'T3ch4Chang3#', 'IT Innovazione Tech', 'www.itinnovazionetech.it', 2009, 850, 7200000, 'Roma', 'Tecnologia e Innovazione', 'IT Innovazione Tech è un motore di innovazione tecnologica. Con competenze e dedizione, stiamo rivoluzionando il panorama tecnologico.'),
    ('artisticreative@artisticreative.it', 'Art4Ever&Ever', 'ArtiStiCreative', 'www.artisticreative.it', 2010, 650, 5600000, 'Napoli', 'Arte e Cultura', 'ArtiStiCreative è un catalizzatore dell''arte e della cultura. Con visione e passione, stiamo celebrando l''espressione artistica.'),
    ('sanitasalute@sanitasalute.it', 'H3althyLiv1ng$', 'Sanita Salute', 'www.sanitasalute.it', 2002, 1200, 5800000, 'Milano', 'Sanità e Benessere', 'Sanita Salute è un difensore della salute e del benessere. Con cura e impegno, stiamo promuovendo uno stile di vita sano.'),
    ('architetturait@architetturait.it', 'D3signingD3stiny#', 'Architettura Italia', 'www.architetturait.it', 1997, 900, 7400000, 'Firenze', 'Architettura e Design', 'Architettura Italia è una maestra di architettura e design. Con creatività e maestria, stiamo plasmando spazi unici.'),
    ('culturaitaliana@culturaitaliana.it', 'CulturalVibranc3$', 'Cultura Italiana', 'www.culturaitaliana.it', 1980, 2000, 9000000, 'Roma', 'Cultura e Storia', 'Cultura Italiana è un custode del patrimonio culturale. Con dedizione e passione, stiamo celebrando l''eredità culturale d''Italia.'),
    ('energiaecosostenibilita@energiaecosostenibilita.it', 'Sustainabl3Futur3#', 'Energia e Cosostenibilità', 'www.energiaecosostenibilita.it', 2011, 500, 3500000, 'Napoli', 'Energia Sostenibile', 'Energia e Cosostenibilità è un promotore dell''energia sostenibile. Con impegno e visione, stiamo contribuendo a un futuro ecologicamente sostenibile.'),
    ('innovazioneculinary@innovazioneculinary.it', 'Tast3TheFuture#', 'Innovazione Culinary', 'www.innovazioneculinary.it', 2014, 350, 2600000, 'Milano', 'Culinary Innovation', 'Innovazione Culinary è un laboratorio culinario di innovazione. La nostra passione è creare esperienze gastronomiche uniche e rivoluzionare il mondo del cibo.');

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS annunci
(
    id int NOT NULL AUTO_INCREMENT,
    titolo character varying(60) NOT NULL,
	locazione character varying(60) NOT NULL,
	data_pub datetime NOT NULL,
	ambito character varying(60) NOT NULL,
	remoto boolean NOT NULL,
	contratto character varying(60) NOT NULL,
    `desc_breve` character varying(200) NOT NULL,
	`desc_completa` character varying(500) NOT NULL,
    titoli_r character varying(90) NOT NULL,
	esperienza integer NOT NULL,
    paga_m decimal NOT NULL,
    azienda_id int NOT NULL,
    PRIMARY KEY (id),
	FOREIGN KEY (azienda_id)
    REFERENCES aziende (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO annunci (titolo, locazione, data_pub, ambito, remoto, contratto, `desc_breve`, `desc_completa`, titoli_r, esperienza, paga_m, azienda_id)
VALUES
    ('Sviluppatore Frontend', 'Milano', '2023-10-29 09:30:00', 'Tecnologia', false, 'Tempo indeterminato', 'Cerchiamo uno sviluppatore frontend altamente creativo per il nostro progetto web.', 'Se sei appassionato di sviluppo frontend e hai esperienza in HTML, CSS e JavaScript, potresti essere la persona giusta per noi.', 'Laurea Triennale, Informatica, Scienze del Computer', 2, 3200.00, 1),
    ('Grafico Pubblicitario', 'Roma', '2023-10-30 10:45:00', 'Design', true, 'Tempo determinato', 'Stiamo cercando un grafico pubblicitario talentuoso per creare materiale promozionale.', 'Se sei creativo e hai esperienza nella progettazione di materiale pubblicitario, potremmo avere una posizione per te.', 'Laurea Triennale, Design, Belle Arti', 3, 3400.00, 2),
    ('Ingegnere Civile', 'Firenze', '2023-10-31 11:30:00', 'Edilizia', true, 'Tempo determinato', 'Cerchiamo un ingegnere civile esperto per la progettazione di strutture edili.', 'Se hai competenze in ingegneria civile e esperienza nella progettazione di strutture, contattaci.', 'Laurea Magistrale, Ingegneria Civile, Architettura', 4, 4000.00, 3),
    ('Responsabile Marketing', 'Napoli', '2023-11-01 12:00:00', 'Marketing', false, 'Tempo indeterminato', 'Abbiamo bisogno di un esperto di marketing per gestire le nostre strategie digitali.', 'Se hai una passione per il marketing e competenze nelle strategie online, potremmo avere un ruolo per te.', 'Laurea Magistrale, Marketing, Comunicazione', 3, 3500.00, 4),
    ('Sviluppatore Java', 'Milano', '2023-11-02 14:00:00', 'Tecnologia', true, 'Tempo determinato', 'Cerchiamo uno sviluppatore Java con competenze avanzate per il nostro progetto software.', 'Se hai esperienza in sviluppo Java e vuoi contribuire a un progetto innovativo, sei nel posto giusto.', 'Laurea Triennale, Informatica, Scienze del Computer', 2, 3400.00, 5),
    ('Architetto d''Interni', 'Roma', '2023-11-03 15:30:00', 'Design', false, 'Tempo indeterminato', 'Stiamo cercando un architetto d''interni talentuoso per progetti di design degli spazi.', 'Se hai una passione per il design degli interni e vuoi creare spazi unici, contattaci.', 'Laurea Triennale, Design, Belle Arti', 3, 3600.00, 6),
    ('Sviluppatore iOS', 'Firenze', '2023-11-04 09:15:00', 'Tecnologia', false, 'Tempo indeterminato', 'Cerchiamo uno sviluppatore iOS esperto per le nostre app mobili.', 'Se hai competenze in sviluppo iOS e vuoi lavorare su progetti mobili entusiasmanti, unisciti a noi.', 'Laurea Triennale, Informatica, Scienze del Computer', 4, 3800.00, 7),
    ('Assistente Sanitario', 'Napoli', '2023-11-05 08:45:00', 'Sanità', true, 'Tempo determinato', 'Abbiamo bisogno di un assistente sanitario per fornire assistenza a domicilio.', 'Se hai una passione per il settore sanitario e vuoi aiutare le persone, questa potrebbe essere la tua opportunità.', 'Diploma, Sanità, Infermieristica', 2, 3200.00, 8),
    ('Progettista Web', 'Milano', '2023-11-06 14:30:00', 'Tecnologia', false, 'Tempo indeterminato', 'Cerchiamo un progettista web creativo per il nostro team di sviluppo.', 'Se hai esperienza nella progettazione di siti web e un''ottima comprensione del design UX/UI, sei il benvenuto.', 'Laurea Triennale, Informatica, Scienze del Computer', 3, 3500.00, 9),
    ('Gestore Museo', 'Roma', '2023-11-07 15:00:00', 'Cultura', true, 'Tempo determinato', 'Stiamo cercando un gestore di museo appassionato della cultura e delle arti.', 'Se ami la cultura e vuoi gestire un museo, questa potrebbe essere la tua occasione.', 'Laurea Magistrale, Cultura, Belle Arti', 4, 3800.00, 10),
	('Gestore Progetti', 'Napoli', '2023-11-08 09:30:00', 'Progetti', true, 'Tempo determinato', 'Stiamo cercando un gestore di progetti esperto per coordinare e gestire le attività di progetto.', 'Se hai esperienza nella gestione di progetti e sei un ottimo coordinatore, contattaci.', 'Laurea Magistrale, Gestione Progetti, Business', 4, 3800.00, 11),
    ('Sviluppatore Mobile', 'Firenze', '2023-11-09 10:45:00', 'Tecnologia', false, 'Tempo indeterminato', 'Cerchiamo uno sviluppatore mobile con competenze in sviluppo di app per dispositivi mobili.', 'Se hai esperienza in sviluppo mobile e vuoi lavorare su app innovative, potresti essere la persona giusta per noi.', 'Laurea Triennale, Informatica, Sviluppo Mobile', 3, 3500.00, 12),
    ('Gestore Risorse Umane', 'Milano', '2023-11-10 11:30:00', 'Risorse Umane', true, 'Tempo determinato', 'Abbiamo bisogno di un esperto di risorse umane per la gestione del personale aziendale.', 'Se hai competenze nelle risorse umane e vuoi contribuire allo sviluppo del nostro team, contattaci.', 'Laurea Magistrale, Risorse Umane, Psicologia', 4, 4000.00, 13),
    ('Analista Dati', 'Roma', '2023-11-11 12:00:00', 'Tecnologia', false, 'Tempo indeterminato', 'Cerchiamo un analista dati per l''elaborazione e l''analisi dei dati aziendali.', 'Se hai competenze nell''analisi dei dati e la capacità di trarre conclusioni, potresti essere il candidato ideale.', 'Laurea Magistrale, Statistica, Analisi Dati', 3, 3600.00, 14),
    ('Assistente Sociale', 'Bari', '2023-11-12 14:00:00', 'Servizi Sociali', true, 'Tempo determinato', 'Abbiamo bisogno di un assistente sociale per fornire supporto alle persone in difficoltà.', 'Se hai una passione per il servizio sociale e vuoi aiutare chi ne ha bisogno, questa potrebbe essere la tua opportunità.', 'Laurea Magistrale, Servizio Sociale, Psicologia', 2, 3200.00, 15),
    ('Ingegnere Elettrico', 'Messina', '2023-11-13 15:30:00', 'Ingegneria', false, 'Tempo indeterminato', 'Stiamo cercando un ingegnere elettrico per il progetto di sistemi elettrici.', 'Se hai competenze in ingegneria elettrica e vuoi lavorare su progetti elettrici, contattaci.', 'Laurea Magistrale, Ingegneria Elettrica, Elettronica', 4, 3800.00, 16),
    ('Project Manager', 'Napoli', '2023-11-14 09:15:00', 'Progetti', true, 'Tempo determinato', 'Cerchiamo un project manager con esperienza nella gestione di progetti aziendali.', 'Se sei un esperto nella gestione dei progetti e vuoi far parte del nostro team, contattaci.', 'Laurea Magistrale, Gestione Progetti, Business', 3, 3500.00, 17),
    ('Insegnante Scuola Elementare', 'Bari', '2023-11-15 08:45:00', 'Istruzione', false, 'Tempo indeterminato', 'Abbiamo bisogno di un insegnante per la scuola elementare per l''istruzione dei bambini.', 'Se ami l''educazione e vuoi contribuire allo sviluppo dei giovani studenti, contattaci.', 'Laurea Triennale, Scienze dell''Educazione, Istruzione', 2, 3200.00, 20);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS preferiti
(
    utenti_id int NOT NULL,
    annuncio_id int NOT NULL,
    PRIMARY KEY (utenti_id, annuncio_id),
	FOREIGN KEY (utenti_id)
    REFERENCES utenti (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
	FOREIGN KEY(annuncio_id)
    REFERENCES annunci(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
	 
-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO preferiti (utenti_id, annuncio_id)
VALUES
    (1, 1), (1, 2),
    (2, 3), (2, 4),
    (3, 5), (3, 6),
    (4, 7), (4, 8),
    (5, 9), (5, 10),
    (6, 11), (6, 12),
    (7, 13), (7, 14),
    (8, 15), (8, 16),
    (9, 17), (9, 18),
    (10, 15), (10, 18);


-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS candidate
(
    utenti_id int NOT NULL,
    annuncio_id int NOT NULL,
    PRIMARY KEY (utenti_id, annuncio_id),
	FOREIGN KEY (utenti_id)
    REFERENCES utenti (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
	FOREIGN KEY(annuncio_id)
    REFERENCES annunci(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
	  
-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO candidate (utenti_id, annuncio_id)
VALUES
    (1, 1), (1, 2),
    (2, 3), (2, 4),
    (3, 5), (3, 6),
    (4, 7), (4, 8),
    (5, 9), (5, 10),
    (6, 11), (6, 12),
    (7, 13), (7, 14),
    (8, 15), (8, 16),
    (9, 17), (9, 18),
    (10, 15), (10, 18);

	 
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS valutazioni
(
    utenti_id int NOT NULL,
    aziende_id int NOT NULL,
    commento character varying(300),
    voto integer NOT NULL CHECK (voto > 0 AND voto <=5),
    PRIMARY KEY (aziende_id, utenti_id),
	FOREIGN KEY (utenti_id)
    REFERENCES utenti (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
	FOREIGN KEY(aziende_id)
    REFERENCES aziende(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
	 
-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO valutazioni (utenti_id, aziende_id, commento, voto)
VALUES
    (1, 1, 'Ho avuto una molto professionale esperienza lavorativa con questa azienda. Sono rimasto colpito dalla competenza del team e dalla qualità del lavoro svolto. Voto 4 su 5.', 4),
    (1, 2, 'La mia esperienza lavorativa con questa azienda è stata semplicemente eccezionale. Ho avuto l''opportunità di crescere professionalmente e sono molto soddisfatto. Voto 5 su 5.', 5),
    (2, 3, 'L''ambiente di lavoro in questa azienda è davvero eccellente. Ho avuto l''opportunità di lavorare con un team straordinario. Voto 5 su 5.', 5),
    (2, 4, 'L''azienda ha bisogno di fare alcuni miglioramenti per creare un ambiente di lavoro migliore. Tuttavia, ho avuto esperienze positive. Voto 3 su 5.', 3),
    (3, 5, 'Sono molto soddisfatto del mio lavoro in questa azienda. Ho avuto l''opportunità di lavorare su progetti interessanti e ho goduto di un buon equilibrio tra lavoro e vita. Voto 4 su 5.', 4),
    (3, 6, 'Ho avuto l''opportunità di crescere professionalmente in questa azienda. Le prospettive di carriera sono promettenti e l''atmosfera aziendale è positiva. Voto 4 su 5.', 4),
    (4, 7, 'Questa azienda è veramente innovativa e all''avanguardia. Ho lavorato su progetti eccitanti e sono rimasto impressionato dall''approccio all''innovazione. Voto 5 su 5.', 5),
    (4, 8, 'L''azienda è guidata da una leadership eccezionale. Ho avuto un''esperienza positiva e sono grato per le opportunità che ho avuto qui. Voto 5 su 5.', 5),
    (5, 9, 'Sono molto contento di lavorare in questa azienda. Ho avuto l''opportunità di crescere professionalmente e ho goduto di un ambiente di lavoro positivo. Voto 4 su 5.', 4),
    (5, 10, 'L''azienda deve lavorare sullo sviluppo del team e migliorare la comunicazione interna. Tuttavia, ho avuto esperienze positive in generale. Voto 3 su 5.', 3),
    (6, 1, 'Ho ricevuto un ottimo supporto dai miei colleghi in questa azienda. L''ambiente di lavoro è collaborativo e positivo. Voto 4 su 5.', 4),
    (6, 2, 'Mentre ho avuto esperienze positive, ci sono alcune aree in cui l''azienda può migliorare. Spero che facciano progressi in futuro. Voto 3 su 5.', 3),
    (7, 3, 'L''azienda offre una buona atmosfera di lavoro. Ho apprezzato il mio tempo qui e sono soddisfatto dell''esperienza. Voto 4 su 5.', 4),
    (7, 4, 'L''azienda ha bisogno di miglioramenti in alcune aree. Tuttavia, ho avuto esperienze positive e spero che facciano progressi. Voto 3 su 5.', 3),
    (8, 5, 'Ho avuto una grande esperienza lavorativa in questa azienda. L''ambiente di lavoro è positivo e stimolante. Voto 5 su 5.', 5),
    (8, 6, 'Sono molto soddisfatto della mia esperienza in questa azienda. Ho avuto l''opportunità di crescere professionalmente e l''atmosfera aziendale è positiva. Voto 4 su 5.', 4),
    (9, 7, 'Questa azienda è davvero eccellente e innovativa. Sono molto soddisfatto del mio lavoro qui e delle opportunità offerte. Voto 5 su 5.', 5),
    (9, 8, 'Ho avuto un''ottima opportunità di sviluppo professionale in questa azienda. Sono grato per l''esperienza positiva. Voto 5 su 5.', 5),
    (10, 9, 'Sono molto soddisfatto di lavorare in questa azienda. Ho avuto l''opportunità di crescere professionalmente e di contribuire al successo dell''azienda. Voto 4 su 5.', 4),
    (10, 10, 'L''azienda deve lavorare sullo sviluppo del team e migliorare la comunicazione interna. Spero che facciano progressi. Voto 3 su 5.', 3);



