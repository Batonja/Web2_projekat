using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Common.Models.Car
{
    public class Grade
    {
        public int GradeId{ get; set; }

        [Required]
        public int Value { get; set; }
    }
}
