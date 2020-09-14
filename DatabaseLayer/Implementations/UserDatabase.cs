using Common.Models;
using DatabaseLayer.DataAccess;
using DatabaseLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DatabaseLayer.Implementations
{
    public class UserDatabase : IUserDatabase
    {
        public bool SignIn(User user)
        {
            throw new NotImplementedException();
        }

        public bool SignUp(User user)
        {
            int rowsEffected = 0;

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                context.Add(user);
                rowsEffected = context.SaveChanges();
            }

            return rowsEffected > 0 ? true : false;
        }


        public User GetUserByPassportId(long passportId)
        {
            User user = new User();
            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                user = context.User.Where(userDb => userDb.PassportId == passportId).SingleOrDefault();
            }

            return user;
        }

        public Friend ConfirmFriendship(Friend friend)
        {
            Friend retval = new Friend();
            int rowsEffected = -1;
            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                retval = context.Friend.Where(theFriend => theFriend.FriendshipId == friend.FriendshipId)
                    .Include(theFriend => theFriend.FriendOf )
                    .Include(theFriend => theFriend.FriendWith)
                    .SingleOrDefault();
                retval.Confirmed = friend.Confirmed;

                context.Update(retval);
                rowsEffected = context.SaveChanges();
            }

            return rowsEffected > 0 ? retval : new Friend();

        }

        public List<Friend> GetFriends()
        {
            List<Friend> retVal = new List<Friend>();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                retVal = context.Friend.Include(friend => friend.FriendOf)
                    .Include(friend => friend.FriendWith).ToList();
            }

            return retVal;
        }

        public bool AddFriend(Friend friend)
        {
            int rowsEffected = -1;

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                friend.FriendOf = context.User.Where(theUser => theUser.UserId == friend.FriendOf.UserId).SingleOrDefault();
                friend.FriendWith = context.User.Where(theUser => theUser.UserId == friend.FriendWith.UserId).SingleOrDefault();

                context.Friend.Add(friend);

                rowsEffected = context.SaveChanges();

            }

            return rowsEffected > 0 ? true : false;
        }
        public List<User> GetUsers()
        {
            List<User> users = new List<User>();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                users = context.User.Include(user => user.FlightOrders).Include(user => user.FriendsOf).Include(user => user.CarOrders).ToList();
            }

            return users;
        }

        public User FindUserOrAdd(User user)
        {
            User retUser = new User();

            using (var context = new DataContext(DataContext.ops.dbOptions))
            {
                retUser = context.User.Where(userDb => userDb.Email == user.Email).SingleOrDefault();

                if(retUser == null)
                {
                    retUser = new User()
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        TokenId = user.TokenId
                    };

                    context.Add(retUser);
                    context.SaveChanges();
                }

            }

            return retUser;


              
        }


    }
}
