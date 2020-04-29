using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Common.Models.Car
{
    public class CarOrder
    {
        public int CarOrderId { get; set; }

       
        public RentACarService RentACarService { get; set; }

        public User User { get; set; }

      
        public Station PickupStation { get; set; }

        public Station DropoffStation { get; set; }
        
        public Vehicle Vehicle { get; set; }

        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }

        public DateTime TomorrowFromStartDate { get; set; }

        [Column(TypeName = "decimal(4,4)")]
        public decimal OrderPrice { get; set; }

    }
}
