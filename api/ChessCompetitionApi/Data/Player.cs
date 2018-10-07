using System.ComponentModel.DataAnnotations;

namespace ChessCompetitionApi.Data
{
    public class Player : BaseEntity
    {
        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string LastName { get; set; }        
        public double ClubElo { get; set; }
        public bool Disabled { get; set; }
    }
}