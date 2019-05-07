using System.ComponentModel.DataAnnotations;

namespace Auth_Angular_Core.models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter your email address")]  
        [MaxLength(50)]  
        [RegularExpression(@"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}", ErrorMessage = "Please enter correct email")]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}