using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DatingAPI.Models;
using DatingAPI.Services.Interfaces;
using DatingAPP.Data;
using DatingAPP.Entities;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingAPP.DatingAPI.Controllers
{
    public class AccountController: BaseAPIController
    {
        private readonly DatingAppDataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DatingAppDataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> Register(UserRegisterModel UserRegisterModel)
        {
            APPUser APPUser;
            if(await CheckIfUserExists(UserRegisterModel.UserName)) return BadRequest("User already exists");

            using var hmac = new HMACSHA512();
            
            APPUser = new APPUser(){
                UserName = UserRegisterModel.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(UserRegisterModel.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(APPUser);
            await _context.SaveChangesAsync();
            
            return new UserModel
            {
                UserName = APPUser.UserName,
                UserToken = _tokenService.CreateToken(APPUser)
            };          
           
        }

        public async Task<bool> CheckIfUserExists(string UserName)
        {   
            return await _context.Users.AnyAsync(u => u.UserName == UserName.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> Login(UserRegisterModel UserRegisterModel)
        {
            APPUser APPUser = await _context.Users.SingleOrDefaultAsync(u => u.UserName == UserRegisterModel.UserName.ToLower());
            if(APPUser == null) return Unauthorized("Invalid User name");

            using var hmac = new HMACSHA512(APPUser.PasswordSalt);
            
            var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(UserRegisterModel.Password));
            for(int i = 0; i<passwordHash.Length; i++)
            {
                if(passwordHash[i] != APPUser.PasswordHash[i]) return Unauthorized("Invalid Username or Password");
            }           
           
            return new UserModel
            {
                UserName = APPUser.UserName,
                UserToken = _tokenService.CreateToken(APPUser)
            };
        }
    }
}