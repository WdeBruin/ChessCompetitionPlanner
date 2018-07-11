﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessCompetitionApi.Data
{
    public class Round: BaseEntity
    {
        public int CompetitionId { get; set; }
        public int RoundNumber { get; set; }

        public string PlayersInRoundIds { get; set; }
        public int PlayerVrijgeloot { get; set; }        
    }
}