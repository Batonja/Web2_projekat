using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Common.Models.Car
{
    public class Vehicle
    {
        public int VehicleId { get; set; }

        
        public RentACarService RentACarService { get; set; }

        [Required]
        [MaxLength(200)]
        public string CarModel { get; set; }

        [Required]
        [Column(TypeName = "decimal(4,4)")]
        public decimal PriceADay { get; set; }

        
        [Required]
        [MaxLength(100)]
        public string RegistrationNumber { get; set; }

        public int NumberOfSeats { get; set; }

        public int NumberOfDoors { get; set; }

        public int NumberOfSuitcases { get; set; }

        [MaxLength(50)]
        public string CoolingType { get; set; }

        [MaxLength(50)]
        public string GearboxType { get; set; }
        
        public bool AirCondition { get; set; }

        public byte[] Image { get; set; }

        public bool AvailableNow { get; set; }

        public bool Deleted { get; set; }

        [Column(TypeName = "decimal(4,2)")]
        public decimal AverageCarGrade { get; set; }

        public decimal TotalProfit { get; set; }


        public virtual ICollection<CarOrder> CarOrders { get; set; }
    }
}
