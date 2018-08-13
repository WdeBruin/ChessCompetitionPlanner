namespace ChessCompetitionApi.Data
{
    public class Game: BaseEntity
    {
        public int RoundId { get; set; }
        public int CompetitionId { get; set; }

        public int WhitePlayerId { get; set; }
        public int BlackPlayerId { get; set; }

        public int Result { get; set; } // 0, 0.5, 1 like in chess

        public int WhiteWinEloChange { get; set; }
        public int WhiteDrawEloChange { get; set; }
        public int WhiteLossEloChange { get; set; }
        public int BlackWinEloChange { get; set; }
        public int BlackDrawEloChange { get; set; }
        public int BlackLossEloChange { get; set; }

        public int WhiteWinCpChange { get; set; }
        public int WhiteDrawCpChange { get; set; }
        public int WhiteLossCpChange { get; set; }
        public int BlackWinCpChange { get; set; }
        public int BlackDrawCpChange { get; set; }
        public int BlackLossCpChange { get; set; }
    }
}
