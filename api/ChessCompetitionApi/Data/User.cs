using Microsoft.AspNetCore.Identity;

namespace ChessCompetitionApi.Data
{
    public class User: IdentityUser
    {
        public bool Admin { get; set; }
    }
}
