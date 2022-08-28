using MongoDB.Driver;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class LocalizacoesRepository : ILocalizacoesInterface
    {
        private readonly IMongoCollection<Localizacoes> _localizacao;

        public LocalizacoesRepository()
        {
            var cliente = new MongoClient("mongodb://localhost:27017");
            var database = cliente.GetDatabase("t_opflix");
            _localizacao = database.GetCollection<Localizacoes>("localizacoes");
        }

        public void Cadastrar(Localizacoes localizacoes)
        {
            _localizacao.InsertOne(localizacoes);
        }

        public List<Localizacoes> Listar()
        {
            return _localizacao.Find(a => true).ToList();
        }
    }
}
