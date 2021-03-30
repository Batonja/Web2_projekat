using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RemovedAppUserManagerIdColumnFromRentACarServiceEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppUserManagerId",
                table: "RentACarServices");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserManagerId",
                table: "RentACarServices",
                type: "TEXT",
                nullable: true);
        }
    }
}
