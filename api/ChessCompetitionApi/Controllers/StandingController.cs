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
    public class StandingController : ControllerBase
    {
        private readonly CompetitionDbContext _context;

        public StandingController(CompetitionDbContext context)
        {
            _context = context;
        }

        // GET: api/Standing
        [HttpGet("round/{roundId}")]
        public IEnumerable<Standing> GetStandings(int roundId)
        {
            return _context.Standings.Where(x => x.RoundId == roundId);
        }

        // PUT: api/Standing/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStanding([FromRoute] int id, [FromBody] Standing standing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != standing.Id)
            {
                return BadRequest();
            }

            _context.Entry(standing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StandingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Standing
        [HttpPost]
        public async Task<IActionResult> PostStanding([FromBody] Standing standing)
        {
            await _context.SaveChangesAsync();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Standings.Add(standing);
            await _context.SaveChangesAsync();

            return Ok(standing);
        }

        // DELETE: api/Standing/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStanding([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var standing = await _context.Standings.FindAsync(id);
            if (standing == null)
            {
                return NotFound();
            }

            _context.Standings.Remove(standing);
            await _context.SaveChangesAsync();

            return Ok(standing);
        }

        private bool StandingExists(int id)
        {
            return _context.Standings.Any(e => e.Id == id);
        }
    }
}