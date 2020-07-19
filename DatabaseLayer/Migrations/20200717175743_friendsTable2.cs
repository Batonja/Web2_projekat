using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseLayer.Migrations
{
    public partial class friendsTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Friends",
                table: "Friendship");

            migrationBuilder.DropColumn(
                name: "Friend1Id",
                table: "Friendship");

            migrationBuilder.DropColumn(
                name: "Friend2Id",
                table: "Friendship");

            migrationBuilder.AddColumn<int>(
                name: "FriendId",
                table: "Friendship",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Friends",
                table: "Friendship",
                column: "FriendId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Friends",
                table: "Friendship");

            migrationBuilder.DropColumn(
                name: "FriendId",
                table: "Friendship");

            migrationBuilder.AddColumn<int>(
                name: "Friend1Id",
                table: "Friendship",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Friend2Id",
                table: "Friendship",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Friends",
                table: "Friendship",
                columns: new[] { "Friend1Id", "Friend2Id" });
        }
    }
}
