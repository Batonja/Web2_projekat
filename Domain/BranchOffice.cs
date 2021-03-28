using System;

namespace Domain
{
    public class BranchOffice
    {
        public Guid BranchOfficeId { get; set; }
        public string Place  { get; set; }
        public string City { get; set; }
        public Guid RentACarServiceOwnerId { get; set; }
        public RentACarService RentACarServiceOwner { get; set; }
    }
}