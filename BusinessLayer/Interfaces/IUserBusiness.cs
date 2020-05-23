using Common.ErrorObjects;
using Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Interfaces
{
    public interface IUserBusiness
    {
        Holder<User> SignIn(User user);

        Holder<User> SignUp(User user);
    }
}
