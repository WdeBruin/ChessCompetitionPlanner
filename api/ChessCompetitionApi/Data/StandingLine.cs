namespace ChessCompetitionApi.Data
{
    public class StandingLine: BaseEntity
    {
        public int CompetitionId { get; set; }
        public int RoundNumber { get; set; }

        public int Position { get; set; }
        public int PlayerId { get; set; }
        public double CompetitionPoints { get; set; }
    }
}
