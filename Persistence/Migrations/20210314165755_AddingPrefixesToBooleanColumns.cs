using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddingPrefixesToBooleanColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Deleted",
                table: "Vehicles",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "AvailableNow",
                table: "Vehicles",
                newName: "IsAvailableNow");

            migrationBuilder.RenameColumn(
                name: "AirCondition",
                table: "Vehicles",
                newName: "IsAirCondition");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Vehicles",
                newName: "Deleted");

            migrationBuilder.RenameColumn(
                name: "IsAvailableNow",
                table: "Vehicles",
                newName: "AvailableNow");

            migrationBuilder.RenameColumn(
                name: "IsAirCondition",
                table: "Vehicles",
                newName: "AirCondition");
        }
    }
}
