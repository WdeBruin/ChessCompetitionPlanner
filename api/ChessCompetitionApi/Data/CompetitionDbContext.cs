﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessCompetitionApi.Data
{
    public class CompetitionDbContext : DbContext
    {
        public CompetitionDbContext(DbContextOptions<CompetitionDbContext> options) : base(options)
        { }

        public DbSet<Player> Players { get; set; }
        public DbSet<Competition> Competitions { get; set; }
        public DbSet<Round> Rounds { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Standing> Standings { get; set; }
        public DbSet<StandingLine> StandingLines { get; set; }
    }
}
