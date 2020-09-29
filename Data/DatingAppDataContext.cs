using DatingAPP.Entities;
using Microsoft.EntityFrameworkCore;

namespace DatingAPP.Data
{
    public class DatingAppDataContext : DbContext
    {
        public DatingAppDataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<APPUser> Users{get;set;}
    }
}
