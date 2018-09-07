using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChessCompetitionApi.Data;
using Microsoft.AspNetCore.Authorization;

namespace ChessCompetitionApi.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    [ApiController]
    public class RoundController : ControllerBase
    {
        private readonly CompetitionDbContext _context;

        public RoundController(CompetitionDbContext context)
        {
            _context = context;
        }

        // GET: api/Round
        [HttpGet("competition/{competitionId}")]
        public IEnumerable<Round> GetRounds(int competitionId)
        {
            return _context.Rounds.Where(x => x.CompetitionId == competitionId);
        }

        // PUT: api/Round/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRound([FromRoute] int id, [FromBody] Round round)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != round.Id)
            {
                return BadRequest();
            }

            _context.Entry(round).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoundExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(round);
        }

        // POST: api/Round
        [HttpPost]
        public async Task<IActionResult> PostRound([FromBody] Round round)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Rounds.Add(round);
            await _context.SaveChangesAsync();

            return Ok(round);
        }

        // DELETE: api/Round/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRound([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var round = await _context.Rounds.FindAsync(id);
            if (round == null)
            {
                return NotFound();
            }

            _context.Rounds.Remove(round);
            await _context.SaveChangesAsync();

            return Ok(round);
        }

        private bool RoundExists(int id)
        {
            return _context.Rounds.Any(e => e.Id == id);
        }
    }
}