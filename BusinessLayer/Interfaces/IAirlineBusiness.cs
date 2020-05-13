using Common.Models.Airline;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Interfaces
{
    public interface IAirlineBusiness
    {

        List<Airline> Get();
        bool AddAirline(Airline airline);

    }
}
