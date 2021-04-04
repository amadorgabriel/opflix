using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        IUsuarioInterface usuarioInterface { get; set; }

        public UsuariosController()
        {
            usuarioInterface = new UsuarioRepository();
        }

        //cadastro de usuarios 
        [HttpPost]
        public IActionResult CadastrarComum(Usuarios client)
        {
            //pegar pefil dados do token em string
            //string userPerm = HttpContext.User.Claims.First(user => user.Type == ClaimTypes.Role).Value;

            try
            {
                if (client == null)
                {
                    return BadRequest(new { mensagem = "Não cadastrado, algum dado nulo ;-;" });
                }

                if (client.IdPerfil == 1)
                {
                    return BadRequest(new { mensagem = "Perdão, mas você É APENAS UM USUÁRIO COMUM :(" });
                }

                Byte[] cript = System.Text.Encoding.ASCII.GetBytes(client.Senha);
                string senhaCrip  = Convert.ToBase64String(cript);
                client.Senha = senhaCrip;

                usuarioInterface.CadastrarComum(client);
                return Ok();

            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao cadastrar, veja mais meu caro >:" + exe.Message });
            }
        }

        //cadastro de usuarios Admin 
        [Authorize(Roles = "Admin")]
        [HttpPost("cadastrar/admin")]
        public IActionResult CadastrarAdmin(Usuarios client)
        {
            //pegar pefil dados do token em string
            string userPerm = HttpContext.User.Claims.First(user => user.Type == ClaimTypes.Role).Value;

            try
            {
                if (client == null)
                {
                    return BadRequest(new { mensagem = "Não cadastrado, algum dado nulo ;-;" });
                }

                Byte[] cript = System.Text.Encoding.ASCII.GetBytes(client.Senha);
                string senhaCrip = Convert.ToBase64String(cript);
                client.Senha = senhaCrip;

                usuarioInterface.CadastrarComum(client);
                return Ok();

            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao cadastrar, veja mais meu caro >:" + exe.Message });
            }
        }




    }
}