using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    public class BranchOffice
    {
        public Guid BranchOfficeId { get; set; }
        public string Place  { get; set; }
        public string City { get; set; }
        public Guid RentACarServiceOwnerId { get; set; }
        public RentACarService RentACarServiceOwner { get; set; }

        public ICollection<UserVehicleRenting> PickUpRentings { get; set; }
        public ICollection<UserVehicleRenting> ReturningRentings { get; set; }
    }
}