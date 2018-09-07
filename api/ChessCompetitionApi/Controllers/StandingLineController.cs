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
    public class StandingLineController : ControllerBase
    {
        private readonly CompetitionDbContext _context;

        public StandingLineController(CompetitionDbContext context)
        {
            _context = context;
        }

        // GET: api/StandingLine
        [HttpGet("standing/{competitionId}/{roundNumber}")]
        public IEnumerable<StandingLine> GetStandingLines(int competitionId, int roundNumber)
        {
            return _context.StandingLines.Where(x => x.CompetitionId == competitionId && x.RoundNumber == roundNumber);
        }

        // PUT: api/StandingLine/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStandingLine([FromRoute] int id, [FromBody] StandingLine standingLine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != standingLine.Id)
            {
                return BadRequest();
            }

            _context.Entry(standingLine).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StandingLineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(standingLine);
        }

        // POST: api/StandingLine
        [HttpPost]
        public async Task<IActionResult> PostStandingLine([FromBody] StandingLine standingLine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.StandingLines.Add(standingLine);
            await _context.SaveChangesAsync();

            return Ok(standingLine);
        }

        // DELETE: api/StandingLine/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStandingLine([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var standingLine = await _context.StandingLines.FindAsync(id);
            if (standingLine == null)
            {
                return NotFound();
            }

            _context.StandingLines.Remove(standingLine);
            await _context.SaveChangesAsync();

            return Ok(standingLine);
        }

        private bool StandingLineExists(int id)
        {
            return _context.StandingLines.Any(e => e.Id == id);
        }
    }
}