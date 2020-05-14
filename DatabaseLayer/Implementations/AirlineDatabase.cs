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
                
                context.Airline.Add(airline);
                int effectedRows = context.SaveChanges();

                if (effectedRows > 0)
                    return true;
            }

            return false;
        }

        public Airline Get(int id)
        {
            Airline airline = new Airline();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                airline = context.Airline.Include(theAirline => theAirline.AvailableFlightLuggage).Include(theAirline => theAirline.Flights).Include(theAirline => theAirline.Destinations).Where(theAirline => theAirline.AirlineId == id).SingleOrDefault();
                
            }

            return airline;
        }

        public bool EditAirline(Airline airline)
        {
            int rowsEffected = -1;
            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                Airline airlineFromDB = context.Airline.Include(theAirline => theAirline.AvailableFlightLuggage).Include(theAirline => theAirline.Flights).Include(theAirline => theAirline.Destinations).Where(theAirline => theAirline.AirlineId == airline.AirlineId).SingleOrDefault();

                airlineFromDB = airline;

                rowsEffected = context.SaveChanges();
            }

            if (rowsEffected > 0)
                return true;

            return false;
        }

        public bool DeleteAirline(int airlineId)
        {
            int rowsEffected = -1;

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                Airline airlineFromDB = context.Airline.SingleOrDefault(airline => airline.AirlineId == airlineId);

                context.Airline.Remove(airlineFromDB);

                rowsEffected = context.SaveChanges();
            }

            if (rowsEffected > 0)
                return true;

            return false;
        }

        public List<FlightLuggage> GetFlightLuggage()
        {
            List<FlightLuggage> flightLuggageList = new List<FlightLuggage>();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                flightLuggageList = context.FlightLuggage.ToList();
                
            }

            return flightLuggageList;
        }

        public bool AddFlightLuggage(FlightLuggage flightLuggage)
        {
            int rowsEffected = -1;

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                context.Add(flightLuggage);
                try { 
                rowsEffected = context.SaveChanges();
                }
                catch(Exception e)
                {
                    Console.WriteLine(e.StackTrace);
                }
            }

            return rowsEffected > 0 ? true : false;
        }

        public FlightLuggage GetFlightLuggage(int id)
        {
            FlightLuggage flightLuggage = new FlightLuggage();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                flightLuggage = context.FlightLuggage.Where(theLuggage => theLuggage.FlightLuggageId == id).SingleOrDefault();
            }

            return flightLuggage;
        }
    }


}
