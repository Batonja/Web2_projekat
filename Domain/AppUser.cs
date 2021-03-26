using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PassportID { get; set; }

          public  ICollection<UserVehicleRenting> UserVehicleRentings { get; set; }
    }

  
}

