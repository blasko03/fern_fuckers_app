using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FernFuckersAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddSetOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberLegs",
                table: "Set",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberPlayers",
                table: "Set",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WhoWins",
                table: "Set",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberLegs",
                table: "Set");

            migrationBuilder.DropColumn(
                name: "NumberPlayers",
                table: "Set");

            migrationBuilder.DropColumn(
                name: "WhoWins",
                table: "Set");
        }
    }
}
