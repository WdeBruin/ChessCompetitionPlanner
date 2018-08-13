namespace ChessCompetitionApi.Data
{
    public class Competition: BaseEntity
    {
        public string Name { get; set; }
        public int RoundCount { get; set; }
    }
}
