using Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Common.Models.Airline
{
    public class FlightTicket
    {
        public int FlightTicketId { get; set; }
        
        public FlightTicketType Type { get; set; }
        [Column(TypeName = "decimal(8,4)")]
        [Required]
        public decimal Price { get; set; }
        

    }
}
