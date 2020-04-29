using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Common.Models.Car
{
    public class RentACarService
    {
        public int RentACarServiceId { get; set; }

        
        public RentACarLocation RentACarLocation { get; set; }
        
        public User Administrator { get; set; }

        [MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(100)]
        public string Address { get; set; }

        [MaxLength(100)]
        public string Destination { get; set; }

        [Column(TypeName = "decimal(2,2)")]
        public decimal AverageGrade { get; set; }

        public virtual ICollection<Grade> Grades { get; set; }

        public virtual ICollection<Vehicle> Vehicles { get; set; }

        public virtual ICollection<Station> Stations { get; set; }

        public virtual ICollection<BranchOffice> BranchOffices{ get; set; }

        public virtual ICollection<CarOrder> CarOrders { get; set; }

    }
}
