using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RentACarServiceAppUserOneToOneRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserVehicleRenting_AspNetUsers_AppUserId",
                table: "UserVehicleRenting");

            migrationBuilder.DropForeignKey(
                name: "FK_UserVehicleRenting_Vehicles_VehicleId",
                table: "UserVehicleRenting");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserVehicleRenting",
                table: "UserVehicleRenting");

            migrationBuilder.RenameTable(
                name: "UserVehicleRenting",
                newName: "Rentings");

            migrationBuilder.RenameIndex(
                name: "IX_UserVehicleRenting_VehicleId",
                table: "Rentings",
                newName: "IX_Rentings_VehicleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rentings",
                table: "Rentings",
                columns: new[] { "AppUserId", "VehicleId" });

            migrationBuilder.CreateTable(
                name: "RentACarServices",
                columns: table => new
                {
                    RentACarServiceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    AverageGrade = table.Column<float>(type: "REAL", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    State = table.Column<string>(type: "TEXT", nullable: true),
                    City = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserManagerId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentACarServices", x => x.RentACarServiceId);
                    table.ForeignKey(
                        name: "FK_RentACarServices_AspNetUsers_AppUserManagerId",
                        column: x => x.AppUserManagerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RentACarServices_AppUserManagerId",
                table: "RentACarServices",
                column: "AppUserManagerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_AspNetUsers_AppUserId",
                table: "Rentings",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_Vehicles_VehicleId",
                table: "Rentings",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_AspNetUsers_AppUserId",
                table: "Rentings");

            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_Vehicles_VehicleId",
                table: "Rentings");

            migrationBuilder.DropTable(
                name: "RentACarServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rentings",
                table: "Rentings");

            migrationBuilder.RenameTable(
                name: "Rentings",
                newName: "UserVehicleRenting");

            migrationBuilder.RenameIndex(
                name: "IX_Rentings_VehicleId",
                table: "UserVehicleRenting",
                newName: "IX_UserVehicleRenting_VehicleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserVehicleRenting",
                table: "UserVehicleRenting",
                columns: new[] { "AppUserId", "VehicleId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserVehicleRenting_AspNetUsers_AppUserId",
                table: "UserVehicleRenting",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserVehicleRenting_Vehicles_VehicleId",
                table: "UserVehicleRenting",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
