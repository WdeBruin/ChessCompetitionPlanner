using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessCompetitionApi.Models
{
    public class Standing
    {
        public string PlayerName { get; set; }
        public int CompetitionPoints { get; set; }
        public int Round { get; set; }
    }
}
