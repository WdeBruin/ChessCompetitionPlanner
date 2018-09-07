using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessCompetitionApi.Helpers
{
        public static class Constants
        {
            public static class Strings
            {
                public static class JwtClaimIdentifiers
                {
                    public const string Rol = "rol", Id = "id";
                }

                public static class JwtClaims
                {
                    public const string ApiAccess = "api_access";
                }

                public const string SecretKey = "KMOi7DzdK0Ex8tsK8PxGQkhu5k7vDf5B";
        }
    }    
}
