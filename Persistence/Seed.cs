using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
           UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var roles = new List<string>{
                    (RoleConstants.Administrator),
                    (RoleConstants.CarManager),
                    (RoleConstants.RegularUser)
                };

                roles.ForEach(x => EnsureRolesAsync(roleManager, x).GetAwaiter());

                var adminUser = new AppUser
                {
                    DisplayName = "Admin",
                    FirstName = "Damir",
                    LastName = "Jazvin",
                    PhoneNumber = "+381659120795",
                    UserName = "TheRoadsign",
                    Email = "damir.jazvin@hotmail.com",
                };

                await userManager.CreateAsync(adminUser, "Pa$$w0rd");
                var addedAdminUser = await userManager.FindByEmailAsync(adminUser.Email);
                await userManager.AddToRoleAsync(addedAdminUser, roles[0]);

                var users = new List<AppUser>
                {


                    new AppUser
                    {
                        DisplayName = "Bob",
                        FirstName ="Bob",
                        LastName = "Martin",
                        PhoneNumber = "0641234563",
                        UserName = "bob",
                        Email = "bob@test.com",

                    },
                    new AppUser
                    {

                        DisplayName = "Jane",
                        FirstName ="Jane",
                        LastName = "Peters",
                        PhoneNumber = "0641654239",
                        UserName = "jane",
                        Email = "jane@test.com",
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        FirstName ="Tom",
                        LastName = "Waits",
                        PhoneNumber = "0641417653",
                        UserName = "tom",
                        Email = "rollingstone.damir@gmail.com",
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    var addedUser = await userManager.FindByEmailAsync(user.Email);
                    await userManager.AddToRoleAsync(user, roles[roles.Count - 1]);
                }
            }
            if (!context.Vehicles.Any())
            {
                var vehicles = new List<Vehicle>{
                    new Vehicle{
                        CarModel="Toyota C-HR",
                        PriceADay = 150,
                        RegistrationNumber = "NS123123",
                        NumberOfSeats= 5,
                        NumberOfDoors = 5,
                        NumberOfSuitcases = 2,
                        GearboxType = GearBoxTypes.Automatic,
                        IsAirCondition = true,
                        Image =null,
                        IsDeleted = false,
                        AverageCarGrade = 4.7M,
                        TotalProfit = 12000,
                    }, new Vehicle
                    {
                        CarModel = "Toyota Corola",
                        PriceADay = 300,
                        RegistrationNumber = "NS345453",
                        NumberOfSeats = 5,
                        NumberOfDoors = 5,
                        NumberOfSuitcases = 2,
                        GearboxType = GearBoxTypes.Manual,
                        IsAirCondition = true,
                        Image = null,
                        IsDeleted = false,
                        AverageCarGrade = 4.7M,
                        TotalProfit = 12000,
                    }, new Vehicle{
                        CarModel="Toyota Yaris",
                        PriceADay = 120,
                        RegistrationNumber = "NS234234",
                        GearboxType = GearBoxTypes.Manual,
                        NumberOfSeats= 5,
                        NumberOfDoors = 5,
                        NumberOfSuitcases = 2,
                        IsAirCondition = true,
                        Image =null,
                        IsDeleted = false,
                        AverageCarGrade = 4.7M,
                        TotalProfit = 12000,
                    }
                };


                await context.AddRangeAsync(vehicles);
                await context.SaveChangesAsync();
            }


            #region Vehicles
            // if (context.Vehicles.Any()) return;

            // var users = new List<Vehicle>
            //     {
            //         new Vehicle
            //         {
            //             Id = new Guid(),
            //             FirstName ="Bob",
            //             LastName = "Martin",
            //             Username = "bob",
            //             Password= "Pa$$w0rd",
            //             Email = "bob@test.com",
            //             Role = RoleConstants.AdministratorRole
            //         },
            //         new Vehicle
            //         {
            //             Id = new Guid(),
            //             FirstName ="Jane",
            //             LastName = "Peters",
            //             Password= "Pa$$w0rd",
            //             Username = "jane",
            //             Email = "jane@test.com",
            //             Role = RoleConstants.RegularUserRole
            //         },
            //         new Vehicle
            //         {
            //             Id = new Guid(),
            //             FirstName ="Tom",
            //             LastName = "Waits",
            //             Username = "tom",
            //             Password= "Pa$$w0rd",
            //             Email = "tom@test.com",
            //             Role = RoleConstants.RegularUserRole
            //         },
            //     };

            #endregion


        }

        private static async Task EnsureRolesAsync(
    RoleManager<IdentityRole> roleManager, string role)
        {
            var alreadyExists = await roleManager
                .RoleExistsAsync(role);

            if (alreadyExists) return;

            await roleManager.CreateAsync(
                new IdentityRole(role));
        }
    }
}