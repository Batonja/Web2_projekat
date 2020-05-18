using Common.Models.Airline;
using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseLayer.Interfaces
{
    public interface IAirlineDatabase
    {
        List<Airline> Get();
        Airline Get(int id);

        bool EditAirline(Airline airline);
        bool AddAirline(Airline airline);
        bool DeleteAirline(int airlineId);
        bool AddDestination(Destination destination);
        bool AddFlightLuggage(FlightLuggage flightLuggage);

        List<FlightLuggage> GetFlightLuggage();
        List<Destination> GetDestinations();
        FlightLuggage GetFlightLuggage(int id);
    }
}
