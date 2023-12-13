using Microsoft.EntityFrameworkCore;
using SampleBackendApi.Entities;

namespace SampleBackendApi
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> dbContextOptions): base(dbContextOptions)
        {
            
        }

        public DbSet<State> States { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<County> Counties { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<ServiceRate> ServiceRates { get; set; }
    }
}
