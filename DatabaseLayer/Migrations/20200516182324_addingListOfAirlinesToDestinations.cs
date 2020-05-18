using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseLayer.Migrations
{
    public partial class addingListOfAirlinesToDestinations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destination_Airline_AirlineId",
                table: "Destination");

            migrationBuilder.DropIndex(
                name: "IX_Destination_AirlineId",
                table: "Destination");

            migrationBuilder.DropColumn(
                name: "AirlineId",
                table: "Destination");

            migrationBuilder.CreateTable(
                name: "AirlineDestination",
                columns: table => new
                {
                    AirlineId = table.Column<int>(nullable: false),
                    DestinationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirlineDestination", x => new { x.AirlineId, x.DestinationId });
                    table.ForeignKey(
                        name: "FK_AirlineDestination_Airline_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airline",
                        principalColumn: "AirlineId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AirlineDestination_Destination_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destination",
                        principalColumn: "DestinationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AirlineDestination_DestinationId",
                table: "AirlineDestination",
                column: "DestinationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AirlineDestination");

            migrationBuilder.AddColumn<int>(
                name: "AirlineId",
                table: "Destination",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Destination_AirlineId",
                table: "Destination",
                column: "AirlineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Destination_Airline_AirlineId",
                table: "Destination",
                column: "AirlineId",
                principalTable: "Airline",
                principalColumn: "AirlineId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
