using Common.Models.Airline;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Common.Models.Car
{
    public class Station
    {

        public int StationId { get; set; }

        
        public Destination Location { get; set; }

        public RentACarService RentACarService { get; set; }
    }
}
