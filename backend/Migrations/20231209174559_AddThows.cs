using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FernFuckersAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddThows : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Throw",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    LegId = table.Column<Guid>(type: "uuid", nullable: false),
                    Score = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Throw", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Throw_Leg_LegId",
                        column: x => x.LegId,
                        principalTable: "Leg",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Throw_LegId",
                table: "Throw",
                column: "LegId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Throw");
        }
    }
}
