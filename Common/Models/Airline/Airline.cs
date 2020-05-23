using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Common.Models.Airline
{
    public class Airline
    {

        
        public int AirlineId { get; set; }
        
        public User Administrator { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(100)]
        public string Address { get; set; }

        [MaxLength(100)]
        public string Description { get; set; }

        public virtual ICollection<AirlineFlightLuggage> AvailableFlightLuggage { get; set; }
        public virtual ICollection<Flight> Flights { get; set; }
        public virtual ICollection<AirlineDestination> AirlineDestinations { get; set; }

    }
}
