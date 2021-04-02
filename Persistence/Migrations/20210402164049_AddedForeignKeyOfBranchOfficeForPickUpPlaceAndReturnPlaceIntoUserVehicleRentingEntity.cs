using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddedForeignKeyOfBranchOfficeForPickUpPlaceAndReturnPlaceIntoUserVehicleRentingEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PickupPlaceId",
                table: "Rentings",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ReturnPlaceId",
                table: "Rentings",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Rentings_PickupPlaceId",
                table: "Rentings",
                column: "PickupPlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Rentings_ReturnPlaceId",
                table: "Rentings",
                column: "ReturnPlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_BranchOffices_PickupPlaceId",
                table: "Rentings",
                column: "PickupPlaceId",
                principalTable: "BranchOffices",
                principalColumn: "BranchOfficeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_BranchOffices_ReturnPlaceId",
                table: "Rentings",
                column: "ReturnPlaceId",
                principalTable: "BranchOffices",
                principalColumn: "BranchOfficeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_BranchOffices_PickupPlaceId",
                table: "Rentings");

            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_BranchOffices_ReturnPlaceId",
                table: "Rentings");

            migrationBuilder.DropIndex(
                name: "IX_Rentings_PickupPlaceId",
                table: "Rentings");

            migrationBuilder.DropIndex(
                name: "IX_Rentings_ReturnPlaceId",
                table: "Rentings");

            migrationBuilder.DropColumn(
                name: "PickupPlaceId",
                table: "Rentings");

            migrationBuilder.DropColumn(
                name: "ReturnPlaceId",
                table: "Rentings");
        }
    }
}
