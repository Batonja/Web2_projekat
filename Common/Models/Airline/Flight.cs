using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Common.Models.Airline
{
    public class Flight
    {
        public int FlightId { get; set; }
        [Required]
        public Destination ToDestionation { get; set; }
        
        public Destination FromDestination { get; set; }
        [Required]
        public DateTime DepartureDate { get; set; }
        [Required]
        public DateTime ArrivalDate { get; set; }

        [Column(TypeName ="decimal(3,2)")]
        public decimal TripLength { get; set; }
        public double Price { get; set; }
        public int NumOfChangeovers { get; set; }

        
        public Airline Airline { get; set; }

        public ICollection<FlightOrder> FlightOrders { get; set; }
        public ICollection<Seat> Seats { get; set; }

    }
}
