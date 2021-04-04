using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class Perfil
    {
        public Perfil()
        {
            Usuarios = new HashSet<Usuarios>();
        }

        public int IdPerfil { get; set; }
        public string TipoPerfil { get; set; }

        public ICollection<Usuarios> Usuarios { get; set; }
    }
}
