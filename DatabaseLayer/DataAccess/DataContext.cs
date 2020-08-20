using Common.Models;
using Common.Models.Airline;
using Common.Models.Car;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseLayer.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options): base(options) { }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
            base.OnConfiguring(optionsBuilder);
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<AirlineDestination>().HasKey(ad => new { ad.AirlineId, ad.DestinationId });
            modelBuilder.Entity<AirlineFlightLuggage>().HasKey(afl => new { afl.AirlineId, afl.FlightLuggageId });
            modelBuilder.Entity<User>().HasMany(u => u.FriendsOf).WithOne(fr => fr.FriendOf).HasForeignKey(fr => fr.FriendOfId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Friend>().HasKey(fr => new { fr.FriendOfId, fr.FriendWithId });
            modelBuilder.Entity<User>().HasMany(u => u.FriendsWith).WithOne(fr => fr.FriendWith).HasForeignKey(fr => fr.FriendWithId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Airline>().HasMany(airline => airline.AvailableFlightLuggage).WithOne(afl => afl.Airline).HasForeignKey(afl => afl.AirlineId);
            modelBuilder.Ignore<FilterObject>();
            




            modelBuilder.Ignore<AppSettings>();
        }


        public class OptionsBuild
        {
            public OptionsBuild()
            {
                settings = new AppConfiguration();
                optionsBuilder = new DbContextOptionsBuilder<DataContext>();
                optionsBuilder.UseSqlServer(settings.sqlConnectionString);
                dbOptions = optionsBuilder.Options;
            }

            public DbContextOptionsBuilder optionsBuilder { get; set; }
            public DbContextOptions dbOptions { get; set; }
            private AppConfiguration settings { get; set; }
        }

        public static OptionsBuild ops = new OptionsBuild();


        public DbSet<BranchOffice> BranchOffice { get; set; }
        public DbSet<CarOrder> CarOrder { get; set; }
        public DbSet<Grade> Grade { get; set; }
        public DbSet<RentACarLocation> RentACarLocation { get; set; }
        public DbSet<RentACarService> RentACarService { get; set; }
        public DbSet<Station> Station { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<AirlineFlightLuggage> AirlineFlightLuggage { get; set; }
        public DbSet<AirlineDestination> AirlineDestination { get; set; }
        public DbSet<Airline> Airline { get; set; }
        public DbSet<Destination> Destination { get; set; }
        public DbSet<Flight> Flight { get; set; }
        public DbSet<FlightLuggage> FlightLuggage { get; set; }
       
        public DbSet<FlightOrder> FlightOrder { get; set; }
        public DbSet<Seat> Seat { get; set; }

        public DbSet<User> User { get; set; }
    }
}
