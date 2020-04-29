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
        public DataContext(DbContextOptions<DataContext> options): base(options) { }


        public DbSet<BranchOffice> BranchOffice { get; set; }
        public DbSet<CarOrder> CarOrder { get; set; }
        public DbSet<Grade> Grade { get; set; }
        public DbSet<RentACarLocation> RentACarLocation { get; set; }
        public DbSet<RentACarService> RentACarService { get; set; }
        public DbSet<Station> Station { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }

        public DbSet<Airline> Airline { get; set; }
        public DbSet<Destination> Destination { get; set; }
        public DbSet<Flight> Flight { get; set; }
        public DbSet<FlightLuggage> FlightLuggage { get; set; }
        public DbSet<FlightOrder> FlightOrder { get; set; }
        public DbSet<Seat> Seat { get; set; }

        public DbSet<User> User { get; set; }
    }
}
