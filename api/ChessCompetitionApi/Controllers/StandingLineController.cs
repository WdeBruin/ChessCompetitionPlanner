﻿using ChessCompetitionApi.Data;
using ChessCompetitionApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessCompetitionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StandingLineController : ControllerBase
    {
        private readonly CompetitionDbContext _context;

        public StandingLineController(CompetitionDbContext context)
        {
            _context = context;
        }

        // Expose competition standing list, specific roundnumber
        [HttpGet("{competitionId}/{roundnumber}")]
        public IEnumerable<Standing> GetStanding(int competitionId, int roundnumber)
        {
            var lines = _context.StandingLines.Where(x => x.CompetitionId == competitionId && x.RoundNumber == roundnumber);
            var players = _context.Players;

            var standings = new List<Standing>();
            foreach (var line in lines)
            {
                var player = players.FirstOrDefault(x => x.Id == line.PlayerId);

                if (!player.Disabled)
                {
                    standings.Add(new Standing
                    {
                        Round = line.RoundNumber,
                        PlayerName = $"{player.FirstName} {player.LastName}",
                        CompetitionPoints = Convert.ToInt32(line.CompetitionPoints)
                    });
                }
            }

            return standings.OrderByDescending(x => x.CompetitionPoints);
        }

        // Expose competition standing list, last round
        [HttpGet("{competitionId}")]
        public IEnumerable<Standing> GetStanding(int competitionId)
        {
            var roundnumber = _context.Rounds.Where(x => x.CompetitionId == competitionId).Max(x => x.RoundNumber);
            return GetStanding(competitionId, roundnumber);
        }

        [HttpGet("winloss/{competitionId}/{roundnumber}")]
        public IEnumerable<WinLossLine> GetEloWinLoss(int competitionId, int roundnumber)
        {
            var winLossLines = new List<WinLossLine>();
            var players = _context.Players.Where(x => !x.Disabled);

            foreach (var player in players)
            {
                // get the win/loss for each player
                double winLoss = 0;
                var relevantGames = _context.Games.Where(x => x.CompetitionId == competitionId && x.RoundNumber <= roundnumber
                    && (x.WhitePlayerId == player.Id || x.BlackPlayerId == player.Id));

                foreach (var game in relevantGames)
                {
                    if (player.Id == game.WhitePlayerId)
                    {
                        switch (game.Result)
                        {
                            case 1:
                                winLoss += game.WhiteWinEloChange;
                                break;
                            case 0.5:
                                winLoss += game.WhiteDrawEloChange;
                                break;
                            case 0:
                                winLoss += game.WhiteLossEloChange;
                                break;
                        }
                    }
                    else if (player.Id == game.BlackPlayerId)
                    {
                        switch (game.Result)
                        {
                            case 1:
                                winLoss += game.BlackLossEloChange;
                                break;
                            case 0.5:
                                winLoss += game.BlackDrawEloChange;
                                break;
                            case 0:
                                winLoss += game.BlackWinEloChange;
                                break;
                        }
                    }
                }

                // Add the total to the resulting list
                winLossLines.Add(new WinLossLine { PlayerName = $"{player.FirstName} {player.LastName}", EloChange = Math.Round(winLoss, 1) });
            }

            return winLossLines.OrderByDescending(x => x.EloChange);
        }

        // Expose competition elo change list
        [HttpGet("winloss/{competitionId}")]
        public IEnumerable<WinLossLine> GetEloWinLoss(int competitionId)
        {
            var roundnumber = _context.Rounds.Where(x => x.CompetitionId == competitionId).Max(x => x.RoundNumber);
            return GetEloWinLoss(competitionId, roundnumber);
        }

        [Authorize(Policy = "ApiUser")]
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
        [Authorize(Policy = "ApiUser")]
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
        [Authorize(Policy = "ApiUser")]
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