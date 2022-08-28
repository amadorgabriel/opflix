using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    public interface ICategoriaInterface
    {
        List<Categorias> Listar();
        void Cadastrar(Categorias cat);
        void Atualizar(int id, Categorias cat);
    }
}
