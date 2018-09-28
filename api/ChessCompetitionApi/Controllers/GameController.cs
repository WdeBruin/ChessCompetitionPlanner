using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChessCompetitionApi.Data;
using Microsoft.AspNetCore.Authorization;
using ChessCompetitionApi.Models;

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

        // Expose games for website
        [HttpGet("{competitionId}")]
        public IEnumerable<GameLastRound> GetLastRoundGames(int competitionId)
        {
            var roundnumber = _context.Rounds.Where(x => x.CompetitionId == competitionId).Max(x => x.RoundNumber);
            var games = _context.Games.Where(x => x.RoundNumber == roundnumber && x.CompetitionId == competitionId);
            var players = _context.Players;

            var lastroundgames = new List<GameLastRound>();
            foreach (var game in games)
            {
                lastroundgames.Add(new GameLastRound
                {
                    WhitePlayerName = $"{players.FirstOrDefault(x => x.Id == game.WhitePlayerId).FirstName} {players.FirstOrDefault(x => x.Id == game.WhitePlayerId).LastName}",
                    BlackPlayerName = $"{players.FirstOrDefault(x => x.Id == game.BlackPlayerId).FirstName} {players.FirstOrDefault(x => x.Id == game.BlackPlayerId).LastName}",
                    Result = game.Result == 1 ? "1-0" : game.Result == 0 ? "0-1" : "0.5-0.5",

                    WhiteCpWin = Math.Round(game.WhiteWinCpChange, 1),
                    WhiteCpDraw = Math.Round(game.WhiteDrawCpChange, 1),
                    WhiteCpLoss = Math.Round(game.WhiteLossCpChange, 1),
                    BlackCpWin = Math.Round(game.BlackWinCpChange, 1),
                    BlackCpDraw = Math.Round(game.BlackDrawCpChange, 1),
                    BlackCpLoss = Math.Round(game.BlackLossCpChange, 1)
                });
            }

            return lastroundgames;
        }

        // GET: api/Game
        [Authorize(Policy = "ApiUser")]
        [HttpGet("all/{competitionId}")]
        public IEnumerable<Game> GetGames(int competitionId)
        {
            return _context.Games.Where(x => x.CompetitionId == competitionId);
        }

        // PUT: api/Game/5
        [Authorize(Policy = "ApiUser")]
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
        [Authorize(Policy = "ApiUser")]
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
        [Authorize(Policy = "ApiUser")]
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