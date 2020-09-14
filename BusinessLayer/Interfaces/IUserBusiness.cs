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
        Holder<Friend> AddFriend(Friend friend);
        Holder<User> SignUp(User user);
        Holder<Friend> ConfirmFriendship(Friend friend);
        string Encrypt(string secret);
        List<Friend> GetFriends();
        User FindUserOrAdd(User user);
        List<User> GetUsers();

    }
}
