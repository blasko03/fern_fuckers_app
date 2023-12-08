using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FernFuckersAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddTeamsToChampionships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ChampionshipId",
                table: "Team",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Team_ChampionshipId",
                table: "Team",
                column: "ChampionshipId");

            migrationBuilder.AddForeignKey(
                name: "FK_Team_Championship_ChampionshipId",
                table: "Team",
                column: "ChampionshipId",
                principalTable: "Championship",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Team_Championship_ChampionshipId",
                table: "Team");

            migrationBuilder.DropIndex(
                name: "IX_Team_ChampionshipId",
                table: "Team");

            migrationBuilder.DropColumn(
                name: "ChampionshipId",
                table: "Team");
        }
    }
}
