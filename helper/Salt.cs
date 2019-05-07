using System;
using System.Text;

namespace Auth_Angular_Core.helper
{
    public class Salt
    {
        private static readonly byte[] salt = Encoding.Unicode.GetBytes("7BANANAS");
        public static string Create()
        {
            return Convert.ToBase64String(salt);
        }
    }
}