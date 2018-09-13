using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessCompetitionApi.Models
{
    public class GameLastRound
    {
        public string WhitePlayerName { get; set; }
        public string BlackPlayerName { get; set; }
        public string Result { get; set; }

        public double WhiteCpWin { get; set; }
        public double WhiteCpDraw { get; set; }
        public double WhiteCpLoss{ get; set; }
        public double BlackCpWin { get; set; }
        public double BlackCpDraw { get; set; }
        public double BlackCpLoss { get; set; }


        public int CompetitionPoints { get; set; }
        public int Round { get; set; }
    }
}
