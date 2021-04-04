using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class Favoritos
    {
        public int? IdLancamento { get; set; }
        public int? IdUsuario { get; set; }
        public int IdPadrao { get; set; }

        public Lancamentos IdLancamentoNavigation { get; set; }
        public Usuarios IdUsuarioNavigation { get; set; }
    }
}
