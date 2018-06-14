using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessCompetitionApi.Data
{
    public class Competition: BaseEntity
    {
        public string Name { get; set; }
        public int RoundCount { get; set; }
    }
}
