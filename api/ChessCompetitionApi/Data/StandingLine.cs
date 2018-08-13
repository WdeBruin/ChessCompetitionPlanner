namespace ChessCompetitionApi.Data
{
    public class StandingLine: BaseEntity
    {
        public int StandingId { get; set; }
        public int Position { get; set; }
        public int PlayerId { get; set; }
        public int CompetitionPoints { get; set; }
    }
}
