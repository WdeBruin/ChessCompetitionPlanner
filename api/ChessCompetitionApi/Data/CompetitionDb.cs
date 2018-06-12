using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessCompetitionApi.Data
{
    public class CompetitionDb : DbContext
    {
        public CompetitionDb(DbContextOptions<CompetitionDb> options): base(options)
        { }

        public DbSet<Player> Players { get; set; }
    }
}
