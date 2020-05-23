using BusinessLayer.Interfaces;
using Common.ErrorObjects;
using Common.Models.Airline;
using DatabaseLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Implementations
{
    public class AirlineBusiness : IAirlineBusiness
    {
        IAirlineDatabase _airlineDatabase;

        public AirlineBusiness(IAirlineDatabase airlineDatabase)
        {
            _airlineDatabase = airlineDatabase;
        }

        public Holder<Airline> AddAirline(Airline airline)
        {
            Airline airlineFromDB = _airlineDatabase.Get(airline.AirlineId);

            if (airlineFromDB != null)
                return CheckAirline(airline, 404, "Airline you're trying to add already exists");
           

            if (_airlineDatabase.AddAirline(airline))
                return CheckAirline(airline, 200, "");

            return CheckAirline(airline, 500, "Error while trying to add airline");
        }
        
        public Holder<Airline> DeleteAirline(int airlineId)
        {
            Airline airlineFromDb = _airlineDatabase.Get(airlineId);

            if (airlineFromDb.AirlineId <= 0)
                return CheckAirline(new Airline(), 404, "Airline you'retrying to delete doesn't exists");

            if (_airlineDatabase.DeleteAirline(airlineId)) 
                return CheckAirline(new Airline(), 200, "");

            return CheckAirline(new Airline(), 400, "Unable to delete airline");
        }

        public Holder<Airline> EditAirline(Airline airline)
        {
            Airline airlineFromDB = _airlineDatabase.Get(airline.AirlineId);

            if (airlineFromDB.AirlineId <= 0)
                return CheckAirline(airline, 404, "Airline you're trying to edit doesn't exists");

            if (_airlineDatabase.EditAirline(airline))
                return CheckAirline(airline, 200, "");

            return CheckAirline(airline, 500, "Unable to edit airline");

        }

        public List<Airline> Get()
        {
            List<Airline> retVal = _airlineDatabase.Get();

            return retVal;
        }

        public Airline Get(int id)
        {
            return _airlineDatabase.Get(id);
        }

        public List<FlightLuggage> GetFlightLuggage()
        {
            return _airlineDatabase.GetFlightLuggage();
        }

        public Holder<FlightLuggage> AddFlightLuggage(FlightLuggage flightLuggage)
        {
            List<FlightLuggage> flightLuggageList = _airlineDatabase.GetFlightLuggage();

            if (flightLuggage.FlightLuggageType.GetType() == typeof(DBNull))
                return CheckFlightLuggage(flightLuggage, 400, "Flight luggage must have type");

            foreach (FlightLuggage luggageInstance in flightLuggageList)
            {
                if (luggageInstance.FlightLuggageType == flightLuggage.FlightLuggageType)
                    return CheckFlightLuggage(flightLuggage, 403, "Flight luggage with this type already exists");
                
            }

            if (_airlineDatabase.AddFlightLuggage(flightLuggage))
                return CheckFlightLuggage(flightLuggage, 200, "");

            return CheckFlightLuggage(flightLuggage, 500, "Unable to add flight luggage");
            
        }

        public FlightLuggage GetFlightLuggage(int id)
        {
            return _airlineDatabase.GetFlightLuggage(id);
        }


        public Holder<Destination> AddDestination(Destination destination)
        {
            List<Destination> destinationsFromDB = _airlineDatabase.GetDestinations();

            foreach (var destinationFromDB in destinationsFromDB)
            {
                if (destinationFromDB.Title == destination.Title)
                    return CheckDestination(destination, 400, "This destination already exists in database");
            }

            if (_airlineDatabase.AddDestination(destination))
                return CheckDestination(destination, 200, "");

            return CheckDestination(destination, 500, "Error while trying to add destination");
        }

        public List<Destination> GetDestinations()
        {
            return _airlineDatabase.GetDestinations();
        }


        public Holder<Flight> AddFlight(Flight flight)
        {
            if (flight.FlightId < 0)
                flight.FlightId = 0;

            return _airlineDatabase.AddFlight(flight) ? CheckFlight(flight, 200, "") : CheckFlight(flight, 500, "Flight cannot be added");
        }

        #region helpers

        Holder<Airline> CheckAirline(Airline airline, int errorCode, string description) =>
            errorCode == 200 ? Holder<Airline>.Success(airline) : Holder<Airline>.Fail(errorCode, description);

        Holder<FlightLuggage> CheckFlightLuggage(FlightLuggage flightLuggage, int errorCode, string description) =>
            errorCode == 200 ? Holder<FlightLuggage>.Success(flightLuggage) : Holder<FlightLuggage>.Fail(errorCode, description);

        Holder<Destination> CheckDestination(Destination destination, int errorCode, string description) =>
            errorCode == 200 ? Holder<Destination>.Success(destination) : Holder<Destination>.Fail(errorCode, description);

        Holder<Flight> CheckFlight(Flight flight, int errorCode, string description) =>
            errorCode == 200 ? Holder<Flight>.Success(flight) : Holder<Flight>.Fail(errorCode, description);


        #endregion
    }
}
