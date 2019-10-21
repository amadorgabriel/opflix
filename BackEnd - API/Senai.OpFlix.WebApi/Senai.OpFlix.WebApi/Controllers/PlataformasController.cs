using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Authorize (Roles = "Admin")]
    [Produces ("application/json")]
    [Route("api/[controller]")]
    [ApiController]

    public class PlataformasController : ControllerBase
    {

        IPlataformaInterface plataformaInterface { get; set; }

        public PlataformasController()
        {
            plataformaInterface = new PlataformaRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(plataformaInterface.Listar());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Cadastrar(Plataformas plataforma)
        {
            try
            {
                if (plataforma == null)
                {
                    return BadRequest(new { mensagem = "Não cadastrado, algum dado nulo ;-;" });
                }

                plataformaInterface.Cadastrar(plataforma);
                return Ok();

            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao cadastrar, veja mais meu caro >:" + exe.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Plataformas plataforma)
        {
            try
            {
                if (plataforma == null)
                {
                    return BadRequest(new { mensagem = "Não atualizado, algum dado nulo ou inexistente ;-;" });
                }

                plataformaInterface.Atualizar(id, plataforma);
                return Ok();

            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao cadastrar, veja mais meu caro >:" + exe.Message });
            }
        }

    }
}