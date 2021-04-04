using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class Usuarios
    {
        public Usuarios()
        {
            Favoritos = new HashSet<Favoritos>();
        }

        public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int? IdPerfil { get; set; }
        public string FotoPerfil { get; set; }

        public Perfil IdPerfilNavigation { get; set; }
        public ICollection<Favoritos> Favoritos { get; set; }
    }
}
