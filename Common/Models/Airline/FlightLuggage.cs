using Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Common.Models.Airline
{
    public class FlightLuggage
    {
        public int FlightLuggageId { get; set; }
        
        public FlightLuggageType FlightLuggageType { get; set; }
        [Required]
        [Column(TypeName ="decimal(4,4)")]
        public decimal Price { get; set; }

    }
}
