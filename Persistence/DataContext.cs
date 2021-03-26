using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext()
        {
            
        }
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Vehicle> Vehicles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=doomtravel.db");
        }
          protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
 
            //UserVehicleRenting Meny to many relationship configuration
            builder.Entity<UserVehicleRenting>(x => x.HasKey(uv =>
            new { uv.AppUserId, uv.VehicleId }));

            builder.Entity<UserVehicleRenting>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.UserVehicleRentings)
            .HasForeignKey(u => u.AppUserId);


            builder.Entity<UserVehicleRenting>()
            .HasOne(a => a.Vehicle)
            .WithMany(u => u.UserVehicleRentings)
            .HasForeignKey(a => a.VehicleId);
        }
    }
}