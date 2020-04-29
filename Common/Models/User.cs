using Common.Enums;
using Common.Models.Airline;
using Common.Models.Car;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Common.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        [Column(TypeName = "varchar(50)")]
        public string Salt { get; set; }
        [Required]
        [MaxLength(50)]
        [Column(TypeName = "varchar(50)")]
        public string Key { get; set; }
        [Required]
        [MaxLength(100)]
        public string Address { get; set; }
        public long Phone { get; set; }
        [Required]
        public long PassportId { get; set; }
        public Roles Role { get; set; }

        ICollection<FlightOrder> FlightOrders { get; set; }
        ICollection<CarOrder> CarOrders { get; set; }
    }
}
