using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ChangedRelationshipsBetweenUserVehicleRentingEntityAndVehicleAndAppUserEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_AspNetUsers_AppUserId",
                table: "Rentings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rentings",
                table: "Rentings");

            migrationBuilder.AlterColumn<decimal>(
                name: "FullRentingPrice",
                table: "Rentings",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "REAL");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Rentings",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<Guid>(
                name: "UserVehicleRentingId",
                table: "Rentings",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rentings",
                table: "Rentings",
                column: "UserVehicleRentingId");

            migrationBuilder.CreateIndex(
                name: "IX_Rentings_AppUserId",
                table: "Rentings",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_AspNetUsers_AppUserId",
                table: "Rentings",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_AspNetUsers_AppUserId",
                table: "Rentings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rentings",
                table: "Rentings");

            migrationBuilder.DropIndex(
                name: "IX_Rentings_AppUserId",
                table: "Rentings");

            migrationBuilder.DropColumn(
                name: "UserVehicleRentingId",
                table: "Rentings");

            migrationBuilder.AlterColumn<float>(
                name: "FullRentingPrice",
                table: "Rentings",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Rentings",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rentings",
                table: "Rentings",
                columns: new[] { "AppUserId", "VehicleId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_AspNetUsers_AppUserId",
                table: "Rentings",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
