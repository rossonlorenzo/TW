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
    email character varying(60) UNIQUE NOT NULL,
    password character varying(60) NOT NULL,
	nome character varying(60) NOT NULL,
    cv_path character varying(90),
    PRIMARY KEY (id)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO utenti(email, password, nome, cv_path)
VALUES
	('marco.rossi@gmail.com', 'XxQ%C3r9e&', 'Marco Rossi', '../../assets/cvs/1_cv.pdf'),
    ('laura.bianchi@hotmail.com', 'X&7[rD2fHb', 'Laura Bianchi', '../../assets/cvs/2_cv.pdf'),
    ('andrea.verdi@yahoo.it', 'u6g=mE3k7?', 'Andrea Verdi', '../../assets/cvs/3_cv.pdf'),
	('giovanni.martini@gmail.com', 'zBen5qg%AF', 'Giovanni Martini', '../../assets/cvs/4_cv.pdf'),
    ('eleonora.rossi@hotmail.com', 'Yct?MJ83"x', 'Eleonora Rossi', '../../assets/cvs/5_cv.pdf'),
    ('francesco.verdi@yahoo.it', 's5;"R)P38]', 'Francesco Verdi', '../../assets/cvs/6_cv.pdf'),
    ('alessia.bianchi@gmail.com', 'F4s.x#N@8=', 'Alessia Bianchi', '../../assets/cvs/7_cv.pdf'),
    ('luca.rossi@hotmail.com', 'E2]gUvN=!F', 'Luca Rossi', '../../assets/cvs/8_cv.pdf'),
    ('lucia.verdi@yahoo.it', 'J;4Kw3&MeR$', 'Lucia Verdi', '../../assets/cvs/9_cv.pdf'),
    ('simone.bianchi@gmail.com', 'p2B"3_$^qT', 'Simone Bianchi', '../../assets/cvs/10_cv.pdf'),
	('maria.martini@gmail.com', 'L#m;=2%$NJ', 'Maria Martini', '../../assets/cvs/11_cv.pdf'),
    ('gabriele.rossi@hotmail.com', 'c4g+SN$B~[', 'Gabriele Rossi', '../../assets/cvs/12_cv.pdf'),
    ('elena.verdi@yahoo.it', 'VL&[KpU6`8', 'Elena Verdi', '../../assets/cvs/13_cv.pdf'),
    ('andrea.bianchi@gmail.com', 'r.Fq27n^j8', 'Andrea Bianchi', '../../assets/cvs/14_cv.pdf'),
    ('giulia.rossi@hotmail.com', 'x*R$q<8n3s', 'Giulia Rossi', '../../assets/cvs/15_cv.pdf'),
	('mario.verdi@gmail.com', 'FPVk3<tp:y', 'Mario Verdi', '../../assets/cvs/16_cv.pdf'),
    ('elisa.bianchi@hotmail.com', 'h;7fGYBga8', 'Elisa Bianchi', '../../assets/cvs/17_cv.pdf'),
    ('alessio.rossi@yahoo.it', 'a:jvu5hRb`', 'Alessio Rossi', '../../assets/cvs/18_cv.pdf'),
    ('anna.martini@gmail.com', 'swLHWb)9EU', 'Anna Martini', '../../assets/cvs/19_cv.pdf'),
    ('luigi.verdi@hotmail.com', 't#Kp}-[9w]', 'Luigi Verdi', '../../assets/cvs/20_cv.pdf'),
    ('user', 'user', 'user', NULL);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS aziende
