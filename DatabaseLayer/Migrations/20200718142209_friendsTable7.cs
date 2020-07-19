using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseLayer.Migrations
{
    public partial class friendsTable7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friend_User_FriendId",
                table: "Friend");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Friend",
                table: "Friend");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "Friend",
                newName: "FriendWithId");

            migrationBuilder.AddColumn<int>(
                name: "FriendshipId",
                table: "Friend",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "FriendOfId",
                table: "Friend",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Friend",
                table: "Friend",
                column: "FriendshipId");

            migrationBuilder.CreateIndex(
                name: "IX_Friend_FriendOfId",
                table: "Friend",
                column: "FriendOfId");

            migrationBuilder.CreateIndex(
                name: "IX_Friend_FriendWithId",
                table: "Friend",
                column: "FriendWithId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friend_User_FriendOfId",
                table: "Friend",
                column: "FriendOfId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friend_User_FriendWithId",
                table: "Friend",
                column: "FriendWithId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friend_User_FriendOfId",
                table: "Friend");

            migrationBuilder.DropForeignKey(
                name: "FK_Friend_User_FriendWithId",
                table: "Friend");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Friend",
                table: "Friend");

            migrationBuilder.DropIndex(
                name: "IX_Friend_FriendOfId",
                table: "Friend");

            migrationBuilder.DropIndex(
                name: "IX_Friend_FriendWithId",
                table: "Friend");

            migrationBuilder.DropColumn(
                name: "FriendshipId",
                table: "Friend");

            migrationBuilder.DropColumn(
                name: "FriendOfId",
                table: "Friend");

            migrationBuilder.RenameColumn(
                name: "FriendWithId",
                table: "Friend",
                newName: "FriendId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Friend",
                table: "Friend",
                column: "FriendId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friend_User_FriendId",
                table: "Friend",
                column: "FriendId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
