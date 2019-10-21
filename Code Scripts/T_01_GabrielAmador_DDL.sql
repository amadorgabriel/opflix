CREATE DATABASE T_Opflix;
USE T_Opflix;

CREATE TABLE Perfil(
	IdPerfil INT PRIMARY KEY IDENTITY NOT NULL,
	TipoPerfil VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Usuarios(
	IdUsuario INT PRIMARY KEY IDENTITY NOT NULL,
	Nome VARCHAR(250) NOT NULL,
	Email VARCHAR(250) UNIQUE NOT NULL, 
	Senha VARCHAR(250) NOT NULL,
	IdPerfil INT FOREIGN KEY REFERENCES Perfil(IdPerfil) DEFAULT(2)
);

CREATE TABLE Categorias(
	IdCategoria INT PRIMARY KEY IDENTITY NOT NULL,
	Nome VARCHAR(250) NOT NULL UNIQUE
);

CREATE TABLE TipoConteudo(
	IdTipoConteudo INT PRIMARY KEY IDENTITY NOT NULL,
	Nome VARCHAR(250) UNIQUE NOT NULL
);

CREATE TABLE Plataformas (
	IdPlataforma INT PRIMARY KEY IDENTITY NOT NULL,
	Nome VARCHAR(250) UNIQUE NOT NULL
);

CREATE TABLE Lancamentos(
	IdLancamento INT PRIMARY KEY IDENTITY NOT NULL,
	DataLancamento DATE NOT NULL,
	Duracao TIME NOT NULL,
	Titulo VARCHAR(250) NOT NULL,
	Sinopse VARCHAR(2000) NOT NULL,
	IdCategoria INT FOREIGN KEY REFERENCES Categorias(IdCategoria),
	IdTipoConteudo INT FOREIGN KEY REFERENCES TipoConteudo(IdTipoConteudo)
);

CREATE TABLE PlataformaLancamento (
	IdLancamento INT FOREIGN KEY REFERENCES Lancamentos(IdLancamento),
	IdPlataforma INT FOREIGN KEY REFERENCES Plataformas(IdPlataforma)
);

CREATE TABLE Favoritos(
	IdLancamento INT FOREIGN KEY REFERENCES Lancamentos(IdLancamento),
	IdUsuario INT FOREIGN KEY REFERENCES Usuarios(IdUsuario)
);

---------------- EXTRAS --------------------

ALTER TABLE Usuarios ADD FotoPerfil VARCHAR(500);
DROP PROCEDURE QuantFilmesPorCategoria; --(FAVOR NÃO   D R O P A R )

ALTER TABLE Lancamentos ADD FotoLanc VARCHAR(500) DEFAULT ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK');

ALTER TABLE Favoritos ADD IdPadrao INT PRIMARY KEY IDENTITY NOT NULL;

-------------- FUNCTIONS ---------------

CREATE FUNCTION ListarCategorias()
RETURNS TABLE AS RETURN SELECT IdCategoria, Nome FROM Categorias;

CREATE FUNCTION ListarPlataformas()
RETURNS TABLE AS RETURN SELECT IdPlataforma, Nome FROM Plataformas;

CREATE FUNCTION ListarLancamentos()
RETURNS TABLE AS RETURN SELECT * FROM Lancamentos;

CREATE FUNCTION ListarUsuarios()
RETURNS TABLE AS RETURN SELECT IdUsuario,Nome,Email,IdPerfil FROM Usuarios;

------------ PROCEDURES -----------------

CREATE PROCEDURE ListarFilmePorCategoria @Categoria VARCHAR(250) 
AS 
SELECT * FROM Lancamentos
JOIN Categorias 
ON Lancamentos.IdCategoria = Categorias.IdCategoria
WHERE Categorias.Nome = @Categoria;


CREATE PROCEDURE QuantFilmesPorCategoria @IdCategoria INT AS 
SELECT COUNT(*) AS QuantFilmes FROM Lancamentos
WHERE @IdCategoria = Lancamentos.IdCategoria ;
EXECUTE QuantFilmesPorCategoria 4;

CREATE VIEW vw_PlataformaLancamento AS
SELECT Plataformas.IdPlataforma, Categorias.Nome FROM PlataformaLancamento
JOIN Plataformas ON PlataformaLancamento.IdPlataforma = Plataformas.IdPlataforma
JOIN Lancamentos ON PlataformaLancamento.IdLancamento = Lancamentos.IdLancamento
JOIN Categorias ON Lancamentos.IdCategoria = Categorias.IdCategoria
WHERE PlataformaLancamento.IdPlataforma = 4;
