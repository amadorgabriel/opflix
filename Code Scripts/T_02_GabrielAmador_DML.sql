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

UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 1
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 2
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 3
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 4
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 5
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 7
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 8
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 9
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 10
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 11
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 12
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 13
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 15
UPDATE Lancamentos SET FotoLanc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK' WHERE IdLancamento = 16








