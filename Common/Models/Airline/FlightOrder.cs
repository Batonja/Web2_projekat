using Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Common.Models.Airline
{
    public class FlightOrder
    {
        public int FlightOrderId { get; set; }
        
        public Flight Flight { get; set; }
        [Required]
        public FlightTicket FlightTicket { get; set; }
        [Required]
        public Seat Seat { get; set; }
        
        public FlightLuggage FlightLuggage { get; set; }

        public User User { get; set; }

    }
}
