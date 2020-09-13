using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseLayer.Migrations
{
    public partial class adding_confirmation_to_flightOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_FlightTicket_FlightTicketId",
                table: "FlightOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_Seat_SeatId",
                table: "FlightOrder");

            migrationBuilder.AlterColumn<int>(
                name: "SeatId",
                table: "FlightOrder",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "FlightTicketId",
                table: "FlightOrder",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<bool>(
                name: "Confirmed",
                table: "FlightOrder",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_FlightTicket_FlightTicketId",
                table: "FlightOrder",
                column: "FlightTicketId",
                principalTable: "FlightTicket",
                principalColumn: "FlightTicketId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_Seat_SeatId",
                table: "FlightOrder",
                column: "SeatId",
                principalTable: "Seat",
                principalColumn: "SeatId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_FlightTicket_FlightTicketId",
                table: "FlightOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightOrder_Seat_SeatId",
                table: "FlightOrder");

            migrationBuilder.DropColumn(
                name: "Confirmed",
                table: "FlightOrder");

            migrationBuilder.AlterColumn<int>(
                name: "SeatId",
                table: "FlightOrder",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FlightTicketId",
                table: "FlightOrder",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_FlightTicket_FlightTicketId",
                table: "FlightOrder",
                column: "FlightTicketId",
                principalTable: "FlightTicket",
                principalColumn: "FlightTicketId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightOrder_Seat_SeatId",
                table: "FlightOrder",
                column: "SeatId",
                principalTable: "Seat",
                principalColumn: "SeatId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
