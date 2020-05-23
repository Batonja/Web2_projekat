using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseLayer.Migrations
{
    public partial class addingListOfTicketsToFlight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Flight");

            migrationBuilder.AddColumn<int>(
                name: "FlightId",
                table: "FlightTicket",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightTicket_FlightId",
                table: "FlightTicket",
                column: "FlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightTicket_Flight_FlightId",
                table: "FlightTicket",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "FlightId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightTicket_Flight_FlightId",
                table: "FlightTicket");

            migrationBuilder.DropIndex(
                name: "IX_FlightTicket_FlightId",
                table: "FlightTicket");

            migrationBuilder.DropColumn(
                name: "FlightId",
                table: "FlightTicket");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Flight",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
