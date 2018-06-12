using System.ComponentModel.DataAnnotations;

namespace ChessCompetitionApi.Data
{
    public class Player : BaseEntity
    {
        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string LastName { get; set; }        
        public int ClubElo { get; set; }
    }
}