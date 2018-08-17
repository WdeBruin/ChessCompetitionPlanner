using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChessCompetitionApi.Data;

namespace ChessCompetitionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly CompetitionDbContext _context;

        public GameController(CompetitionDbContext context)
        {
            _context = context;
        }

        // GET: api/Game
        [HttpGet("{competitionId}/{roundNumber}")]
        public IEnumerable<Game> GetGames(int competitionId, int roundNumber)
        {
            return _context.Games.Where(x => x.RoundNumber == roundNumber && x.CompetitionId == competitionId);
        }

        // PUT: api/Game/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame([FromRoute] int id, [FromBody] Game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != game.Id)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(game);
        }

        // POST: api/Game
        [HttpPost]
        public async Task<IActionResult> PostGame([FromBody] Game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return Ok(game);
        }

        // DELETE: api/Game/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var game = await _context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return Ok(game);
        }

        private bool GameExists(int id)
        {
            return _context.Games.Any(e => e.Id == id);
        }
    }
}