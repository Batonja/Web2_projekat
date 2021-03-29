using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateRentACarServiceAppUserRelationshipToOneToMeny : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentACarServices_AspNetUsers_AppUserManagerId",
                table: "RentACarServices");

            migrationBuilder.DropIndex(
                name: "IX_RentACarServices_AppUserManagerId",
                table: "RentACarServices");

            migrationBuilder.AddColumn<Guid>(
                name: "RentACarServiceId",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_RentACarServiceId",
                table: "AspNetUsers",
                column: "RentACarServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_RentACarServices_RentACarServiceId",
                table: "AspNetUsers",
                column: "RentACarServiceId",
                principalTable: "RentACarServices",
                principalColumn: "RentACarServiceId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_RentACarServices_RentACarServiceId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_RentACarServiceId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RentACarServiceId",
                table: "AspNetUsers");

            migrationBuilder.CreateIndex(
                name: "IX_RentACarServices_AppUserManagerId",
                table: "RentACarServices",
                column: "AppUserManagerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RentACarServices_AspNetUsers_AppUserManagerId",
                table: "RentACarServices",
                column: "AppUserManagerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
