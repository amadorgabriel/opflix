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
    [Produces ("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        ICategoriaInterface categoriaInterface { get; set; }

        public CategoriasController()
        {
            categoriaInterface = new CategoriaRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(categoriaInterface.Listar());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Cadastrar(Categorias cat)
        {
            try
            {
                if (cat == null)
                {
                    return BadRequest(new { mensagem = "Não cadastrado, algum dado nulo ;-;" });
                }

                categoriaInterface.Cadastrar(cat);
                return Ok();

            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao cadastrar, veja mais meu caro >:" + exe.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Categorias cat)
        {
            try
            {
                if (cat == null)
                {
                    return BadRequest(new { mensagem = "Não atualizado, algum dado nulo ou inexistente ;-;" });
                }

                categoriaInterface.Atualizar(id, cat);
                return Ok();

            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao cadastrar, veja mais meu caro >:" + exe.Message });
            }
        }



    }
}