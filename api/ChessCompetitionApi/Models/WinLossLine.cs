using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessCompetitionApi.Models
{
    public class WinLossLine
    {
        public string PlayerName { get; set; }
        public double EloChange { get; set; }
    }
}
