using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddedRentACarServiceVehicleOneToManyRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RentACarServiceOwnerId",
                table: "Vehicles",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_RentACarServiceOwnerId",
                table: "Vehicles",
                column: "RentACarServiceOwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_RentACarServices_RentACarServiceOwnerId",
                table: "Vehicles",
                column: "RentACarServiceOwnerId",
                principalTable: "RentACarServices",
                principalColumn: "RentACarServiceId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_RentACarServices_RentACarServiceOwnerId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_RentACarServiceOwnerId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "RentACarServiceOwnerId",
                table: "Vehicles");
        }
    }
}
