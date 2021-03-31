using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddedIsCanceledColumnToUserVehicleRentingEntityAndTotalProfitColumnAddedToARentACarServiceEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCanceled",
                table: "Rentings",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalProfit",
                table: "RentACarServices",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCanceled",
                table: "Rentings");

            migrationBuilder.DropColumn(
                name: "TotalProfit",
                table: "RentACarServices");
        }
    }
}
