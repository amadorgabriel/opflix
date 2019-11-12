USE T_Opflix;

INSERT INTO Perfil (TipoPerfil) VALUES ('Admin'),('Comum');
INSERT INTO TipoConteudo(Nome) VALUES ('Filme'),('Série');
INSERT INTO Plataformas (Nome) VALUES ('Netflix'),('Amazon'),('Cinema'), ('VHS');
INSERT INTO Categorias (Nome) VALUES ('Terror'),('Romance'),('Aventura'),('Ação'),('Comédia'),('Drama'),('Ficção Cientifica');
INSERT INTO Usuarios (Nome, Email, Senha, IdPerfil) 
   VALUES ('Erik','erik@email.com','123456', 1 ),('Helena','helena@email.com','123456', 2 ),
		  ('Roberto','rob@email.com','3110', 2 ),('Cassiana','cassiana@email.com','123456', 1 );

INSERT INTO Lancamentos (DataLancamento, Duracao, Titulo, Sinopse, IdCategoria, IdTipoConteudo)
VALUES  ('25-10-2012','01:16:04','A Culpa é das Estrelas','...', 2, 1),
	    ('24-08-2000','01:18:04','Get Out','...', 1, 1),
	    ('15-01-2000','01:16:04','Love','...', 2, 2),
		('02-05-2000','15:15:15','Teen Wolf','...', 3, 2),
		('21-10-2011','02:00:00','O Rei Leão','...', 3, 1),
		('18-04-2019','22:16:04','American Gods','...', 7, 2),
		('19-01-2000','23:00:00','La Casa de Papel','...', 4, 2);

INSERT INTO PlataformaLancamento (IdPlataforma, IdLancamento)  
VALUES (1,1),(2,1),(3,1),(1,2),(3,3),(2,3),(1,4),(3,4),(3,5),(2,5),(1,6),(3,7);
INSERT INTO PlataformaLancamento (IdPlataforma, IdLancamento) VALUES (4,5);

---------------------------- EXTRAS -------------------------------

DELETE FROM PlataformaLancamento WHERE IdLancamento = 6;
DELETE FROM Lancamentos WHERE IdLancamento = 6;
DELETE FROM PlataformaLancamento WHERE IdLancamento = 5;

UPDATE Lancamentos SET Titulo = 'La Casa de Papel 3º Temporada' WHERE IdLancamento = 7;
UPDATE Usuarios SET IdPerfil = 1 WHERE IdUsuario = 2;
UPDATE Lancamentos SET DataLancamento = '08/07/1994' WHERE IdLancamento = 5;
UPDATE PlataformaLancamento SET IdPlataforma = 4 WHERE IdLancamento = 5;

INSERT INTO Lancamentos (DataLancamento, Duracao, Titulo, Sinopse, IdCategoria, IdTipoConteudo)
VALUES  ('25-10-2012','01:16:04','Velozes e Furiosos: Hobbs & Shaw','...', 4, 1),
	    ('24-08-2000','02:00:04','Toy Story 4','...', 7, 1),
	    ('15-01-2000','03:57:00','Nada a Perder – Parte 2','...', 4, 1);

