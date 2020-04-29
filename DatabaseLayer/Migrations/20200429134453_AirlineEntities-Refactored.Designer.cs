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
    [Migration("20200429134453_AirlineEntities-Refactored")]
    partial class AirlineEntitiesRefactored
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

                    b.Property<int>("AdministratorUserId");

                    b.Property<string>("Description")
                        .HasMaxLength(100);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("AirlineId");

                    b.HasIndex("AdministratorUserId");

                    b.ToTable("Airline");
                });

            modelBuilder.Entity("Common.Models.Airline.Destination", b =>
                {
                    b.Property<int>("DestinationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("DestinationId");

                    b.HasIndex("AirlineId");

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
                        .HasColumnType("decimal(3,2)");

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

                    b.Property<double>("Price");

                    b.HasKey("FlightLuggageId");

                    b.HasIndex("AirlineId");

                    b.ToTable("FlightLuggage");
                });

            modelBuilder.Entity("Common.Models.Airline.FlightOrder", b =>
                {
                    b.Property<int>("FlightOrderId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FlightId");

                    b.Property<int>("FlightLuggageId");

                    b.Property<int>("FlightTicketId");

                    b.Property<int>("SeatId");

                    b.Property<int>("UserId");

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
                        .HasColumnType("decimal(4,4)");

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
                        .HasForeignKey("AdministratorUserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.Models.Airline.Destination", b =>
                {
                    b.HasOne("Common.Models.Airline.Airline")
                        .WithMany("Destinations")
                        .HasForeignKey("AirlineId");
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
                        .WithMany()
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Common.Models.Airline.FlightLuggage", "FlightLuggage")
                        .WithMany()
                        .HasForeignKey("FlightLuggageId")
                        .OnDelete(DeleteBehavior.Cascade);

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
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.Models.Airline.Seat", b =>
                {
                    b.HasOne("Common.Models.Airline.Flight")
                        .WithMany("Seats")
                        .HasForeignKey("FlightId");
                });
#pragma warning restore 612, 618
        }
    }
}
