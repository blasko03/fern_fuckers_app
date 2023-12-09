using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FernFuckersAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddLegAndSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SetId",
                table: "Player",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Set",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MatchId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Set", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Set_Match_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Match",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Leg",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SetId = table.Column<Guid>(type: "uuid", nullable: false),
                    TeamId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leg", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Leg_Set_SetId",
                        column: x => x.SetId,
                        principalTable: "Set",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Player_SetId",
                table: "Player",
                column: "SetId");

            migrationBuilder.CreateIndex(
                name: "IX_Leg_SetId",
                table: "Leg",
                column: "SetId");

            migrationBuilder.CreateIndex(
                name: "IX_Set_MatchId",
                table: "Set",
                column: "MatchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Player_Set_SetId",
                table: "Player",
                column: "SetId",
                principalTable: "Set",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Player_Set_SetId",
                table: "Player");

            migrationBuilder.DropTable(
                name: "Leg");

            migrationBuilder.DropTable(
                name: "Set");

            migrationBuilder.DropIndex(
                name: "IX_Player_SetId",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "SetId",
                table: "Player");
        }
    }
}
