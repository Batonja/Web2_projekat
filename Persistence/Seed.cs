using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
        UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            AppUser tempUser = new AppUser();
            if (!userManager.Users.Any() )
            {
                var roles = new List<string>{
                    (RoleConstants.Administrator),
                    (RoleConstants.CarManager),
                    (RoleConstants.RegularUser)
                };

                roles.ForEach(x => EnsureRolesAsync(roleManager, x).GetAwaiter());
                //Create Admin
                tempUser = new AppUser
                {

                    FirstName = "Damir",
                    LastName = "Jazvin",
                    PhoneNumber = "+381659120795",
                    UserName = "Admin",
                    Email = "damir.jazvin@hotmail.com",
                    EmailConfirmed = true
                };

                await userManager.CreateAsync(tempUser, "Pa$$w0rd");
                tempUser = await userManager.FindByEmailAsync(tempUser.Email);
                await userManager.AddToRoleAsync(tempUser, roles[0]);
                //Create Car Manager
                tempUser = new AppUser
                {

                    FirstName = "Nenad",
                    LastName = "Cukilo",
                    PhoneNumber = "+381655435438",
                    UserName = "nenad",
                    Email = "nenad.cukilo@gmail.com",
                    EmailConfirmed = true
                };

                await userManager.CreateAsync(tempUser, "Pa$$w0rd");
                tempUser = await userManager.FindByEmailAsync(tempUser.Email);
                await userManager.AddToRoleAsync(tempUser, roles[1]);
                
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        FirstName ="Bob",
                        LastName = "Martin",
                        PhoneNumber = "0641234563",
                        UserName = "bob",
                        Email = "bob@test.com",
                        EmailConfirmed = true
                    },
                    new AppUser
                    {
                        FirstName ="Jane",
                        LastName = "Peters",
                        PhoneNumber = "0641654239",
                        UserName = "jane",
                        Email = "jane@test.com",
                        EmailConfirmed = true
                    },
                    new AppUser
                    {
                        FirstName ="Tom",
                        LastName = "Waits",
                        PhoneNumber = "0641417653",
                        UserName = "tom",
                        Email = "rollingstone.damir@gmail.com",
                        EmailConfirmed = true
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    tempUser = await userManager.FindByEmailAsync(user.Email);
                    await userManager.AddToRoleAsync(user, roles[roles.Count - 1]);
                }

            }
            #region Vehicles
            if (!context.Vehicles.Any() && !context.RentACarServices.Any())
            {
                tempUser = await userManager.FindByEmailAsync("nenad.cukilo@gmail.com");
                 //Create RentACarServiceGrade
                RentACarService service = new RentACarService(){
                    Name = "EuroCar",
                    Description = "Cheap and safe new car for your travel", 
                    Address = "Danila Kisa 34",
                    State = "Serbia",
                    City = "Novi Sad",
                    Managers =  new List<AppUser>{
                        tempUser,
                    },
                    BranchOffices = new List<BranchOffice>{
                        new BranchOffice{
                            Place = "Nikola Tesla Airport",
                            City = "Belgrade"
                        },
                        new BranchOffice{
                            Place = "Zeleznicka stanica",
                            City = "Novi Sad"
                        },new BranchOffice{
                            Place = "Borderline Horgos",
                            City = "Horgos"
                        }
                    }
                };
                await context.RentACarServices.AddAsync(service);
                await context.SaveChangesAsync();
                //___________________________________________________
                service =  context.RentACarServices.ToList()[0];
                tempUser = await userManager.FindByEmailAsync("rollingstone.damir@gmail.com");
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
                        RentACarServiceOwner = service,
                        UserVehicleRentings = new List<UserVehicleRenting>{
                            new UserVehicleRenting{
                                AppUserId = tempUser.Id,
                                PickUpDate =DateTime.Now.AddDays(2),
                                ReturnDate =DateTime.Now.AddDays(5),
                                CarGrade = Grade.NO_GRADE,
                                RentACarServiceGrade = Grade.NO_GRADE,
                                IsReviewed = false
                            }

                        },
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
                        RentACarServiceOwner = service,
                        UserVehicleRentings = new List<UserVehicleRenting>{
                            new UserVehicleRenting{
                                AppUserId = tempUser.Id,
                                PickUpDate =DateTime.Now.AddDays(6),
                                ReturnDate =DateTime.Now.AddDays(10),
                                CarGrade = Grade.NO_GRADE,
                                RentACarServiceGrade = Grade.NO_GRADE,
                                IsReviewed = false
                            }
                        },
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
                        RentACarServiceOwner = service,
                        UserVehicleRentings = new List<UserVehicleRenting>{
                            new UserVehicleRenting{
                                AppUserId = tempUser.Id,
                                PickUpDate =DateTime.Now.AddDays(11),
                                ReturnDate =DateTime.Now.AddDays(14),
                                CarGrade = Grade.NO_GRADE,
                                RentACarServiceGrade = Grade.NO_GRADE,
                                IsReviewed = false
                            }

                        },
                    }
                };


                await context.AddRangeAsync(vehicles);
                await context.SaveChangesAsync();
            }
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