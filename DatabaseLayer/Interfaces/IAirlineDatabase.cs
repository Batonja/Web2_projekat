using Common.Models.Airline;
using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseLayer.Interfaces
{
    public interface IAirlineDatabase
    {
        List<Airline> Get();
        bool AddAirline(Airline airline);
    }
}
