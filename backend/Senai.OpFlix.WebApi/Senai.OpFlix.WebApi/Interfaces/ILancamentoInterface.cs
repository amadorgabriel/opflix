using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    public interface ILancamentoInterface
    {
        List<Lancamentos> Listar();
        void Cadastrar(Lancamentos lancamen);
        void Atualizar(int id, Lancamentos lancamen);
        void Deletar(int id);
        List<Lancamentos> ListarPorDataLancamento(string orderBy);
        List<Lancamentos> ListarPorPlataforma(string plataforma);
        void Favoritar(int idUser, int idLancamento);
        List<Lancamentos> ListarPorCategorias(int idCat);

    }
}
