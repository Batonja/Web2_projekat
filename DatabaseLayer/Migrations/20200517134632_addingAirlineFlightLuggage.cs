using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseLayer.Migrations
{
    public partial class addingAirlineFlightLuggage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightLuggage_Airline_AirlineId",
                table: "FlightLuggage");

            migrationBuilder.DropIndex(
                name: "IX_FlightLuggage_AirlineId",
                table: "FlightLuggage");

            migrationBuilder.DropColumn(
                name: "AirlineId",
                table: "FlightLuggage");

            migrationBuilder.CreateTable(
                name: "AirlineFlightLuggage",
                columns: table => new
                {
                    FlightLuggageId = table.Column<int>(nullable: false),
                    AirlineId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirlineFlightLuggage", x => new { x.AirlineId, x.FlightLuggageId });
                    table.ForeignKey(
                        name: "FK_AirlineFlightLuggage_Airline_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airline",
                        principalColumn: "AirlineId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AirlineFlightLuggage_FlightLuggage_FlightLuggageId",
                        column: x => x.FlightLuggageId,
                        principalTable: "FlightLuggage",
                        principalColumn: "FlightLuggageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AirlineFlightLuggage_FlightLuggageId",
                table: "AirlineFlightLuggage",
                column: "FlightLuggageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AirlineFlightLuggage");

            migrationBuilder.AddColumn<int>(
                name: "AirlineId",
                table: "FlightLuggage",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightLuggage_AirlineId",
                table: "FlightLuggage",
                column: "AirlineId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightLuggage_Airline_AirlineId",
                table: "FlightLuggage",
                column: "AirlineId",
                principalTable: "Airline",
                principalColumn: "AirlineId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
