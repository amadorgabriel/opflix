using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class Lancamentos
    {
        public Lancamentos()
        {
            Favoritos = new HashSet<Favoritos>();
        }

        public int IdLancamento { get; set; }
        public DateTime DataLancamento { get; set; }
        public TimeSpan Duracao { get; set; }
        public string Titulo { get; set; }
        public string Sinopse { get; set; }
        public int? IdCategoria      { get; set; }
        public int? IdTipoConteudo { get; set; }
        public string FotoLanc { get; set; }

        public Categorias IdCategoriaNavigation { get; set; }
        public TipoConteudo IdTipoConteudoNavigation { get; set; }
        public ICollection<Favoritos> Favoritos { get; set; }
    }
}
