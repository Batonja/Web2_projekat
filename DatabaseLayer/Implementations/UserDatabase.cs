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
