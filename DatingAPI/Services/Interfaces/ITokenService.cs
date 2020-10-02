using DatingAPP.Entities;

namespace DatingAPI.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(APPUser user);
    }
}