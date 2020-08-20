using Common.Models.Airline;
using DatabaseLayer.DataAccess;
using DatabaseLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Text;

namespace DatabaseLayer.Implementations
{
    public class AirlineDatabase : IAirlineDatabase
    {
        
        public List<Airline> Get()
        {
            List<Airline> airlines = new List<Airline>();
            List<Flight> flights = new List<Flight>();
            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                airlines = context.Airline.Include(airline => airline.AvailableFlightLuggage).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.Tickets).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.FlightOrders).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.Seats).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.ToDestination).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.FromDestination).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.Airline).
                    Include(airline => airline.AvailableFlightLuggage).ThenInclude(afl => afl.FlightLuggage).
                    Include(airline => airline.AirlineDestinations).ThenInclude(ad => ad.Destination).ToList();
                
            }

            

            return airlines;
        }

        public List<Airline> SearchWithDestination(SearchObject searchObject)
        {
            List<Airline> retVal = new List<Airline>();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                retVal = context.Airline.Include(airline => airline.AvailableFlightLuggage).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.Tickets).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.FlightOrders).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.Seats).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.ToDestination).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.FromDestination).
                    Include(airline => airline.AirlineDestinations).ThenInclude(ad => ad.Destination)
                    .Where(dbAirline => dbAirline.Flights.Any(flight => flight.ToDestination.DestinationId == searchObject.Destination.DestinationId 
                    && flight.ArrivalDate == searchObject.ArrivalDate.Date
                    && flight.DepartureDate == searchObject.DepartureDate.Date
                    && flight.Tickets.Any(ticket => ticket.Price >= searchObject.PriceRange[0]
                    || ticket.Price <= searchObject.PriceRange[1]))).ToList();


            }

            return retVal;
        }

        public List<Airline> Search(SearchObject searchObject)
        {
            List<Airline> retVal = new List<Airline>();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                retVal = context.Airline.Include(airline => airline.AvailableFlightLuggage).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.Tickets).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.FlightOrders).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.Seats).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.ToDestination).
                    Include(airline => airline.Flights).ThenInclude(flight => flight.FromDestination).
                    Include(airline => airline.AirlineDestinations).ThenInclude(ad => ad.Destination)
                    .Where(dbAirline => dbAirline.Flights.Any(flight => flight.ArrivalDate == searchObject.ArrivalDate.Date 
                    && flight.DepartureDate == searchObject.DepartureDate.Date 
                    && flight.Tickets.Any(ticket => ticket.Price >= searchObject.PriceRange[0] 
                    || ticket.Price <= searchObject.PriceRange[1]))).ToList();


            }

            return retVal;

        }
        public List<Airline> Filter(List<Airline> airlines)
        {
            List<Airline> retVal = new List<Airline>();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                foreach (var airline in airlines)
                {

                    retVal = retVal.Concat(context.Airline.Include(dbAirline => dbAirline.Flights).ThenInclude(dbFlight => dbFlight.Seats)
                    .Include(dbAirline => dbAirline.Flights).ThenInclude(dbFlight => dbFlight.Tickets)
                    .Include(dbAirline => dbAirline.Flights).ThenInclude(dbFlight => dbFlight.FlightOrders)
                    .Include(dbAirline => dbAirline.Flights).ThenInclude(dbFlight => dbFlight.FromDestination)
                    .Include(dbAirline => dbAirline.Flights).ThenInclude(dbFlight => dbFlight.ToDestination)
                    .Where(dbAirline => dbAirline.AirlineId == airline.AirlineId).ToList()).ToList();
                  
                }
            }
            return retVal;

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
                airline = context.Airline.Include(theAirline => theAirline.AvailableFlightLuggage)
                    .Include(theAirline => theAirline.Flights).ThenInclude(flight => flight.ToDestination)
                    .Include(theAirline => theAirline.Flights).ThenInclude(flight => flight.FromDestination)
                    .Include(theAirline => theAirline.Flights).ThenInclude(flight => flight.Tickets)
                    .Include(theAirline => theAirline.Flights).ThenInclude(flight => flight.Seats).Include(theAirline => theAirline.AirlineDestinations)
                    .Where(theAirline => theAirline.AirlineId == id).SingleOrDefault();
                
            }

            return airline;
        }

        public bool EditAirline(Airline airline)
        {
           

            int rowsEffected = -1;
            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                

                Airline airlineFromDB = context.Airline.Include(theAirline => theAirline.AvailableFlightLuggage)
                    .Include(theAirline => theAirline.Flights).ThenInclude(flight => flight.ToDestination)
                    .Include(theAirline => theAirline.Flights).ThenInclude(flight => flight.FromDestination)
                    .Include(theAirline => theAirline.Flights).ThenInclude(flight => flight.Tickets)
                    .Include(theAirline => theAirline.Flights).ThenInclude(flight => flight.Seats)
                    .Include(theAirline => theAirline.AirlineDestinations)
                    .Where(theAirline => theAirline.AirlineId == airline.AirlineId).SingleOrDefault();

                if (airlineFromDB != null)
                {
                   context.Entry(airlineFromDB).CurrentValues.SetValues(airline);
                   context.Update(airlineFromDB);
                }


                rowsEffected = context.SaveChanges();
            }

            if (rowsEffected > 0)
                return true;

            return false;
        }

        public bool AddAirlineFlightLuggage(AirlineFlightLuggage airlineFlightLuggage)
        {
            int rowsEffected = -1;

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                context.Add(airlineFlightLuggage);
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

        public bool AddDestination(Destination destination)
        {
            int rowsEffected = -1;

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                context.Add(destination);
                rowsEffected = context.SaveChanges();

            }

            if (rowsEffected > 0)
                return true;

            return false;
        }

        public List<Destination> GetDestinations()
        {
            List<Destination> destinations = new List<Destination>();

            using(var context = new DataContext(DataContext.ops.dbOptions))
            {
                destinations = context.Destination.ToList();

            }

            return destinations;
        }

        
        public bool AddFlight(Flight flight)
        {
            int rowsEffected = 0;

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                context.Update(flight.Airline);
                context.Update(flight.ToDestination);
                context.Update(flight.FromDestination);
                context.Add(flight);
                rowsEffected = context.SaveChanges();
            }

            return rowsEffected > 0 ? true : false;
        }
    }


}
