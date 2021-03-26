using System;

namespace Domain
{
    public class UserVehicleRenting
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; }
        public DateTime PickUpDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public Grade CarGrade { get; set; }
        public Grade RentACarServiceGrade { get; set; }
        public string Comment { get; set; }
        public bool IsReviewed { get; set; }

    }

    public enum Grade {
        NO_GRADE = 0,
        BAD = 1,
        CAN_BE_BETTER = 2,
        GOOD = 3,
        VERY_GOOD = 4,
        EXCELLENT = 5
    }
}
