using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Pokedex.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        // GET api/pokemon
        [HttpGet]
        public async Task<ActionResult<string>> Get()
        {
            return await GetPokemon();
        }

        private async Task<string> GetPokemon()
        {
            var builder = new StringBuilder();
            builder.Append("[");

            using (var client = new HttpClient())
            {
                for (var i = 1; i < 152; i++)
                {
                    var response = await client.GetAsync($"https://pokeapi.co/api/v2/pokemon/{i}");
                    builder.Append(await response.Content.ReadAsStringAsync());
                    builder.Append(",");
                }
            }

            builder.Append("]");

            return builder.ToString();
        }

        // GET api/pokemon/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/pokemon
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/pokemon/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/pokemon/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
