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

        List<FlightLuggage> GetFlightLuggage();
        bool AddFlightLuggage(FlightLuggage flightLuggage);
        FlightLuggage GetFlightLuggage(int id);
    }
}
