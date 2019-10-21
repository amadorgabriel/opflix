using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class TipoConteudo
    {
        public TipoConteudo()
        {
            Lancamentos = new HashSet<Lancamentos>();
        }

        public int IdTipoConteudo { get; set; }
        public string Nome { get; set; }

        public ICollection<Lancamentos> Lancamentos { get; set; }
    }
}