UPDATE Usuarios SET FotoPerfil = 'https://abrilexame.files.wordpress.com/2018/10/capaprofile.jpg?quality=70&strip=info&resize=680,453';
--(Todos estão com fotos iguais, o que não é proibido');

INSERT INTO Lancamentos (DataLancamento, Duracao, Titulo, Sinopse, IdCategoria, IdTipoConteudo)
VALUES  ('25-10-2012','01:16:04','Os Guardiões da Galáxia','...', 7, 1),
	    ('24-08-2000','01:18:04','Os Guardiões da Galáxia','...', 7, 1)

INSERT INTO PlataformaLancamento (IdPlataforma, IdLancamento) VALUES (3,11), (1,12);
INSERT INTO Favoritos (IdLancamento, IdUsuario) VALUES (2,1), (3,1), (4,3);
INSERT INTO Favoritos (IdLancamento, IdUsuario) VALUES (9,2)
INSERT INTO Favoritos (IdLancamento, IdUsuario) VALUES (2,1)

UPDATE Usuarios SET Senha = 'MTIzNDU2' WHERE IdUsuario = 1
UPDATE Usuarios SET Senha = 'MTIzNDU2' WHERE IdUsuario = 2
UPDATE Usuarios SET Senha = 'MTIzNDU2' WHERE IdUsuario = 4
UPDATE Usuarios SET Senha = 'MzExMA==' WHERE IdUsuario = 3
UPDATE Usuarios SET Senha = 'NTQ2Nzg5' WHERE IdUsuario = 6
UPDATE Usuarios SET Senha = 'Nzg5Nzg5' WHERE IdUsuario = 7

------------------------------- MOTIVADO PELA API -----------------------------------

DELETE FROM Usuarios WHERE IdUsuario = 9;
DELETE FROM Usuarios WHERE IdUsuario = 10;
DELETE FROM Usuarios WHERE IdUsuario = 11;
DELETE FROM Usuarios WHERE IdUsuario = 12;
DELETE FROM Usuarios WHERE IdUsuario = 13;
DELETE FROM Usuarios WHERE IdUsuario = 19;

SELECT * FROM PlataformaLancamento
DELETE FROM PlataformaLancamento WHERE IdLancamento = 12

SELECT * FROM Favoritos
DELETE FROM Favoritos WHERE IdLancamento = 12;
DELETE FROM Favoritos WHERE IdLancamento = 13;
DELETE FROM Favoritos WHERE IdLancamento = 15;
DELETE FROM Favoritos WHERE IdLancamento = 41;
DELETE FROM Favoritos WHERE IdLancamento = 87;

SELECT * FROM Lancamentos ORDER BY IdLancamento ASC
DELETE FROM Lancamentos WHERE IdLancamento = 12;
DELETE FROM Lancamentos WHERE IdLancamento = 13;
DELETE FROM Lancamentos WHERE IdLancamento = 15;
DELETE FROM Lancamentos WHERE IdLancamento = 41;
DELETE FROM Lancamentos WHERE IdLancamento = 87;
DELETE FROM Categorias WHERE IdCategoria = 10


-- FOTO LANÇAMENTO
UPDATE Lancamentos SET FotoLanc = 'https://images-na.ssl-images-amazon.com/images/I/41MRMmeNz0L._SY445_QL70_.jpg' WHERE IdLancamento = 1
UPDATE Lancamentos SET FotoLanc = 'https://miro.medium.com/max/675/0*afTCZX9mMynUvqi2.jpg' WHERE IdLancamento = 2
UPDATE Lancamentos SET FotoLanc = 'https://www.yourtango.com/sites/default/files/styles/header_slider/public/image_blog/bible-marriage-love-scripture-1-corinthians-13.jpg?itok=BXe6JFHT' WHERE IdLancamento = 3
UPDATE Lancamentos SET FotoLanc = 'https://2.bp.blogspot.com/-aE-HiaonIU0/V8D1er76ebI/AAAAAAAASQs/WhN1B9s9kSwyMLDmmDaw-aoGPBFin-mAgCLcB/s1600/capa-teenwolf.png' WHERE IdLancamento = 4
UPDATE Lancamentos SET FotoLanc = 'https://imagens.canaltech.com.br/248023.486711-O-Rei-Leao-posteres-dos-personagens.jpg' WHERE IdLancamento = 5
UPDATE Lancamentos SET FotoLanc = 'https://abrilexame.files.wordpress.com/2019/07/la-casa-de-papel.gif?w=680&h=453&crop=1' WHERE IdLancamento = 7
UPDATE Lancamentos SET FotoLanc = 'http://br.web.img2.acsta.net/c_215_290/pictures/19/07/05/17/41/1616389.jpg' WHERE IdLancamento = 8
UPDATE Lancamentos SET FotoLanc = 'https://tartarugafilmes.com.br/wp-content/uploads/2019/07/Toy-Story-4.jpg' WHERE IdLancamento = 9
UPDATE Lancamentos SET FotoLanc = 'https://dito-b2b-ingresso.s3.amazonaws.com/uploads/movie/poster/207/P%C3%B4ster-Nacional---Nada-a-Perder-2....jpg' WHERE IdLancamento = 10
UPDATE Lancamentos SET FotoLanc = 'http://br.web.img2.acsta.net/c_215_290/pictures/14/06/03/21/11/122582.jpg' WHERE IdLancamento = 11
UPDATE Lancamentos SET FotoLanc = 'https://images-na.ssl-images-amazon.com/images/I/41pUAKchcqL.jpg' WHERE IdLancamento = 16
UPDATE Lancamentos SET FotoLanc = 'https://upload.wikimedia.org/wikipedia/pt/1/1a/P%C3%B4ster_Se_Eu_Fosse_Voc%C3%AA.jpg' WHERE IdLancamento = 21
UPDATE Lancamentos SET FotoLanc = 'https://upload.wikimedia.org/wikipedia/pt/thumb/2/22/Titanic_poster.jpg/250px-Titanic_poster.jpg' WHERE IdLancamento = 31

-- SINOPSE

UPDATE Lancamentos SET Sinopse = 'Amantes se amando por milênios, e nesta encarnação algo diferente pode acontecer.' WHERE IdLancamento = 3
UPDATE Lancamentos SET Sinopse = 'A série gira em torno de Scott McCall, um estudante do ensino médio que vive na cidade de Beacon Hills. A vida de Scott muda drasticamente quando ele é arranhado por um lobisomem em uma noite, enquanto vagava pela floresta em busca de um cadáver junto ao seu melhor amigo Stiles.' WHERE IdLancamento = 4
UPDATE Lancamentos SET Sinopse = 'Este desenho animado da Disney mostra as aventuras de um leão jovem de nome Simba, o herdeiro de seu pai, Mufasa. O tio malvado de Simba, Oscar, planeja roubar o trono de Mufasa atraindo pai e filho para uma emboscada. Simba consegue escapar e somente Mufasa morre. Com a ajuda de seus amigos,Timon e Pumba, ele reaparece como adulto para recuperar sua terra, que foi roubada por seu tio Oscar.' WHERE IdLancamento = 5
UPDATE Lancamentos SET Sinopse = 'Um homem conhecido como O Professor recruta uma jovem assaltante e outros sete criminosos para um grande roubo. O alvo é a Casa da Moeda da Espanha.' WHERE IdLancamento = 7
UPDATE Lancamentos SET Sinopse = 'O corpulento policial Luke Hobbs se junta ao fora da lei Deckard Shaw para combater um terrorista geneticamente melhorado que tem força sobre-humana.' WHERE IdLancamento = 8
UPDATE Lancamentos SET Sinopse = 'Woody, Buzz Lightyear e o resto da turma embarcam em uma viagem com Bonnie e um novo brinquedo chamado Forky. A aventura logo se transforma em uma reunião inesperada quando o ligeiro desvio que Woody faz o leva ao seu amigo há muito perdido, Bo Peep.' WHERE IdLancamento = 9
UPDATE Lancamentos SET Sinopse = 'A trajetória do bispo evangélico Edir Macedo, empresário, fundador e líder espiritual da Igreja Universal do Reino de Deus e proprietário da Record TV.' WHERE IdLancamento = 10
UPDATE Lancamentos SET Sinopse = 'O aventureiro do espaço Peter Quill torna-se presa de caçadores de recompensas depois que rouba a esfera de um vilão traiçoeiro, Ronan. Para escapar do perigo, ele faz uma aliança com um grupo de quatro extraterrestres. Quando Quill descobre que a esfera roubada possui um poder capaz de mudar os rumos do universo, ele e seu grupo deverão proteger o objeto para salvar o futuro da galáxia.' WHERE IdLancamento = 11
UPDATE Lancamentos SET Sinopse = 'Um artista pobre e uma jovem rica se conhecem e se apaixonam na fatídica jornada do Titanic, em 1912. Embora esteja noiva do arrogante herdeiro de uma siderúrgica, a jovem desafia sua família e amigos em busca do verdadeiro amor.' WHERE IdLancamento = 31

-- TITULO

UPDATE Lancamentos SET Titulo = 'Titanic' WHERE IdLancamento = 31








