using Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseLayer.Interfaces
{
    public interface IUserDatabase
    {
        bool SignUp(User user);

        List<User> GetUsers();
        User GetUserByPassportId(long passportId);
    }
}
