using System.ComponentModel.DataAnnotations;

namespace DatingAPI.Models
{
    public class UserRegisterModel
    {
        [Required]
        public string UserName {get;set;}
        [Required]
        public string Password {get;set;}
    }
}