(
    id int NOT NULL AUTO_INCREMENT,
    email character varying(60) UNIQUE NOT NULL,
    password character varying(100) NOT NULL,
	nome character varying(60) NOT NULL,
	sito character varying(50) NOT NULL,
	fondazione integer NOT NULL,
	dipendenti integer NOT NULL,
	fatturato integer NOT NULL,
	sede character varying(60) NOT NULL,
	settore character varying(60) NOT NULL,
	`desc` character varying (500) NOT NULL,
    logo_path character varying(90),
    PRIMARY KEY (id)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO aziende (email, password, nome, sito, fondazione, dipendenti, fatturato, sede, settore, `desc`, logo_path)
VALUES
    ('alta.tech@altatech.it', 'TG247V?`rP', 'AltaTech Soluzioni', 'http://www.altatech.it', 1995, 1000, 5000000, 'Milano', 'Informatica', 'AltaTech Soluzioni è una società di punta nel settore dell''informatica. La nostra missione è servire al meglio i nostri clienti, superando le loro le aspettative tramite un continuo aggiornamento alle ultime novità tecnologiche. Con un team altamente qualificato e un profondo impegno verso l''innovazione, stiamo ridefinendo il futuro delle tecnologie.', '../../assets/logos/1_logo.png'),
    ('innovazione@italiainnovazione.it', 'a2%G]6.$W>', 'Italia Innovazione', 'http://www.italiainnovazione.it', 2000, 1500, 7000000, 'Roma', 'Ricerca e Sviluppo', 'Italia Innovazione è un punto di riferimento nell''ambito della Ricerca e Sviluppo, focalizzato sulla creazione di soluzioni innovative per sfide complesse. Con un team di esperti multidisciplinari, l''azienda si impegna a guidare l''innovazione in settori chiave, contribuendo al progresso tecnologico e alla crescita sostenibile.', '../../assets/logos/2_logo.png'),
    ('costruzioni@mediterraneocostruzioni.it', 'aBzQ9j@6!+', 'Mediterraneo Costruzioni', 'http://www.mediterraneocostruzioni.it', 2010, 800, 3000000, 'Napoli', 'Edilizia', 'Mediterraneo Costruzioni eccelle nell''ambito dell''Edilizia, offrendo servizi di costruzione di alta qualità. Specializzata in progetti residenziali e commerciali, l''azienda si distingue per l''attenzione ai dettagli, la gestione efficiente e la realizzazione di opere architettoniche durevoli. Con un approccio orientato alla qualità, Mediterraneo Costruzioni trasforma visioni in realtà ed è sinonimo di eccellenza nel settore edilizio.', '../../assets/logos/3_logo.png'),
    ('tecnosoluzioni@tecnosoluzioni.it', 'rb7#zNnsw+', 'TecnoSoluzioni', 'http://www.tecnosoluzioni.it', 2005, 1200, 6000000, 'Firenze', 'Informatica', 'TecnoSoluzioni è un''azienda all''avanguardia che si distingue nel campo delle soluzioni informatiche, offrendo servizi e prodotti innovativi per soddisfare le esigenze tecnologiche dei suoi clienti. Con una missione incentrata sulla trasformazione digitale, TecnoSoluzioni si impegna a fornire soluzioni su misura per migliorare l''efficienza operativa, stimolare la crescita aziendale e promuovere la competitività nel panorama tecnologico in continua evoluzione.', '../../assets/logos/4_logo.png'),
    ('viva@ecoviva.it', 'cq`8;,PEZu', 'EcoViva', 'http://www.ecoviva.it', 2008, 600, 4500000, 'Napoli', 'Ambiente Sostenibile', 'EcoViva è all''avanguardia nella promozione di soluzioni sostenibili per un futuro ecologico. Specializzati in progetti ambientali, offriamo innovazioni che rispettano l''ambiente per preservare il nostro pianeta. Unisciti a noi nella creazione di un mondo più pulito e sostenibile per le generazioni future.', '../../assets/logos/5_logo.png'),
    ('innovazionefutura@innovazionefutura.it', 'G3s>2tjxW;', 'Innovazione Futura', 'http://www.innovazionefutura.it', 2012, 400, 3500000, 'Milano', 'Innovazione Tecnologica', 'Innovazione Futura guida la rivoluzione tecnologica con soluzioni avanzate e visionarie. Siamo un motore di progresso, dedicati a progetti innovativi che trasformano il modo in cui viviamo e lavoriamo. Sfruttiamo le ultime tecnologie per plasmare il futuro e affrontare sfide globali con creatività e determinazione.', '../../assets/logos/6_logo.png'),
    ('creativeit@creativeit.it', 'y)4@ATeaVL', 'Creative IT', 'http://www.creativeit.it', 2001, 900, 8000000, 'Roma', 'Design', 'Creative IT è un''azienda all''avanguardia nel mondo del design, unendo creatività e tecnologia. Offriamo soluzioni innovative per il web, il branding e l''esperienza utente. Con il nostro team di talentuosi designer, trasformiamo le idee in esperienze visive straordinarie, creando un impatto duraturo.', '../../assets/logos/7_logo.png'),
    ('salutebene@salutebene.it', 'sBW3c-,m2r', 'Salute Bene', 'http://www.salutebene.it', 1998, 1400, 7500000, 'Firenze', 'Sanità e Benessere', 'Salute Bene si impegna a promuovere il benessere integrale attraverso servizi sanitari di alta qualità. Con un focus sulla cura preventiva e soluzioni innovative, offriamo un approccio personalizzato per migliorare la salute fisica e mentale. La nostra missione è creare una comunità più sana e felice.', '../../assets/logos/8_logo.png'),
    ('arteitaliana@arteitaliana.it', 'd_X!;3):]=', 'Arte Italiana', 'http://www.arteitaliana.it', 1985, 2200, 9500000, 'Napoli', 'Beni culturali', 'Arte Italiana è custode del patrimonio culturale italiano, preservando e valorizzando opere d''arte e beni storici. Collaboriamo con passione per promuovere la bellezza e la storia, rendendo accessibile la ricca eredità culturale del nostro paese. La nostra dedizione è al servizio della conservazione e della condivisione della cultura italiana.', '../../assets/logos/9_logo.png'),
    ('innovitalia@innovitalia.it', 'GX3tc+v:aU', 'InnovaItalia', 'http://www.innovitalia.it', 2004, 1100, 5500000, 'Roma', 'Innovazione Tecnologica', 'InnovaItalia guida il futuro con soluzioni tecnologiche avanzate. Siamo precursori nell''ambito dell''innovazione, sviluppando tecnologie all''avanguardia basate sull''intelligenza artificiale. La nostra missione è trasformare settori e migliorare la vita quotidiana attraverso la potenza dell''innovazione.', '../../assets/logos/10_logo.png'),
    ('creative@creativedesign.it', 'nD^b?NP9Af', 'CreativeDesign', 'http://www.creativedesign.it', 2007, 750, 6800000, 'Milano', 'Design', 'CreativeDesign è il partner ideale per soluzioni di design straordinarie. Con una squadra di talentuosi creativi, plasmiamo idee in esperienze visive eccezionali. Dalla progettazione di marchi all''interfaccia utente, combiniamo estetica e funzionalità per creare un impatto duraturo.', '../../assets/logos/11_logo.png'),
    ('naturavita@naturavita.it', 'F]69%eXECA', 'NaturaVita', 'http://www.naturavita.it', 2015, 400, 3000000, 'Firenze', 'Ecologia', 'NaturaVita è impegnata nella promozione di uno stile di vita sostenibile. Con un forte focus sull''ecologia, offriamo soluzioni per la conservazione dell''ambiente e uno sviluppo armonioso. Lavoriamo per un futuro in cui la natura e la vita coesistono in equilibrio, preservando il nostro pianeta per le generazioni future.', '../../assets/logos/12_logo.png'),
    ('itinnovazionetech@itinnovazionetech.it', 'y+2;,$V9<~', 'IT Innovazione Tech', 'http://www.itinnovazionetech.it', 2009, 850, 7200000, 'Roma', 'Innovazione Tecnologica', 'IT Innovazione Tech è il motore dell''evoluzione tecnologica. Con un focus su intelligenza artificiale, sviluppo di applicazioni e sicurezza informatica, siamo all''avanguardia nel plasmare il futuro digitale. Offriamo soluzioni innovative per aziende pronte a abbracciare il cambiamento.', '../../assets/logos/13_logo.png'),
    ('artisticreative@artisticreative.it', 's$hk!G92.C', 'ArtiStiCreative', 'http://www.artisticreative.it', 2010, 650, 5600000, 'Napoli', 'Arte', 'ArtiStiCreative è un laboratorio di creatività dove l''arte prende vita. Dal design grafico alla produzione artistica, celebriamo l''espressione creativa in tutte le sue forme. Con un team di artisti appassionati, trasformiamo concetti in opere che emozionano e ispirano.', '../../assets/logos/14_logo.png'),
    ('sanitasalute@sanitasalute.it', 'Yp/>F#2[)u', 'SanitaSalute', 'http://www.sanitasalute.it', 2002, 1200, 5800000, 'Milano', 'Sanità e Benessere', 'SanitaSalute si dedica al benessere integrale. Con professionisti dedicati, offriamo servizi sanitari di qualità, promuovendo uno stile di vita sano. Dal supporto medico all''assistenza domiciliare, la nostra missione è garantire il massimo benessere fisico e mentale per ogni individuo.', '../../assets/logos/15_logo.png'),
    ('architetturait@architetturait.it', 'hQ9+&#w6Y^', 'Architettura Italia', 'http://www.architetturait.it', 1997, 900, 7400000, 'Firenze', 'Architettura', 'Architettura Italia è la firma di eccellenza nel design degli spazi. Con passione e competenza, trasformiamo idee in ambienti straordinari. Dal concept alla realizzazione, la nostra visione architettonica ridefinisce il concetto di bellezza e funzionalità.', '../../assets/logos/16_logo.png'),
    ('romarte@romarte.it', 'gR2@eh}M*U', 'RomArte', 'http://www.romarte.it', 1980, 2000, 9000000, 'Roma', 'Beni culturali', 'RomArte è il custode del patrimonio culturale italiano. Dedicati alla conservazione e alla promozione dell''arte, ci impegniamo a preservare le radici storiche di Roma. Attraverso mostre, eventi e iniziative, RomArte celebra l''eredità culturale che rende unica la Città Eterna.', '../../assets/logos/17_logo.png'),
    ('stelleitaliane@stelleitaliane.it', 'mPJ3f9gz/;', 'Stelle Italiane', 'http://www.stelleitaliane.it', 1990, 1800, 9000000, 'Bologna', 'Spettacolo', 'Stelle Italiane porta l''arte dello spettacolo a nuove vette di creatività. Con una costellazione di talenti, produciamo performance indimenticabili. Dal teatro alla musica, dalla danza al cinema, offriamo esperienze che illuminano le stelle del panorama artistico italiano.', '../../assets/logos/18_logo.png'),
    ('sostenergia@sostenergia.it', 'g*!FN97,#y#', 'SostEnergia', 'http://www.sostenergia.it', 2011, 500, 3500000, 'Napoli', 'Energia Sostenibile', 'SostEnergia si impegna nella fornitura di soluzioni innovative per un futuro energetico sostenibile. Specializzati in energie rinnovabili, offriamo tecnologie avanzate per la produzione responsabile di energia, contribuendo così a un ambiente più pulito e a una società rispettosa dell''ambiente.', '../../assets/logos/19_logo.png'),
    ('gustofuturomilano@gustofuturo.it', 'kTC5P{;)6h', 'GustoFuturo Milano', 'http://www.gustofuturo.it', 2014, 350, 2600000, 'Milano', 'Ristorazione', 'GustoFuturo Milano è il luogo dove la gastronomia incontra l''innovazione. Offriamo esperienze culinarie uniche, sperimentando con ingredienti e tecniche all''avanguardia. Il nostro ristorante è una celebrazione di sapori contemporanei e creatività gastronomica nel cuore di Milano.', '../../assets/logos/20_logo.png'),
    ('agribari@agribari.it', 'B9^!sL7<Rp', 'AgriBari', 'http://www.agribari.it', 2020, 300, 2000000, 'Bari', 'Agroalimentare', 'AgriBari si dedica a fornire prodotti agroalimentari di alta qualità, coltivati con passione e impegno. La nostra azienda promuove pratiche agricole sostenibili, garantendo che ogni prodotto rifletta il rispetto per la terra e offra un''esperienza culinaria autentica e genuina.', '../../assets/logos/21_logo.png'),
    ('bedda@messinabedda.it', 'Q&u7^=kx5v', 'Messina Bedda', 'http://www.messinabedda.it', 2018, 250, 1800000, 'Messina', 'Turismo', 'Messina Bedda è la guida perfetta per esplorare le bellezze di Messina. Offriamo esperienze turistiche uniche, dal patrimonio culturale alle bellezze naturali. La nostra missione è far vivere ai visitatori l''autentica bellezza di Messina, con servizi turistici su misura e un tocco di ospitalità siciliana.', '../../assets/logos/22_logo.png'),
    ('admin', 'admin', 'admin', 'http://www.admin.it', 1997, 4, 800, 'Padova', 'TecWeb', 'La nuova start-up dei fondatori di EazyJobs', NULL);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS annunci
(
    id int NOT NULL AUTO_INCREMENT,
    titolo character varying(60) NOT NULL,
	locazione character varying(60) NOT NULL,
	data_pub datetime NOT NULL,
	settore character varying(60) NOT NULL,
	remoto boolean NOT NULL,
    presenza boolean NOT NULL,
	contratto character varying(60) NOT NULL,
    `desc_breve` character varying(200) NOT NULL,
	`desc_completa` character varying(500) NOT NULL,
    livello_istruzione character varying(90) NOT NULL,
	esperienza integer NOT NULL,
    stipendio decimal NOT NULL,
    azienda_id int NOT NULL,
    PRIMARY KEY (id),
	FOREIGN KEY (azienda_id)
    REFERENCES aziende (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO annunci (titolo, locazione, data_pub, settore, remoto, presenza, contratto, `desc_breve`, `desc_completa`, livello_istruzione, esperienza, stipendio, azienda_id)
VALUES
    ('Sviluppatore Frontend', 'Milano', '2023-10-29 09:30:00', 'Informatica', true, true, 'Tempo indeterminato', 'Unisciti a noi come Sviluppatore Frontend! Esperto in HTML, CSS e JavaScript? Lavora su progetti innovativi con contratto a tempo indeterminato e stipendio competitivo.',
    'Cerchiamo uno Sviluppatore Frontend altamente creativo per arricchire il nostro team. Sei un esperto di HTML, CSS e JavaScript con una visione innovativa nel design web? Avrai l''opportunità di contribuire a un progetto unico, lavorando su interfacce coinvolgenti e funzionalità avanzate. Offriamo un ambiente di lavoro stimolante, un contratto a tempo indeterminato e uno stipendio competitivo. Se sei appassionato di sviluppo frontend, vogliamo conoscere te e le tue idee!',
    'Laurea Triennale', 2, 3200.00, 1),
    ('Grafico Pubblicitario', 'Roma', '2023-10-30 10:45:00', 'Design', true, true, 'Tempo determinato', 'Creative IT cerca Grafico Pubblicitario! Creativo con esperienza in design pubblicitario? Progetti stimolanti, contratto determinato con possibilità di sviluppo.',
    'Stiamo cercando un Grafico Pubblicitario talentuoso per unirsi al nostro team. Sei un creativo appassionato con esperienza nella progettazione di materiale promozionale? Avrai l''opportunità di mettere in mostra la tua creatività e lavorare su progetti stimolanti. Offriamo un contratto determinato con la possibilità di sviluppo a lungo termine. Se sei pronto per una sfida creativa, inviaci il tuo curriculum!',
    'Laurea Triennale', 3, 3400.00, 7),
    ('Ingegnere Civile', 'Napoli', '2023-10-31 11:30:00', 'Edilizia', false, true, 'Tempo determinato', 'Opportunità per Ingegnere Civile esperto! Lavora su progettazione edile innovativa. Contratto determinato, ma prospettive a lungo termine.',
    'Stiamo cercando un Ingegnere Civile esperto. Avrai l''opportunità di contribuire a progetti di progettazione edile innovativi e stimolanti. Cerchiamo qualcuno con competenze avanzate in ingegneria civile e esperienza nella progettazione di strutture. Offriamo un contratto determinato con potenziali prospettive a lungo termine. Se sei pronto per unirsi a una squadra dinamica e far parte di progetti entusiasmanti, inviaci la tua candidatura!',
    'Laurea Magistrale', 4, 4000.00, 3),
    ('Responsabile Marketing', 'Firenze', '2023-11-01 12:00:00', 'Marketing', false, true, 'Tempo indeterminato', 'TecnoSoluzioni cerca Responsabile Marketing esperto. Gestisci strategie digitali e sviluppa campagne innovative.',
    'Sei un esperto di marketing con una passione per l''innovazione? Unisciti a noi come Responsabile Marketing per guidare strategie digitali e creare campagne coinvolgenti. Responsabilità chiave includono la gestione del team marketing, l''analisi dei risultati delle campagne e la collaborazione con le funzioni aziendali per raggiungere obiettivi comuni.',
    'Laurea Magistrale', 3, 3500.00, 4),
    ('Sviluppatore Java', 'Milano', '2023-11-02 14:00:00', 'Tecnologia', true, true, 'Tempo determinato', 'Opportunità per uno sviluppatore Java esperto! Entra a far parte del nostro team per contribuire a progetti innovativi e collabora con colleghi talentuosi.',
    'Sei uno sviluppatore Java con competenze avanzate? Unisciti a noi per contribuire a progetti innovativi. Collaborerai con un team talentuoso, parteciperai allo sviluppo di soluzioni di alta qualità e avrai l''opportunità di crescere professionalmente. Requisiti: esperienza in Java, capacità di ragionamento critico e collaborazione in team.',
    'Laurea Triennale', 2, 3400.00, 6),
    ('Architetto', 'Napoli', '2023-11-03 15:30:00', 'Design', false, true, 'Tempo indeterminato', 'Cerchiamo un Architetto talentuoso per progetti di design degli spazi. Unisciti a noi per creare ambienti unici e sfrutta la tua passione per il design.',
    'Sei un Architetto talentuoso con una passione per il design degli spazi? Entra a far parte del nostro team per contribuire a progetti stimolanti. Collaborerai con colleghi appassionati, porterai idee innovative e avrai l''opportunità di mettere in pratica la tua creatività. Requisiti: esperienza in progettazione architettonica, attenzione ai dettagli e capacità di lavorare in team.',
    'Laurea Triennale', 3, 3600.00, 3),
    ('Sviluppatore iOS', 'Roma', '2023-11-04 09:15:00', 'Informatica', false, true, 'Tempo indeterminato', 'TecnoSoluzioni cerca di uno Sviluppatore iOS. Entra a far parte del nostro team per contribuire allo sviluppo di app mobili entusiasmanti.',
    'Sei uno sviluppatore iOS esperto in cerca di nuove sfide? Unisciti al nostro team per lavorare su app mobili innovative. Avrai l''opportunità di contribuire a progetti eccitanti, collaborare con colleghi talentuosi e sviluppare soluzioni all''avanguardia. Richiediamo competenze in sviluppo iOS e passione per l''innovazione.',
    'Laurea Triennale', 4, 3800.00, 10),
    ('Fisioterapista', 'Firenze', '2023-11-05 08:45:00', 'Sanità e Benessere', false, true, 'Tempo determinato', 'Cerchiamo un Fisioterapista appassionato. Unisciti a noi per fornire assistenza a domicilio e contribuire al benessere delle persone.',
    'Sei un Fisioterapista in cerca di un ambiente stimolante? Entra a far parte del nostro team per fornire assistenza a domicilio. Sarai responsabile di valutazioni, trattamenti personalizzati e supporto al recupero. Offriamo un ambiente di lavoro gratificante, formazione continua e opportunità di crescita professionale.',
    'Diploma', 2, 3200.00, 8),
    ('Progettista Web', 'Milano', '2023-11-06 14:30:00', 'Tecnologia', false, true, 'Tempo indeterminato', 'Azienda cerca Progettista Web creativo. Unisciti al nostro team di sviluppo per contribuire alla progettazione di siti web e portare avanti progetti stimolanti.',
    'Sei un Progettista Web con esperienza in design web? Entra a far parte del nostro team per contribuire a progetti stimolanti. Avrai l''opportunità di collaborare con colleghi creativi, partecipare alla progettazione di siti web e mettere in mostra le tue competenze di design. Richiediamo conoscenze approfondite di progettazione web, creatività e capacità di lavoro in team.',
    'Laurea Triennale', 3, 3500.00, 6),
    ('Gestore Museo', 'Roma', '2023-11-07 15:00:00', 'Cultura', false, true, 'Tempo determinato', 'RomArte cerca Gestore Museo appassionato. Unisciti a noi per gestire e promuovere la cultura attraverso l''organizzazione di mostre e attività culturali.',
    'Sei appassionato di cultura e arte? Entra nel nostro team come Gestore Museo. Coordinerai esposizioni, pianificherai eventi culturali e gestirai le attività quotidiane del museo. Cerchiamo un individuo dinamico con una forte passione per la cultura, competenze organizzative e capacità di coinvolgimento del pubblico.',
    'Laurea Magistrale', 4, 3800.00, 17),
    ('Gestore Progetti', 'Milano', '2023-11-08 09:30:00', 'Progetti', false, true, 'Tempo determinato', 'CreativeDesign cerca Gestore Progetti motivato. Unisciti a noi per coordinare attività di progetto e garantire il loro successo.',
    'Sei un coordinatore di progetti dinamico? Entra a far parte del nostro team come Gestore Progetti. Sarai responsabile della pianificazione, esecuzione e monitoraggio delle attività di progetto. Cerchiamo un professionista motivato con capacità di guida e ragionamento critico.',
    'Laurea Magistrale', 4, 3800.00, 11),
    ('Sviluppatore App', 'Firenze', '2023-11-09 10:45:00', 'Tecnologia', false, true, 'Tempo indeterminato', 'TecnoSoluzioni cerca Sviluppatore App creativo. Unisciti a noi per contribuire allo sviluppo di app innovative e soluzioni all''avanguardia.',
    'Entra nostro team per lavorare su progetti mobili stimolanti. Avrai l''opportunità di sviluppare app innovative, collaborare con un team talentuoso e contribuire all''avanzamento di soluzioni originali. Cerchiamo creatività, competenze tecniche e passione per lo sviluppo di app.',
    'Laurea Triennale', 3, 3500.00, 4),
    ('Gestore Risorse Umane', 'Napoli', '2023-11-10 11:30:00', 'Risorse Umane', false, true, 'Tempo determinato', 'SostEnergia cerca un Gestore Risorse Umane. Entra nel nostro team per gestire le dinamiche del personale e contribuire allo sviluppo del nostro team.',
    'Unisciti a noi come Gestore Risorse Umane in un ambiente dinamico. Sarai responsabile delle pratiche, dal reclutamento alla gestione delle relazioni aziendali. Cerchiamo un professionista con competenze relazionali, capacità organizzative e una visione centrata sullo sviluppo delle risorse umane.',
    'Laurea Magistrale', 4, 4000.00, 19),
    ('Analista Dati', 'Roma', '2023-11-11 12:00:00', 'Tecnologia', false, true, 'Tempo indeterminato', 'Entra nel nostro team per contribuire all''analisi dei dati aziendali e guidare decisioni informate.',
    'Entra a far parte del nostro team come Analista Dati. Sarai coinvolto nell''analisi dei dati, nell''identificazione di tendenze e nella creazione di report informativi. Cerchiamo un professionista con solide competenze analitiche, capacità interpretative e la capacità di tradurre i dati in strategie aziendali.',
    'Laurea Magistrale', 3, 3600.00, 13),
    ('Addetto al controllo qualità', 'Bari', '2023-11-12 14:00:00', 'Agroalimentare', false, true, 'Tempo determinato', 'AgriBari cerca Addetto al Controllo Qualità. Unisciti a noi per garantire standard qualitativi elevati nei nostri processi produttivi.',
    'Cerchiamo un Addetto al Controllo Qualità appassionato. Sarai responsabile dell''ispezione e del controllo dei prodotti, garantendo il rispetto degli standard qualitativi. Se hai un occhio attento per i dettagli, capacità analitiche e una forte etica del lavoro, sii parte della nostra squadra impegnata nella qualità e nell''eccellenza.',
    'Laurea Magistrale', 2, 3200.00, 21),
    ('Guida turistica', 'Messina', '2023-11-13 15:30:00', 'Turismo', false, true, 'Tempo indeterminato', 'Messina Bedda cerca Guida appassionato/a. Unisciti a noi per condividere la bellezza delle destinazioni e creare esperienze indimenticabili.',
    'Entra nel nostro team come Guida Turistica entusiasta. Sarai il volto accogliente che trasmette la storia e la cultura delle destinazioni. Cerchiamo un individuo con passione per i viaggi, capacità comunicative e conoscenze culturali. Se ami connetterti con le persone e condividere storie coinvolgenti, questa è la tua opportunità.',
    'Laurea Triennale', 4, 3800.00, 22),
    ('Capo Progetti', 'Napoli', '2023-11-14 09:15:00', 'Progetti', false, true, 'Tempo determinato', 'Entra nel nostro team per coordinare progetti e guidare il successo aziendale.',
    'Unisciti a noi come Capo Progetti. Sarai responsabile della pianificazione, esecuzione e monitoraggio dei progetti. Cerchiamo un professionista con solide competenze organizzative, capacità di gestione del tempo e di dare direzione al progetto. Se sei appassionato di raggiungere obiettivi e guidare il successo del team, sii parte della nostra crescita aziendale.',
    'Laurea Magistrale', 3, 3500.00, 17),
    ('Progettista Grafico', 'Bologna', '2023-11-16 10:30:00', 'Design', true, true, 'Tempo indeterminato', 'Unisciti a noi per dare vita a progetti visivi e innovativi.',
    'Cerchiamo un Progettista Grafico creativo per arricchire il nostro team. Sarai coinvolto nella progettazione di materiale visivo accattivante e innovativo. Cerchiamo un talento con competenze artistiche, creatività e conoscenza degli strumenti di progettazione. Se vuoi contribuire a progetti coinvolgenti e portare idee visive alla vita, questa è la tua opportunità.',
    'Laurea Triennale', 3, 3600.00, 18),
    ('Nutrizionista', 'Firenze', '2023-11-15 08:45:00', 'Sanità e benessere', false, true, 'Tempo indeterminato', 'Entra nel nostro team per promuovere uno stile di vita sano attraverso consulenze nutrizionali.',
    'Unisciti a noi come Nutrizionista dedicato/a a migliorare la salute dei nostri clienti. Sarai responsabile di fornire consulenze nutrizionali, pianificare diete personalizzate e promuovere uno stile di vita sano. Cerchiamo un professionista con una formazione accademica in nutrizione, capacità comunicative e passione per il benessere. Se sei motivato/a a contribuire al miglioramento della salute attraverso la nutrizione, questa è la tua opportunità.',
    'Laurea Triennale', 2, 3200.00, 8),
    ('Guida galleria arte', 'Napoli', '2023-11-17 09:00:00', 'Arte', false, true, 'Tempo indeterminato', 'Unisciti a noi per condividere l''arte, arricchire le esperienze dei visitatori e promuovere la cultura artistica.',
    'Cerchiamo una Guida Galleria d''Arte per coinvolgere il pubblico nelle opere esposte. Sarai responsabile di guidare visite informative, offrire contestualizzazione storica e rispondere alle domande dei visitatori. Cerchiamo un individuo appassionato di arte, con competenze comunicative e conoscenza delle opere esposte. Se ami condividere la tua passione per l''arte e creare esperienze culturali coinvolgenti, sii parte del nostro team dedicato alla promozione dell''arte e della cultura.',
    'Laurea Triennale', 2, 3200.00, 14),
    ('Analista Dati Senior', 'Roma', '2023-11-18 09:30:00', 'Analisi Dati', true, true, 'Tempo indeterminato', 'Analista Dati Senior per progetti analitici avanzati. Unisciti a noi per guidare decisioni strategiche e contribuire all''innovazione aziendale attraverso l''analisi dei dati.',
    'Cerchiamo un Analista Dati Senior con esperienza nell''analisi approfondita dei dati aziendali. Sarai coinvolto/a in progetti avanzati, contribuendo a decisioni strategiche e guidando l''adozione di pratiche analitiche innovative. Cerchiamo un professionista con competenze analitiche avanzate e visione critica dei dati. Se desideri essere parte di un team impegnato nell''innovazione attraverso l''analisi dei dati, questa è la tua opportunità.',
    'Laurea Magistrale', 5, 4500.00, 2),
    ('Giardiniere Specializzato', 'Napoli', '2023-11-09 10:45:00', 'Ambiente Sostenibile', false, true, 'Tempo determinato', 'Unisciti a noi per prenderti cura di spazi verdi esclusivi, applicando competenze specializzate nella cura delle piante.',
    'Sarai responsabile della progettazione, manutenzione e cura di giardini esclusivi. Cerchiamo un individuo con competenze specializzate nella scelta delle piante, gestione dell''irrigazione e mantenimento generale del verde. Se ami trasformare gli spazi in luoghi accoglienti attraverso la tua competenza nella cura delle piante, sii parte del nostro team dedicato alla creazione e manutenzione di giardini di alta qualità.',
    'Diploma', 3, 3000.00, 5),
    ('Restauratore di Opere', 'Napoli', '2023-11-26 11:30:00', 'Arte', false, true, 'Tempo indeterminato', 'Unisciti a noi per preservare il patrimonio culturale attraverso competenze avanzate di restauro artistico.',
    'Cerchiamo un Restauratore di Opere d''Arte con esperienza nel restauro e nella preservazione del patrimonio culturale. Sarai coinvolto/a nel restauro di opere d''arte, contribuendo alla conservazione del nostro ricco patrimonio artistico. Cerchiamo un professionista con competenze avanzate di restauro, capacità diagnostiche e conoscenza delle tecniche di conservazione. Se desideri dedicare le tue competenze alla protezione e alla valorizzazione dell''arte, questa è la tua opportunità.',
    'Laurea Magistrale', 4, 3800.00, 9),
    ('Consulente Benessere', 'Firenze', '2023-11-12 12:00:00', 'Sanità e Benessere', true, true, 'Tempo determinato', 'Consulente Benessere per promuovere uno stile di vita sano. Unisciti a noi per condividere pratiche di benessere e migliorare la qualità della vita.',
    'Cerchiamo un Consulente Benessere appassionato/a della promozione di uno stile di vita sano. Sarai responsabile di offrire consulenze personalizzate, suggerire pratiche di benessere e guidare clienti verso un equilibrio mentale e fisico. Cerchiamo un individuo con formazione in discipline olistiche, competenze comunicative e motivazione a contribuire al benessere degli altri. Se desideri condividere le tue conoscenze e ispirare una vita sana, fai parte del nostro team dedicato al benessere.',
    'Diploma', 3, 3200.00, 12),
    ('Fotografo Professionista', 'Napoli', '2023-11-07 14:00:00', 'Arte', false, true, 'Tempo indeterminato', 'Cerchiamo Fotografo professionista per catturare momenti unici. Entra a far parte del nostro team creativo dedicato all''arte della fotografia.',
    'Cerchiamo un Fotografo Professionista appassionato della fotografia artistica. Sarai responsabile di catturare momenti unici, creando immagini che trasmettano emozioni e storie. Cerchiamo un individuo con esperienza nel campo, creatività nell''uso di luci e composizione, e abilità nel post-processing. Se desideri condividere la tua visione unica attraverso la fotografia e far parte di un team dedicato all''espressione visiva, entra a far parte della nostra squadra.',
    'Laurea Triennale', 3, 3500.00, 14),
    ('Infermiere Specializzato', 'Milano', '2023-11-21 15:30:00', 'Sanità e Benessere', false, true, 'Tempo determinato', 'Unisciti a noi per contribuire al benessere attraverso competenze infermieristiche specializzate.',
    'Cerchiamo un Infermiere Specializzato con competenze avanzate nella fornitura di cure specialistiche. Sarai coinvolto/a in attività di assistenza infermieristica avanzata, garantendo la massima qualità delle cure. Cerchiamo un professionista con una solida formazione infermieristica, capacità decisionali rapide e attenzione al paziente. Se desideri mettere in pratica le tue competenze avanzate e contribuire al benessere dei pazienti, entra a far parte del nostro team sanitario impegnato.',
    'Laurea Magistrale', 4, 4000.00, 15),
    ('Chef', 'Milano', '2023-11-15 09:15:00', 'Ristorazione', false, true, 'Tempo indeterminato', 'Entra a far parte della nostra squadra culinaria dedicata alla sperimentazione gastronomica.',
    'Sarai responsabile di creare esperienze culinarie uniche, combinando sapori e presentazioni innovative. Cerchiamo un individuo con esperienza culinaria, creatività nel design dei piatti e capacità di gestire una cucina con efficienza. Se sei appassionato della sperimentazione gastronomica e desideri contribuire a una proposta culinaria unica, entra a far parte della nostra squadra dedicata alla creazione di momenti gastronomici indimenticabili.',
    'Diploma', 4, 3800.00, 20),
    ('Progettista web', 'Padova', '2024-01-20 10:25:00', 'Informatica', true, true, 'Tempo indeterminato', 'Partecipa all''innovazione del mondo del lavoro con EazyJobs come Progettista di siti web, e libera la tua creatività.',
    'EazyJobs sta cercando un talentuoso Progettista Web per il suo dinamico team. In questa posizione chiave, avrai l''opportunità di contribuire alla progettazione e allo sviluppo di soluzioni web innovative, contribuendo al successo continuo dell''azienda. Necessitiamo di creatività, efficienza, passione e capacità di collaborazione, oltre che di un''ottima conoscenza di HTML, CSS, JavaScript e PHP. Candidati ora e abbraccia una carriera piena di sfide ed eccitanti opportunità.',
    'Laurea Triennale', 1, 3400.00, 23);

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
    (1, 7),
    (2, 22),
    (3, 6),
    (4, 10),
    (5, 20),
    (6, 21),
    (7, 24),
    (8, 12),
    (9, 26),
    (10, 23),
    (11, 2),
    (12, 15),
    (13, 20),
    (14, 27),
    (15, 19),
    (16, 20),
    (17, 11),
    (18, 6),
    (19, 7),
    (20, 14),
    (21, 28),
    (21, 1);

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
    (1, 7),
    (2, 22),
    (3, 6),
    (4, 10),
    (5, 20),
    (6, 21),
    (7, 24),
    (8, 12),
    (9, 26),
    (10, 23),
    (11, 2),
    (12, 15),
    (13, 20),
    (14, 27),
    (15, 19),
    (16, 20),
    (17, 11),
    (18, 6),
    (19, 7),
    (20, 14),
    (21, 28);
	 
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
    (1, 1, 'Ho avuto un''esperienza lavorativa molto professionale in questa azienda. Sono rimasto colpito dalla competenza del team e dalla qualità del lavoro svolto.', 4),
    (1, 2, 'La mia esperienza lavorativa con questa azienda è stata semplicemente eccezionale. Ho avuto l''opportunità di crescere professionalmente e di lavorare a progetti molto interessanti e stimolanti.', 5),
    (2, 3, 'Comunicazione sempre poco chiara, informazioni non sempre condivise con tutti e organizzazione pessima. Sicuramente un''azienda che ha molto da migliorare, soprattutto lato gestione dei progetti.', 1),
    (3, 5, 'Sono molto soddisfatto del mio lavoro in questa azienda. Ho avuto l''opportunità di lavorare su progetti interessanti e ho goduto di un buon equilibrio tra lavoro e vita personale.', 4),
    (3, 19, 'Ho avuto l''opportunità di crescere professionalmente in questa azienda. Le prospettive di carriera sono promettenti e l''atmosfera aziendale è positiva.', 4),
    (4, 7, 'Ho ricevuto un ottimo supporto dai miei colleghi in questa azienda. L''ambiente di lavoro è collaborativo e positivo.', 4),
    (5, 9, 'Esperienza lavorativa fantastica: mi sono sentita come in famiglia sin dal primo giorno. Persone fantastiche e lavoro veramente bello. Consigliata a chiunque ami l''arte.', 4),
    (5, 17, 'Esperienza nel complesso positiva, ma è da migliorare assolutamente l''organizzazione generale. C''erano spesso cambiamenti in corso d''opera o comunque problemi che emergevano molto frequentemente.', 2),
    (6, 13, 'Questa azienda è veramente innovativa e all''avanguardia. Ho lavorato su progetti molto interessanti e sono rimasto impressionato dall''approccio molto aperto a confronti e idee diverse.', 5),
    (6, 10, 'L''ambiente di lavoro in questa azienda è davvero eccellente. Ho avuto l''opportunità di lavorare con un team straordinario, organizzato molto bene e sempre disponibile a supportare chi ha bisogno di aiuto.', 5),
    (7, 19, 'L''azienda offre una buona atmosfera di lavoro. Ho apprezzato molto la cura dei dettagli in ogni progetto, e si nota soprattutto la passione delle persone che la gestiscono e che lavorano al suo interno.', 4),
    (7, 3, 'L''azienda ha bisogno di miglioramenti in alcune aree. Nel complesso, però, l''esperienza è stata abbastanza  positiva.', 3),
    (8, 1, 'Ho avuto una straordinaria esperienza lavorativa presso questa azienda. L''ambiente di lavoro è estremamente positivo e stimolante, favorendo una crescita professionale continua. La collaborazione con colleghi talentuosi ha reso il mio percorso gratificante.', 5),
    (8, 6, 'Sono estremamente soddisfatto della mia permanenza in questa azienda. Ho avuto l''opportunità di crescere professionalmente, grazie a un ambiente aziendale positivo e stimolante. La collaborazione con un team dedicato è stata un elemento chiave per il mio successo.', 4),
    (9, 20, 'Questa azienda si distingue per l''eccellenza e l''innovazione. La mia esperienza lavorativa è stata estremamente soddisfacente, offrendomi l''opportunità di contribuire a progetti all''avanguardia. Consiglio vivamente questa azienda a chi cerca un ambiente dinamico e stimolante.', 5),
    (9, 8, 'Ho avuto un''eccezionale opportunità di sviluppo professionale in questa azienda. Sono grato per l''esperienza positiva, che ha contribuito significativamente alla mia crescita. L''atmosfera di lavoro favorevole ha reso il mio percorso estremamente gratificante.', 5),
    (10, 14, 'Sono molto soddisfatto della mia esperienza lavorativa in questa azienda. Ho avuto l''opportunità di crescere professionalmente e contribuire a progetti significativi. La mia permanenza qui è stata un''esperienza di apprendimento continua e gratificante.', 4),
    (10, 17, 'L''azienda può migliorare nello sviluppo del team e nella comunicazione interna. Sono ottimista che, con il tempo, l''azienda possa progredire su questi fronti. Tuttavia, ho incontrato alcune sfide che potrebbero essere superate con un impegno costante.', 2),
    (11, 11, 'La mia esperienza con questa azienda è stata estremamente positiva. Il team è altamente competente, e l''ambiente di lavoro stimolante ha contribuito al mio successo. Consiglio vivamente questa azienda a coloro che cercano sfide professionali.', 4),
    (11, 18, 'Lavorare con questa azienda è stato un autentico piacere. Ho avuto l''opportunità di contribuire a progetti significativi, sfruttando appieno le mie competenze. L''azienda ha dimostrato un impegno costante per l''eccellenza, rendendo la mia esperienza molto gratificante.', 5),
    (12, 12, 'Nonostante alcune sfide, l''azienda ha dimostrato un impegno costante per il miglioramento. Sono ottimista sul futuro, e la mia esperienza qui ha contribuito alla mia crescita professionale. L''azienda offre opportunità interessanti, nonostante le sfide occasionali.', 3),
    (13, 11, 'Lavorare con questa azienda è stato estremamente gratificante. Ho avuto l''opportunità di sviluppare competenze avanzate e contribuire a progetti significativi. L''azienda promuove un ambiente di lavoro inclusivo, che ho apprezzato molto.', 5),
    (13, 16, 'L''azienda ha promosso un ambiente di lavoro inclusivo e diversificato. Ho apprezzato la possibilità di imparare da colleghi talentuosi, contribuendo al successo collettivo. La mia esperienza qui è stata positiva e formativa.', 4),
    (14, 21, 'Questa azienda è all''avanguardia nell''innovazione. Ho avuto l''opportunità di lavorare su progetti ad alto impatto e di contribuire a iniziative all''avanguardia. La mia esperienza è stata estremamente positiva, e consiglio questa azienda a chi cerca un ambiente stimolante.', 5),
    (15, 15, 'Ho apprezzato l''attenzione ai dettagli e l''approccio professionale di questa azienda. La mia esperienza lavorativa è stata positiva, grazie a un ambiente di lavoro stimolante. Contribuire a progetti di rilievo ha reso il mio percorso gratificante.', 4),
    (15, 20, 'Lavorare qui è stato un''esperienza positiva. Ho avuto l''opportunità di contribuire a progetti rilevanti e di crescere professionalmente. La mia permanenza in questa azienda è stata caratterizzata da apprendimento continuo e soddisfazione.', 4),
    (16, 22, 'Ho avuto l''opportunità di lavorare con un team altamente qualificato. Sono grato per le sfide stimolanti e le opportunità di crescita offertemi da questa azienda. La mia esperienza è stata estremamente positiva, contribuendo alla mia crescita professionale.', 5),
    (17, 5, 'Sono grato per l''opportunità di lavorare in questa azienda. L''ambiente di lavoro stimolante e il team collaborativo hanno reso la mia esperienza positiva. Contribuire al successo aziendale è stato estremamente gratificante.', 5),
    (17, 14, 'Nonostante alcune sfide, l''azienda ha dimostrato un impegno costante per il miglioramento. Sono ottimista sul futuro, e la mia esperienza qui ha contribuito alla mia crescita professionale. L''azienda offre opportunità interessanti, nonostante le sfide occasionali.', 3),
    (18, 16, 'Lavorare con questa azienda è stato un autentico piacere. Ho avuto l''opportunità di contribuire a progetti significativi, sfruttando appieno le mie competenze. L''azienda ha dimostrato un impegno costante per l''eccellenza, rendendo la mia esperienza molto gratificante.', 5),
    (19, 4, 'Ho apprezzato l''attenzione ai dettagli e l''approccio professionale di questa azienda. La mia esperienza lavorativa è stata positiva, grazie a un ambiente di lavoro stimolante. Contribuire a progetti di rilievo ha reso il mio percorso gratificante.', 4),
    (19, 1, 'L''azienda ha un ambiente di lavoro positivo. Sono grato per le opportunità di apprendimento e sviluppo offertemi. La mia permanenza qui è stata caratterizzata da una crescita professionale continua e soddisfacente.', 5),
    (20, 2, 'Ho avuto l''opportunità di lavorare con un team altamente qualificato. Sono grato per le sfide stimolanti e le opportunità di crescita offertemi da questa azienda. La mia esperienza è stata estremamente positiva, contribuendo alla mia crescita professionale.', 5),
    (20, 10, 'Lavorare con questa azienda è stata un''esperienza formativa. Ho imparato molto e ho avuto l''opportunità di mettere in pratica le mie competenze. La collaborazione con colleghi dedicati ha reso il mio percorso estremamente gratificante.', 4),
    (21, 4, 'Ambiente di lavoro eccellente. Ho lavorato con un team molto professionale e dedicato, che mi ha permesso di maturare moltissimo dal punto di vista lavorativo e anche organizzativo. I progetti proposti erano sempre molto stimolanti e ', 5);
