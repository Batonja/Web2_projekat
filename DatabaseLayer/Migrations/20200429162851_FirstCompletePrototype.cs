using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseLayer.Migrations
{
    public partial class FirstCompletePrototype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Airline_User_AdministratorUserId",
                table: "Airline");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_Flight_FlightId",
                table: "FlightOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_FlightLuggage_FlightLuggageId",
                table: "FlightOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_User_UserId",
                table: "FlightOrder");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FlightOrder",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "FlightLuggageId",
                table: "FlightOrder",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "FlightId",
                table: "FlightOrder",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "FlightLuggage",
                type: "decimal(4,4)",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<int>(
                name: "AdministratorUserId",
                table: "Airline",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "RentACarLocation",
                columns: table => new
                {
                    RentACarLocationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    State = table.Column<string>(maxLength: 200, nullable: false),
                    City = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentACarLocation", x => x.RentACarLocationId);
                });

            migrationBuilder.CreateTable(
                name: "RentACarService",
                columns: table => new
                {
                    RentACarServiceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RentACarLocationId = table.Column<int>(nullable: true),
                    AdministratorUserId = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 200, nullable: true),
                    Address = table.Column<string>(maxLength: 100, nullable: true),
                    Destination = table.Column<string>(maxLength: 100, nullable: true),
                    AverageGrade = table.Column<decimal>(type: "decimal(2,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentACarService", x => x.RentACarServiceId);
                    table.ForeignKey(
                        name: "FK_RentACarService_User_AdministratorUserId",
                        column: x => x.AdministratorUserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RentACarService_RentACarLocation_RentACarLocationId",
                        column: x => x.RentACarLocationId,
                        principalTable: "RentACarLocation",
                        principalColumn: "RentACarLocationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BranchOffice",
                columns: table => new
                {
                    BranchOfficeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    LocationRentACarLocationId = table.Column<int>(nullable: true),
                    RentACarServiceId = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 200, nullable: false),
                    Manager = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchOffice", x => x.BranchOfficeId);
                    table.ForeignKey(
                        name: "FK_BranchOffice_RentACarLocation_LocationRentACarLocationId",
                        column: x => x.LocationRentACarLocationId,
                        principalTable: "RentACarLocation",
                        principalColumn: "RentACarLocationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BranchOffice_RentACarService_RentACarServiceId",
                        column: x => x.RentACarServiceId,
                        principalTable: "RentACarService",
                        principalColumn: "RentACarServiceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Grade",
                columns: table => new
                {
                    GradeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<int>(nullable: false),
                    RentACarServiceId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grade", x => x.GradeId);
                    table.ForeignKey(
                        name: "FK_Grade_RentACarService_RentACarServiceId",
                        column: x => x.RentACarServiceId,
                        principalTable: "RentACarService",
                        principalColumn: "RentACarServiceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Station",
                columns: table => new
                {
                    StationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    LocationDestinationId = table.Column<int>(nullable: true),
                    RentACarServiceId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Station", x => x.StationId);
                    table.ForeignKey(
                        name: "FK_Station_Destination_LocationDestinationId",
                        column: x => x.LocationDestinationId,
                        principalTable: "Destination",
                        principalColumn: "DestinationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Station_RentACarService_RentACarServiceId",
                        column: x => x.RentACarServiceId,
                        principalTable: "RentACarService",
                        principalColumn: "RentACarServiceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Vehicle",
                columns: table => new
                {
                    VehicleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RentACarServiceId = table.Column<int>(nullable: true),
                    CarModel = table.Column<string>(maxLength: 200, nullable: false),
                    PriceADay = table.Column<decimal>(type: "decimal(4,4)", nullable: false),
                    RegistrationNumber = table.Column<string>(maxLength: 100, nullable: false),
                    NumberOfSeats = table.Column<int>(nullable: false),
                    NumberOfDoors = table.Column<int>(nullable: false),
                    NumberOfSuitcases = table.Column<int>(nullable: false),
                    CoolingType = table.Column<string>(maxLength: 50, nullable: true),
                    GearboxType = table.Column<string>(maxLength: 50, nullable: true),
                    AirCondition = table.Column<bool>(nullable: false),
                    Image = table.Column<byte[]>(nullable: true),
                    AvailableNow = table.Column<bool>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    AverageCarGrade = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    TotalProfit = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle", x => x.VehicleId);
                    table.ForeignKey(
                        name: "FK_Vehicle_RentACarService_RentACarServiceId",
                        column: x => x.RentACarServiceId,
                        principalTable: "RentACarService",
                        principalColumn: "RentACarServiceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CarOrder",
                columns: table => new
                {
                    CarOrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RentACarServiceId = table.Column<int>(nullable: true),
                    UserId = table.Column<int>(nullable: true),
                    PickupStationStationId = table.Column<int>(nullable: true),
                    DropoffStationStationId = table.Column<int>(nullable: true),
                    VehicleId = table.Column<int>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    TomorrowFromStartDate = table.Column<DateTime>(nullable: false),
                    OrderPrice = table.Column<decimal>(type: "decimal(4,4)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarOrder", x => x.CarOrderId);
                    table.ForeignKey(
                        name: "FK_CarOrder_Station_DropoffStationStationId",
                        column: x => x.DropoffStationStationId,
                        principalTable: "Station",
                        principalColumn: "StationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarOrder_Station_PickupStationStationId",
                        column: x => x.PickupStationStationId,
                        principalTable: "Station",
                        principalColumn: "StationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarOrder_RentACarService_RentACarServiceId",
                        column: x => x.RentACarServiceId,
                        principalTable: "RentACarService",
                        principalColumn: "RentACarServiceId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarOrder_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarOrder_Vehicle_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicle",
                        principalColumn: "VehicleId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BranchOffice_LocationRentACarLocationId",
                table: "BranchOffice",
                column: "LocationRentACarLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_BranchOffice_RentACarServiceId",
                table: "BranchOffice",
                column: "RentACarServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_CarOrder_DropoffStationStationId",
                table: "CarOrder",
                column: "DropoffStationStationId");

            migrationBuilder.CreateIndex(
                name: "IX_CarOrder_PickupStationStationId",
                table: "CarOrder",
                column: "PickupStationStationId");

            migrationBuilder.CreateIndex(
                name: "IX_CarOrder_RentACarServiceId",
                table: "CarOrder",
                column: "RentACarServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_CarOrder_UserId",
                table: "CarOrder",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CarOrder_VehicleId",
                table: "CarOrder",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_Grade_RentACarServiceId",
                table: "Grade",
                column: "RentACarServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_RentACarService_AdministratorUserId",
                table: "RentACarService",
                column: "AdministratorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RentACarService_RentACarLocationId",
                table: "RentACarService",
                column: "RentACarLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Station_LocationDestinationId",
                table: "Station",
                column: "LocationDestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Station_RentACarServiceId",
                table: "Station",
                column: "RentACarServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicle_RentACarServiceId",
                table: "Vehicle",
                column: "RentACarServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Airline_User_AdministratorUserId",
                table: "Airline",
                column: "AdministratorUserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_Flight_FlightId",
                table: "FlightOrder",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "FlightId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_FlightLuggage_FlightLuggageId",
                table: "FlightOrder",
                column: "FlightLuggageId",
                principalTable: "FlightLuggage",
                principalColumn: "FlightLuggageId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_User_UserId",
                table: "FlightOrder",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Airline_User_AdministratorUserId",
                table: "Airline");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_Flight_FlightId",
                table: "FlightOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_FlightLuggage_FlightLuggageId",
                table: "FlightOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_User_UserId",
                table: "FlightOrder");

            migrationBuilder.DropTable(
                name: "BranchOffice");

            migrationBuilder.DropTable(
                name: "CarOrder");

            migrationBuilder.DropTable(
                name: "Grade");

            migrationBuilder.DropTable(
                name: "Station");

            migrationBuilder.DropTable(
                name: "Vehicle");

            migrationBuilder.DropTable(
                name: "RentACarService");

            migrationBuilder.DropTable(
                name: "RentACarLocation");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FlightOrder",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FlightLuggageId",
                table: "FlightOrder",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FlightId",
                table: "FlightOrder",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "FlightLuggage",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(4,4)");

            migrationBuilder.AlterColumn<int>(
                name: "AdministratorUserId",
                table: "Airline",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Airline_User_AdministratorUserId",
                table: "Airline",
                column: "AdministratorUserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_Flight_FlightId",
                table: "FlightOrder",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "FlightId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_FlightLuggage_FlightLuggageId",
                table: "FlightOrder",
                column: "FlightLuggageId",
                principalTable: "FlightLuggage",
                principalColumn: "FlightLuggageId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_User_UserId",
                table: "FlightOrder",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
