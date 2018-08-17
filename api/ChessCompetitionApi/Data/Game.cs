namespace ChessCompetitionApi.Data
{
    public class Game: BaseEntity
    {
        public int RoundNumber { get; set; }
        public int CompetitionId { get; set; }

        public int WhitePlayerId { get; set; }
        public int BlackPlayerId { get; set; }

        public double? Result { get; set; } // 0, 0.5, 1 like in chess

        public double WhiteWinEloChange { get; set; }
        public double WhiteDrawEloChange { get; set; }
        public double WhiteLossEloChange { get; set; }
        public double BlackWinEloChange { get; set; }
        public double BlackDrawEloChange { get; set; }
        public double BlackLossEloChange { get; set; }

        public double WhiteWinCpChange { get; set; }
        public double WhiteDrawCpChange { get; set; }
        public double WhiteLossCpChange { get; set; }
        public double BlackWinCpChange { get; set; }
        public double BlackDrawCpChange { get; set; }
        public double BlackLossCpChange { get; set; }
    }
}
