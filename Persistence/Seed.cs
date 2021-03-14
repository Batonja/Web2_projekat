using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
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


        }
    }
}