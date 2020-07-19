using Common.ErrorObjects;
using Common.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BusinessLayer.Interfaces
{
    public interface IUserBusiness
    {
        Holder<User> SignIn(User user);

        Holder<User> SignUp(User user);

        string Encrypt(string secret);

        User FindUserOrAdd(User user);
        List<User> GetUsers();

    }
}
