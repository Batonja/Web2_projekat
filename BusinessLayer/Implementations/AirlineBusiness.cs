using BusinessLayer.Interfaces;
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

        public bool AddAirline(Airline airline)
        {
            return _airlineDatabase.AddAirline(airline);
        }

        public List<Airline> Get()
        {
            return _airlineDatabase.Get();
        }
    }
}
