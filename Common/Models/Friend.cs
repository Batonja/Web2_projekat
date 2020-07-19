using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Common.Models
{
    public class Friend
    {
     

        public int FriendOfId { get; set; }
        public int FriendWithId { get; set; }

        public User FriendOf { get; set; }
        public User FriendWith { get; set; }
    }
}
