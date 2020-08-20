using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Common.Models.Airline
{
    [NotMapped]
    public class FilterObject
    {

        public List<Airline> Airlines { get; set; }
        public decimal TripLengthOption { get; set; }
    }
}
