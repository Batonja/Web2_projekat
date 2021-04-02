using System;
using Domain;

namespace Application.Renting.DTOs
{
    public class RentingDTO
    {
        public Guid UserVehicleRentingId { get; set; }
        public string AppUserId { get; set; }
        public Guid VehicleId { get; set; }
        public DateTime PickUpDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public Guid PickupPlaceId { get; set; }
        public Guid ReturnPlaceId { get; set; }
    }
}