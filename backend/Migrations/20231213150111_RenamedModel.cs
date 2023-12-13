using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FernFuckersAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class RenamedModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SetMatchTeam");

            migrationBuilder.CreateTable(
                name: "SetPlayers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    TeamId = table.Column<Guid>(type: "uuid", nullable: false),
                    SetId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SetPlayers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SetPlayers_Player_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Player",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SetPlayers_Set_SetId",
                        column: x => x.SetId,
                        principalTable: "Set",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SetPlayers_Team_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Team",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SetPlayers_PlayerId",
                table: "SetPlayers",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_SetPlayers_SetId",
                table: "SetPlayers",
                column: "SetId");

            migrationBuilder.CreateIndex(
                name: "IX_SetPlayers_TeamId",
                table: "SetPlayers",
                column: "TeamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SetPlayers");

            migrationBuilder.CreateTable(
                name: "SetMatchTeam",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    SetId = table.Column<Guid>(type: "uuid", nullable: false),
                    TeamId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SetMatchTeam", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SetMatchTeam_Player_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Player",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SetMatchTeam_Set_SetId",
                        column: x => x.SetId,
                        principalTable: "Set",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SetMatchTeam_Team_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Team",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SetMatchTeam_PlayerId",
                table: "SetMatchTeam",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_SetMatchTeam_SetId",
                table: "SetMatchTeam",
                column: "SetId");

            migrationBuilder.CreateIndex(
                name: "IX_SetMatchTeam_TeamId",
                table: "SetMatchTeam",
                column: "TeamId");
        }
    }
}
