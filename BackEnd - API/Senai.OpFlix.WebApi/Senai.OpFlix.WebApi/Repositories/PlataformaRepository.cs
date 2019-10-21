using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class PlataformaRepository : IPlataformaInterface
    {
        public OpflixContext dB = new OpflixContext();

        public void Atualizar(int id, Plataformas plataforma)
        {
            var Return = dB.Plataformas.Find(id);
            Return.Nome = plataforma.Nome;
            dB.SaveChanges();
        }

        public void Cadastrar(Plataformas plataforma)
        {
            dB.Plataformas.Add(plataforma);
            dB.SaveChanges();
        }

        public List<Plataformas> Listar()
        {
            return dB.Plataformas.ToList();
        }
    }
}
