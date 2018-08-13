namespace ChessCompetitionApi.Data
{
    public class Standing: BaseEntity
    {
        public int CompetitionId { get; set; }
        public int RoundNumber { get; set; }
    }
}
