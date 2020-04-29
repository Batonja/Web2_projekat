using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Common.Models.Car
{
    public class BranchOffice
    {
        public int BranchOfficeId { get; set; }

        
        public RentACarLocation Location { get; set; }

        public RentACarService RentACarService { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(100)]
        public string Manager { get; set; }

    }
}
