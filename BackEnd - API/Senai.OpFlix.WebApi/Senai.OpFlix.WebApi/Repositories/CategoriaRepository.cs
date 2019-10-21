using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class CategoriaRepository : ICategoriaInterface
    {
        public OpflixContext dB = new OpflixContext();

        public void Atualizar(int id, Categorias cat)
        {
            var Return = dB.Categorias.Find(id);
            Return.Nome = cat.Nome;
            dB.SaveChanges();
        }

        public void Cadastrar(Categorias cat)
        {
            dB.Categorias.Add(cat);
            dB.SaveChanges();
        }

        public List<Categorias> Listar()
        {
            return dB.Categorias.ToList();
        }
    }
}
