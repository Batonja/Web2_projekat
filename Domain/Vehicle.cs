using System;
using System.Collections.Generic;

namespace Domain
{
    public class Vehicle
    {
        public Guid Id { get; set; }
        public string CarModel { get; set; }
        public decimal PriceADay { get; set; }
        public string RegistrationNumber { get; set; }
        public int NumberOfSeats { get; set; }
        public int NumberOfDoors { get; set; }
        public int NumberOfSuitcases { get; set; }
        public string GearboxType { get; set; }
        public bool IsAirCondition { get; set; }
        public byte[] Image { get; set; }
        public bool IsAvailableNow { get; set; }
        public bool IsDeleted { get; set; }
        public decimal AverageCarGrade { get; set; }
        public decimal TotalProfit { get; set; }
        public  ICollection<UserVehicleRenting> UserVehicleRentings { get; set; }
    }
}