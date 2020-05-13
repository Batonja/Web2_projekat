using Common.Models.Airline;
using DatabaseLayer.DataAccess;
using DatabaseLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DatabaseLayer.Implementations
{
    public class AirlineDatabase : IAirlineDatabase
    {
        
        public List<Airline> Get()
        {
            List<Airline> airlines = new List<Airline>();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                airlines = context.Airline.Include(airline => airline.AvailableFlightLuggage).Include(airline => airline.Flights).Include(airline => airline.Destinations).ToList();

            }
            return airlines;
        }

        public bool AddAirline(Airline airline)
        {

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
               
                context.Add(airline);
                int effectedRows = context.SaveChanges();

                if (effectedRows > 0)
                    return true;
            }

            return false;
        }
    }


}
