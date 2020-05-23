using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseLayer.Migrations
{
    public partial class renamingToDestinationAirline : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Destination_ToDestionationDestinationId",
                table: "Flight");

            migrationBuilder.RenameColumn(
                name: "ToDestionationDestinationId",
                table: "Flight",
                newName: "ToDestinationDestinationId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_ToDestionationDestinationId",
                table: "Flight",
                newName: "IX_Flight_ToDestinationDestinationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Destination_ToDestinationDestinationId",
                table: "Flight",
                column: "ToDestinationDestinationId",
                principalTable: "Destination",
                principalColumn: "DestinationId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Destination_ToDestinationDestinationId",
                table: "Flight");

            migrationBuilder.RenameColumn(
                name: "ToDestinationDestinationId",
                table: "Flight",
                newName: "ToDestionationDestinationId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_ToDestinationDestinationId",
                table: "Flight",
                newName: "IX_Flight_ToDestionationDestinationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Destination_ToDestionationDestinationId",
                table: "Flight",
                column: "ToDestionationDestinationId",
                principalTable: "Destination",
                principalColumn: "DestinationId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
