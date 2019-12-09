using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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
    public class LancamentosController : ControllerBase
    {
        ILancamentoInterface lancamentoInterface { get; set; }
        IPlataformaInterface plataformaInterface { get; set; }
        IFavoritoInterface favoritoInterface { get; set; }

        public LancamentosController()
        {
            lancamentoInterface = new LancamentoRepository();
            plataformaInterface = new PlataformaRepository();
            favoritoInterface = new FavoritoRepository();
        }

        [HttpGet]
        [Authorize]
        public IActionResult Listar()
        {
            
            return Ok( lancamentoInterface.Listar() );
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Cadastrar(Lancamentos lancamento)
        {
            //DEBUG:
            //int idUser = Convert.ToInt32(HttpContext.User.Claims.First(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
            //string userPerm = HttpContext.User.Claims.First(user => user.Type == ClaimTypes.Role).Value;

            //Console.WriteLine(idUser + "WWWWWWWWWWWWWWWWSADFSDF" + userPerm);

            try
            {
                if (lancamento == null)
                {
                    return BadRequest(new { mensagem = "Não cadastrado, algum dado nulo ;-;"});
                }

                lancamentoInterface.Cadastrar(lancamento);
                return Ok();

            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao cadastrar, veja mais meu caro >:" + exe.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult Atualizar (int id, Lancamentos lancamento)
        {
            try
            {
                if (lancamento == null)
                {
                    return BadRequest(new { mensagem = "Não atualizado, algum dado nulo ou inexistente ;-;" });
                }

                lancamentoInterface.Atualizar(id, lancamento);
                return Ok();

            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao cadastrar, veja mais meu caro >:" + exe.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Deletar (int id)
        {
            lancamentoInterface.Deletar(id);
            return Ok();
        }

        [Authorize]
        [HttpGet("favoritos")]
        public IActionResult ListarFavoritos()
        {
            //id user:
            int idUser = Convert.ToInt32(HttpContext.User.Claims.First(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
            try
            {
                var listaLancamentos = favoritoInterface.ListarFavoritos(idUser);

                if (listaLancamentos == null || listaLancamentos.Count == 0)
                {
                    return NotFound(listaLancamentos);
                }
                return Ok(listaLancamentos);

            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao Listar >:" + exe.Message });
            }
        }

        //[Authorize]
        [HttpGet("filtrarData/{orderBy}")] //ASC ou DESC
        public IActionResult ListarPorDataLancamento(string orderBy)
        {
            if(orderBy.ToLower() == "asc" || orderBy.ToLower() == "desc")
            {
                 return Ok( lancamentoInterface.ListarPorDataLancamento(orderBy.ToLower()));
            }
            return NotFound(new { mensagem = "O tipo de ordem selecionada não existe, escolha entre ASC ou DESC" });
        }

        //[Authorize]
        [HttpGet("filtrarCategoria/{idCat}")] //ASC ou DESC
        public IActionResult ListarPorCategorias(int idCat)
        {
            try
            {
                return Ok( lancamentoInterface.ListarPorCategorias(idCat) );
            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro >:" + exe.Message });
            }
        }

        [Authorize]
        [HttpGet("filtrarPlataforma/{plataforma}")]
        public IActionResult ListarPorPlataforma(string plataforma)
        {
            foreach(var item in plataformaInterface.Listar())
            {
                if(plataforma.ToLower() == item.Nome.ToLower())
                {
                    return Ok( lancamentoInterface.ListarPorPlataforma(plataforma) );
                }
            }

            return NotFound(new { mensagem = "A plataforma selecionada não existe" });
        }

        [Authorize]
        [HttpGet("favoritar/{idLancamento}")]
        public IActionResult FavoritarLancamento (int idLancamento)
        {
            //id user:
            int idUser = Convert.ToInt32(HttpContext.User.Claims.First(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
            try
            {
                lancamentoInterface.Favoritar(idUser, idLancamento);
                return Ok();
            }
            catch (Exception exe)
            {
                return BadRequest(new { mensagem = "Erro eminente ao Favoritar, possa ser que você já tenha favoritado ou o lancamento não existe, por favor atualize a página >:" + exe.Message });
            }

        }


    }
}