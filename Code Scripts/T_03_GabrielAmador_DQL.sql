USE T_Opflix;

------------ JOINS --------------------

SELECT Lancamentos.DataLancamento,Lancamentos.Duracao,Lancamentos.Titulo,Lancamentos.Sinopse, TipoConteudo.Nome AS Conteudo, Categorias.Nome AS Categorias
FROM Lancamentos JOIN TipoConteudo
ON Lancamentos.IdTipoConteudo = TipoConteudo.IdTipoConteudo
JOIN Categorias ON Lancamentos.IdCategoria = Categorias.IdCategoria;

SELECT Usuarios.*, Lancamentos.*
FROM Usuarios JOIN Favoritos
ON Usuarios.IdUsuario = Favoritos.IdUsuario
JOIN Lancamentos
ON Favoritos.IdLancamento = Lancamentos.IdLancamento
WHERE Usuarios.IdUsuario = 1;

SELECT Plataformas.*, Lancamentos.*
FROM PlataformaLancamento JOIN Plataformas
ON PlataformaLancamento.IdPlataforma = Plataformas.IdPlataforma
JOIN Lancamentos 
ON PlataformaLancamento.IdLancamento = Lancamentos.IdLancamento
WHERE Plataformas.Nome LIKE '%net%'

-------------- SELECTS -----------------

SELECT * FROM Categorias;
SELECT * FROM PlataformaLancamento;
SELECT * FROM Plataformas;
SELECT * FROM Usuarios;
SELECT * FROM TipoConteudo;
SELECT * FROM Favoritos;
SELECT * FROM Perfil;
SELECT * FROM Lancamentos ORDER BY IdLancamento;

DELETE FROM Lancamentos WHERE IdLancamento = 3
DELETE FROM Lancamentos WHERE IdLancamento = 83
DELETE FROM Lancamentos WHERE IdLancamento = 84

-------------- FUNCTIONS ---------------

SELECT * FROM ListarCategorias() ORDER BY IdCategoria ASC;
SELECT * FROM ListarPlataformas() ORDER BY IdPlataforma ASC;
SELECT * FROM ListarLancamentos() ORDER BY IdLancamento ASC;
SELECT * FROM ListarUsuarios() ORDER BY IdUsuario DESC;

------------ PROCEDURES -----------------

EXECUTE ListarFilmePorCategoria 'Ação';
-- AEEE GARACA, QUE ORGULHO POH

SELECT DISTINCT Titulo FROM Lancamentos;

SELECT * FROM vw_PlataformaLancamento

------------- PELA API ----------------

SELECT * FROM Lancamentos WHERE IdCategoria = 1;


ALTER TABLE Lancamentos 
ALTER COLUMN FotoLanc










