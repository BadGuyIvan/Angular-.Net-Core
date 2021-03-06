using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Auth_Angular_Core.helper
{
    public class AuthOptions
    {
        public const string ISSUER = "http://localhost:5001";
        public const string AUDIENCE = "http://localhost:5001";
        const string KEY = "mysupersecret_secretkey!123";
        public const int LIFETIME = 60;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}