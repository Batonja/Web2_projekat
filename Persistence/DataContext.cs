using System.Security.Cryptography;
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
        public DbSet<RentACarService> RentACarServices { get; set; }
        public DbSet<UserVehicleRenting> Rentings { get; set; }
        public DbSet<BranchOffice> BranchOffices { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=doomtravel.db");
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);

            //AppUser UserVehicleRenting 1:N
            builder.Entity<UserVehicleRenting>()
                .HasOne<AppUser>(r => r.AppUser)
                .WithMany(u => u.UserVehicleRentings)
                .HasForeignKey(r => r.AppUserId);
            //Vehicle UserVehicleRenting 1:N
            builder.Entity<UserVehicleRenting>()
                .HasOne<Vehicle>(r => r.Vehicle)
                .WithMany(v => v.UserVehicleRentings)
                .HasForeignKey(r => r.VehicleId);

            //One to Many RentACarService AppUser(Manager)
            builder.Entity<AppUser>()
                .HasOne<RentACarService>(u => u.RentACarService)
                .WithMany(rs => rs.Managers)
                .HasForeignKey(u => u.RentACarServiceId);
            //One to many RentACarService(Owner) Vehicle
            builder.Entity<Vehicle>()
                .HasOne<RentACarService>(v => v.RentACarServiceOwner)
                .WithMany(rs => rs.Vehicles)
                .HasForeignKey(v => v.RentACarServiceOwnerId);
            //One to many RentACarService(Owner) BranchOffice
            builder.Entity<BranchOffice>()
                .HasOne<RentACarService>(v => v.RentACarServiceOwner)
                .WithMany(rs => rs.BranchOffices)
                .HasForeignKey(v => v.RentACarServiceOwnerId);

            //BranchOffice  -> AppUserRenting 1:N - PICKUP
            builder.Entity<UserVehicleRenting>()
                .HasOne<BranchOffice>(b => b.PickupPlace)
                .WithMany(r => r.PickUpRentings)
                .HasForeignKey(b => b.PickupPlaceId);

            //BranchOffice  -> AppUserRenting 1:N - RETURN
            builder.Entity<UserVehicleRenting>()
                .HasOne<BranchOffice>(b => b.ReturnPlace)
                .WithMany(r => r.ReturningRentings)
                .HasForeignKey(b => b.ReturnPlaceId);
        }
    }
}