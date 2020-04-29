using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Common.Models.Car
{
    public class RentACarLocation
    {
        public int RentACarLocationId { get; set; }

        [Required]
        [MaxLength(200)]
        public string State { get; set; }

        [Required]
        [MaxLength(200)]
        public string City { get; set; }
    }
}
