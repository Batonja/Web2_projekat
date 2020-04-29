using Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Common.Models.Airline
{
    public class Seat
    {
        public int SeatId { get; set; }

        [Required]
        public int SeatNumber { get; set; }
        
        public SeatState SeatState{ get;set;}

        
        public Flight Flight { get; set; }
    }
}
