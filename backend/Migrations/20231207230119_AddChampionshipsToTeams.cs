using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FernFuckersAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddChampionshipsToTeams : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "ChampionshipTeam",
                columns: table => new
                {
                    ChampionshipsId = table.Column<Guid>(type: "uuid", nullable: false),
                    TeamsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChampionshipTeam", x => new { x.ChampionshipsId, x.TeamsId });
                    table.ForeignKey(
                        name: "FK_ChampionshipTeam_Championship_ChampionshipsId",
                        column: x => x.ChampionshipsId,
                        principalTable: "Championship",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChampionshipTeam_Team_TeamsId",
                        column: x => x.TeamsId,
                        principalTable: "Team",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChampionshipTeam_TeamsId",
                table: "ChampionshipTeam",
                column: "TeamsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChampionshipTeam");

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
    }
}
