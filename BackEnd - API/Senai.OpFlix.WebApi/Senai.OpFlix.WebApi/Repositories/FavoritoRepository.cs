using Microsoft.EntityFrameworkCore;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class FavoritoRepository : IFavoritoInterface
    {
        public OpflixContext dB = new OpflixContext();

        public List<Favoritos> ListarFavoritos(int idUser)
        {
            Usuarios user = dB.Usuarios.Find(idUser);
            return dB.Favoritos.Include(idL => idL.IdLancamentoNavigation).ThenInclude(categ => categ.IdCategoriaNavigation).Include(idL => idL.IdLancamentoNavigation).ThenInclude(TipoConteudo => TipoConteudo.IdTipoConteudoNavigation).Where(i => i.IdUsuario == idUser).ToList();

            // return dB.Lancamentos.FromSql("SELECT Usuarios.*, Lancamentos.* FROM Usuarios JOIN Favoritos ON Usuarios.IdUsuario = Favoritos.IdUsuario JOIN Lancamentos ON Favoritos.IdLancamento = Lancamentos.IdLancamento WHERE Usuarios.IdUsuario = " + idUser).ToList();

        }
    }
}
