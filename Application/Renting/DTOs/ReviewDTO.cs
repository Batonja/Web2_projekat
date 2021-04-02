using System;
using Domain;

namespace Application.Renting.DTOs
{
    public class ReviewDTO
    {   
        public Guid UserVehicleRentingId { get; set; }
        public Grade CarGrade { get; set; }
        public Grade RentACarServiceGrade { get; set; }
        public DateTime ReviewDate { get; set; }
        public string Comment { get; set; }

    }
}