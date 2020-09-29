using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingAPP.Data;
using DatingAPP.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingAPP.DatingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DatingAppDataContext _context;
        public UsersController(DatingAppDataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<APPUser>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
           
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<APPUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);            
        }
    }
}