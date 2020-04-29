using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Common.Models.Airline
{
    public class Destination
    {
        public int DestinationId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }


    }
}
