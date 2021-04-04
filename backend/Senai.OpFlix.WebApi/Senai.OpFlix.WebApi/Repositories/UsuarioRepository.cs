using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioInterface
    {
        public OpflixContext dB = new OpflixContext();

        public Usuarios BuscarPorEmailESenha(LoginViewModel logon)
        {
            Usuarios userEmail = dB.Usuarios.FirstOrDefault(u => u.Email == logon.Email);

            Byte[] descript = Convert.FromBase64String(userEmail.Senha);
            string descriptografia = System.Text.Encoding.ASCII.GetString(descript);

            Usuarios userReturn = dB.Usuarios.FirstOrDefault(user => user.Email == logon.Email && logon.Senha == descriptografia );
            return userReturn;
        }

        public void CadastrarComum(Usuarios cliente)
        {
            dB.Usuarios.Add(cliente);
            dB.SaveChanges();
        }
    }
}
