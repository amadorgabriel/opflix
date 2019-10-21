using Microsoft.EntityFrameworkCore;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class LancamentoRepository : ILancamentoInterface
    {
        public OpflixContext dB = new OpflixContext();
        public const string stringConexao = "Data Source=.\\SqlExpress; Initial Catalog=T_Opflix;User Id=sa;Pwd=132";
        //public const string stringConexao = "Data Source = DESKTOP - JBDLFFG\\MSSQLSERVER01; Initial Catalog = T_Opflix; Integrated Security = true";

        public void Atualizar(int id, Lancamentos lancamen)
        {
            var retorno = dB.Lancamentos.Find(id);
            retorno.DataLancamento = lancamen.DataLancamento;
            retorno.Duracao = lancamen.Duracao;
            retorno.Titulo = lancamen.Titulo;
            retorno.Sinopse = lancamen.Sinopse;
            retorno.IdCategoria = lancamen.IdCategoria;
            retorno.IdTipoConteudo = lancamen.IdTipoConteudo;
            dB.SaveChanges();
        }

        public void Cadastrar(Lancamentos lancamen)
        {
            dB.Lancamentos.Add(lancamen);
            dB.SaveChanges();
        }

        public void Deletar(int id)
        {
            var retorno = dB.Lancamentos.Find(id);
            dB.Remove(retorno);
            dB.SaveChanges();
        }

        public void Favoritar(int idUser, int idLancamento)
        {   
            SqlConnection con = new SqlConnection(stringConexao);
            con.Open();
            string Query = "INSERT INTO Favoritos (IdLancamento, IdUsuario) VALUES ( @idLancame , @idUser )";
            SqlCommand cmd = new SqlCommand(Query, con);
            cmd.Parameters.AddWithValue("@idLancame", idLancamento);
            cmd.Parameters.AddWithValue("@idUser", idUser);
            SqlDataReader sdr = cmd.ExecuteReader();
        }

        public List<Lancamentos> Listar()
        {
             return dB.Lancamentos.Include(categ => categ.IdCategoriaNavigation).Include(TipoConteudo  => TipoConteudo.IdTipoConteudoNavigation ).ToList();
        }

        public List<Lancamentos> ListarPorDataLancamento(string orderBy)
        {
           // Console.WriteLine(orderBy + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            if(orderBy.ToLower() == "desc")
            {
                return dB.Lancamentos.Include(categ => categ.IdCategoriaNavigation).Include(TipoConteudo => TipoConteudo.IdTipoConteudoNavigation).OrderByDescending(x => x.DataLancamento).ToList();
            }
            else
            {
                return dB.Lancamentos.Include(categ => categ.IdCategoriaNavigation).Include(TipoConteudo => TipoConteudo.IdTipoConteudoNavigation).OrderBy(x => x.DataLancamento).ToList();
            }

            //return dB.Lancamentos.FromSql("SELECT * FROM Lancamentos ORDER BY DataLancamento " + orderBy).ToList();
        }

        public List<Lancamentos> ListarPorPlataforma(string plataforma)
        {
            return dB.Lancamentos.FromSql("SELECT Plataformas.*, Lancamentos.* FROM PlataformaLancamento JOIN Plataformas ON PlataformaLancamento.IdPlataforma = Plataformas.IdPlataforma JOIN Lancamentos ON PlataformaLancamento.IdLancamento = Lancamentos.IdLancamento WHERE Plataformas.Nome LIKE '%" + plataforma + "%'").ToList();
        }

        public List<Lancamentos> ListarPorCategorias(int idCat)
        {
            return dB.Lancamentos.Include(categ => categ.IdCategoriaNavigation).Include(TipoConteudo => TipoConteudo.IdTipoConteudoNavigation).Where(i => i.IdCategoria == idCat).ToList();

            // return dB.Lancamentos.FromSql("SELECT * FROM Lancamentos WHERE IdCategoria = " + idCat ).ToList();
        }
    }
}
