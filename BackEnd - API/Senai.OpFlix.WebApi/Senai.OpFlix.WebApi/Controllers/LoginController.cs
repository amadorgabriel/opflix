using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;
using Senai.OpFlix.WebApi.ViewModels;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        //INTERFACE
        public IUsuarioInterface usuarioInterface { get; set; }

        //INSTÃNCIA CONTROLLER
        public LoginController()
        {
            usuarioInterface = new UsuarioRepository();
        }

        //LOGAR
        [HttpPost]
        public IActionResult Logar(LoginViewModel logon)
        {
            try
            {
                Usuarios userReturn = usuarioInterface.BuscarPorEmailESenha(logon);
                if (userReturn == null)
                {
                    return NotFound(new { mensagem = "Usuario inexistente no nosso banco de dados, por favor tente novamente ou cadastre-se na nossa plataforma :)" });
                }

                //gerar keys, creds, clains, retornar token
                string permisaoUser;

                if (userReturn.IdPerfil == 1)
                {
                    permisaoUser = "Admin";
                }
                else
                {
                    permisaoUser = "Comum";
                }

                var claims = new[] //é p css do nosso token, pôh ele estiliza a parada toda
                {
                    new Claim("perm", permisaoUser),
                    new Claim(JwtRegisteredClaimNames.Email, userReturn.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, userReturn.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, permisaoUser),
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("Chave_OpFlix_linda_bonita_e_charmosa"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "OpFlix.WebApi",
                    audience: "OpFlix.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });

            }
            catch (Exception exe)
            {
               
                return BadRequest(new { mensagem = "Opa meu caro(a), segue o erro >:" + exe.Message });
            }

        }


    }
}