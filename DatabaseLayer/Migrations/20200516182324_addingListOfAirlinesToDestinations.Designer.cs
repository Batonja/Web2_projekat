﻿// <auto-generated />
using System;
using DatabaseLayer.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DatabaseLayer.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200516182324_addingListOfAirlinesToDestinations")]
    partial class addingListOfAirlinesToDestinations
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Common.Models.Airline.Airline", b =>
                {
                    b.Property<int>("AirlineId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasMaxLength(100);

                    b.Property<int?>("AdministratorUserId");

                    b.Property<string>("Description")
                        .HasMaxLength(100);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("AirlineId");

                    b.HasIndex("AdministratorUserId");

                    b.ToTable("Airline");
                });

            modelBuilder.Entity("Common.Models.Airline.AirlineDestination", b =>
                {
                    b.Property<int>("AirlineId");

                    b.Property<int>("DestinationId");

                    b.HasKey("AirlineId", "DestinationId");

                    b.HasIndex("DestinationId");

                    b.ToTable("AirlineDestination");
                });

            modelBuilder.Entity("Common.Models.Airline.Destination", b =>
                {
                    b.Property<int>("DestinationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("DestinationId");

                    b.ToTable("Destination");
                });

            modelBuilder.Entity("Common.Models.Airline.Flight", b =>
                {
                    b.Property<int>("FlightId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId");

                    b.Property<DateTime>("ArrivalDate");

                    b.Property<DateTime>("DepartureDate");

                    b.Property<int?>("FromDestinationDestinationId");

                    b.Property<int>("NumOfChangeovers");

                    b.Property<double>("Price");

                    b.Property<int>("ToDestionationDestinationId");

                    b.Property<decimal>("TripLength")
                        .HasColumnType("decimal(5,2)");

                    b.HasKey("FlightId");

                    b.HasIndex("AirlineId");

                    b.HasIndex("FromDestinationDestinationId");

                    b.HasIndex("ToDestionationDestinationId");

                    b.ToTable("Flight");
                });

            modelBuilder.Entity("Common.Models.Airline.FlightLuggage", b =>
                {
                    b.Property<int>("FlightLuggageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId");

                    b.Property<int>("FlightLuggageType");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(6,2)");

                    b.HasKey("FlightLuggageId");

                    b.HasIndex("AirlineId");

                    b.ToTable("FlightLuggage");
                });

            modelBuilder.Entity("Common.Models.Airline.FlightOrder", b =>
                {
                    b.Property<int>("FlightOrderId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FlightId");

                    b.Property<int?>("FlightLuggageId");

                    b.Property<int>("FlightTicketId");

                    b.Property<int>("SeatId");

                    b.Property<int?>("UserId");

                    b.HasKey("FlightOrderId");

                    b.HasIndex("FlightId");

                    b.HasIndex("FlightLuggageId");

                    b.HasIndex("FlightTicketId");

                    b.HasIndex("SeatId");

                    b.HasIndex("UserId");

                    b.ToTable("FlightOrder");
                });

            modelBuilder.Entity("Common.Models.Airline.FlightTicket", b =>
                {
                    b.Property<int>("FlightTicketId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(8,4)");

                    b.Property<int>("Type");

                    b.HasKey("FlightTicketId");

                    b.ToTable("FlightTicket");
                });

            modelBuilder.Entity("Common.Models.Airline.Seat", b =>
                {
                    b.Property<int>("SeatId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FlightId");

                    b.Property<int>("SeatNumber");

                    b.Property<int>("SeatState");

                    b.HasKey("SeatId");

                    b.HasIndex("FlightId");

                    b.ToTable("Seat");
                });

            modelBuilder.Entity("Common.Models.Car.BranchOffice", b =>
                {
                    b.Property<int>("BranchOfficeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("LocationRentACarLocationId");

                    b.Property<string>("Manager")
                        .HasMaxLength(100);

                    b.Property<int?>("RentACarServiceId");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("BranchOfficeId");

                    b.HasIndex("LocationRentACarLocationId");

                    b.HasIndex("RentACarServiceId");

                    b.ToTable("BranchOffice");
                });

            modelBuilder.Entity("Common.Models.Car.CarOrder", b =>
                {
                    b.Property<int>("CarOrderId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("DropoffStationStationId");

                    b.Property<DateTime>("EndDate");

                    b.Property<decimal>("OrderPrice")
                        .HasColumnType("decimal(4,4)");

                    b.Property<int?>("PickupStationStationId");

                    b.Property<int?>("RentACarServiceId");

                    b.Property<DateTime>("StartDate");

                    b.Property<DateTime>("TomorrowFromStartDate");

                    b.Property<int?>("UserId");

                    b.Property<int?>("VehicleId");

                    b.HasKey("CarOrderId");

                    b.HasIndex("DropoffStationStationId");

                    b.HasIndex("PickupStationStationId");

                    b.HasIndex("RentACarServiceId");

                    b.HasIndex("UserId");

                    b.HasIndex("VehicleId");

                    b.ToTable("CarOrder");
                });

            modelBuilder.Entity("Common.Models.Car.Grade", b =>
                {
                    b.Property<int>("GradeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("RentACarServiceId");

                    b.Property<int>("Value");

                    b.HasKey("GradeId");

                    b.HasIndex("RentACarServiceId");

                    b.ToTable("Grade");
                });

            modelBuilder.Entity("Common.Models.Car.RentACarLocation", b =>
                {
                    b.Property<int>("RentACarLocationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("State")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("RentACarLocationId");

                    b.ToTable("RentACarLocation");
                });

            modelBuilder.Entity("Common.Models.Car.RentACarService", b =>
                {
                    b.Property<int>("RentACarServiceId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasMaxLength(100);

                    b.Property<int?>("AdministratorUserId");

                    b.Property<decimal>("AverageGrade")
                        .HasColumnType("decimal(4,2)");

                    b.Property<string>("Destination")
                        .HasMaxLength(100);

                    b.Property<int?>("RentACarLocationId");

                    b.Property<string>("Title")
                        .HasMaxLength(200);

                    b.HasKey("RentACarServiceId");

                    b.HasIndex("AdministratorUserId");

                    b.HasIndex("RentACarLocationId");

                    b.ToTable("RentACarService");
                });

            modelBuilder.Entity("Common.Models.Car.Station", b =>
                {
                    b.Property<int>("StationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("LocationDestinationId");

                    b.Property<int?>("RentACarServiceId");

                    b.HasKey("StationId");

                    b.HasIndex("LocationDestinationId");

                    b.HasIndex("RentACarServiceId");

                    b.ToTable("Station");
                });

            modelBuilder.Entity("Common.Models.Car.Vehicle", b =>
                {
                    b.Property<int>("VehicleId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("AirCondition");

                    b.Property<bool>("AvailableNow");

                    b.Property<decimal>("AverageCarGrade")
                        .HasColumnType("decimal(4,2)");

                    b.Property<string>("CarModel")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("CoolingType")
                        .HasMaxLength(50);

                    b.Property<bool>("Deleted");

                    b.Property<string>("GearboxType")
                        .HasMaxLength(50);

                    b.Property<byte[]>("Image");

                    b.Property<int>("NumberOfDoors");

                    b.Property<int>("NumberOfSeats");

                    b.Property<int>("NumberOfSuitcases");

                    b.Property<decimal>("PriceADay")
                        .HasColumnType("decimal(8,4)");

                    b.Property<string>("RegistrationNumber")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<int?>("RentACarServiceId");

                    b.Property<decimal>("TotalProfit");

                    b.HasKey("VehicleId");

                    b.HasIndex("RentACarServiceId");

                    b.ToTable("Vehicle");
                });

            modelBuilder.Entity("Common.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("Key")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<long>("PassportId");

                    b.Property<long>("Phone");

                    b.Property<int>("Role");

                    b.Property<string>("Salt")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("UserId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Common.Models.Airline.Airline", b =>
                {
                    b.HasOne("Common.Models.User", "Administrator")
                        .WithMany()
                        .HasForeignKey("AdministratorUserId");
                });

            modelBuilder.Entity("Common.Models.Airline.AirlineDestination", b =>
                {
                    b.HasOne("Common.Models.Airline.Airline", "Airline")
                        .WithMany("AirlineDestinations")
                        .HasForeignKey("AirlineId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Common.Models.Airline.Destination", "Destination")
                        .WithMany("AirlineDestinations")
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.Models.Airline.Flight", b =>
                {
                    b.HasOne("Common.Models.Airline.Airline", "Airline")
                        .WithMany("Flights")
                        .HasForeignKey("AirlineId");

                    b.HasOne("Common.Models.Airline.Destination", "FromDestination")
                        .WithMany()
                        .HasForeignKey("FromDestinationDestinationId");

                    b.HasOne("Common.Models.Airline.Destination", "ToDestionation")
                        .WithMany()
                        .HasForeignKey("ToDestionationDestinationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.Models.Airline.FlightLuggage", b =>
                {
                    b.HasOne("Common.Models.Airline.Airline")
                        .WithMany("AvailableFlightLuggage")
                        .HasForeignKey("AirlineId");
                });

            modelBuilder.Entity("Common.Models.Airline.FlightOrder", b =>
                {
                    b.HasOne("Common.Models.Airline.Flight", "Flight")
                        .WithMany("FlightOrders")
                        .HasForeignKey("FlightId");

                    b.HasOne("Common.Models.Airline.FlightLuggage", "FlightLuggage")
                        .WithMany()
                        .HasForeignKey("FlightLuggageId");

                    b.HasOne("Common.Models.Airline.FlightTicket", "FlightTicket")
                        .WithMany()
                        .HasForeignKey("FlightTicketId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Common.Models.Airline.Seat", "Seat")
                        .WithMany()
                        .HasForeignKey("SeatId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Common.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Common.Models.Airline.Seat", b =>
                {
                    b.HasOne("Common.Models.Airline.Flight", "Flight")
                        .WithMany("Seats")
                        .HasForeignKey("FlightId");
                });

            modelBuilder.Entity("Common.Models.Car.BranchOffice", b =>
                {
                    b.HasOne("Common.Models.Car.RentACarLocation", "Location")
                        .WithMany()
                        .HasForeignKey("LocationRentACarLocationId");

                    b.HasOne("Common.Models.Car.RentACarService", "RentACarService")
                        .WithMany("BranchOffices")
                        .HasForeignKey("RentACarServiceId");
                });

            modelBuilder.Entity("Common.Models.Car.CarOrder", b =>
                {
                    b.HasOne("Common.Models.Car.Station", "DropoffStation")
                        .WithMany()
                        .HasForeignKey("DropoffStationStationId");

                    b.HasOne("Common.Models.Car.Station", "PickupStation")
                        .WithMany()
                        .HasForeignKey("PickupStationStationId");

                    b.HasOne("Common.Models.Car.RentACarService", "RentACarService")
                        .WithMany("CarOrders")
                        .HasForeignKey("RentACarServiceId");

                    b.HasOne("Common.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.HasOne("Common.Models.Car.Vehicle", "Vehicle")
                        .WithMany("CarOrders")
                        .HasForeignKey("VehicleId");
                });

            modelBuilder.Entity("Common.Models.Car.Grade", b =>
                {
                    b.HasOne("Common.Models.Car.RentACarService")
                        .WithMany("Grades")
                        .HasForeignKey("RentACarServiceId");
                });

            modelBuilder.Entity("Common.Models.Car.RentACarService", b =>
                {
                    b.HasOne("Common.Models.User", "Administrator")
                        .WithMany()
                        .HasForeignKey("AdministratorUserId");

                    b.HasOne("Common.Models.Car.RentACarLocation", "RentACarLocation")
                        .WithMany()
                        .HasForeignKey("RentACarLocationId");
                });

            modelBuilder.Entity("Common.Models.Car.Station", b =>
                {
                    b.HasOne("Common.Models.Airline.Destination", "Location")
                        .WithMany()
                        .HasForeignKey("LocationDestinationId");

                    b.HasOne("Common.Models.Car.RentACarService", "RentACarService")
                        .WithMany("Stations")
                        .HasForeignKey("RentACarServiceId");
                });

            modelBuilder.Entity("Common.Models.Car.Vehicle", b =>
                {
                    b.HasOne("Common.Models.Car.RentACarService", "RentACarService")
                        .WithMany("Vehicles")
                        .HasForeignKey("RentACarServiceId");
                });
#pragma warning restore 612, 618
        }
    }
}
