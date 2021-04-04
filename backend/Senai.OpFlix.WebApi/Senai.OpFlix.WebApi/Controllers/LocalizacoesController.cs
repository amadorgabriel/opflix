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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LocalizacoesController : ControllerBase
    {
        public ILocalizacoesInterface  localizacoesInterface { get; set; }

        public LocalizacoesController()
        {
            localizacoesInterface = new LocalizacoesRepository();
        }

        //[Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok( localizacoesInterface.Listar() );
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Cadastrar( Localizacoes local )
        {
            try
            {
                localizacoesInterface.Cadastrar(local);
                return Ok();
            }
            catch (Exception exe)
            {
                return BadRequest( new {mensagem = "Erro ao cadastrar >: " + exe.Message } );
            }
        }


    }
}