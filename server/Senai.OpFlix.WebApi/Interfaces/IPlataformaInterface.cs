using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    public interface IPlataformaInterface
    {
        List<Plataformas> Listar();
        void Cadastrar(Plataformas plataforma);
        void Atualizar(int id, Plataformas plataforma);
    }
}
