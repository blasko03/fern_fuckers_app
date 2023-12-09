using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FernFuckersAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddChampionshiMatchRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ChampionshipId",
                table: "Match",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Match_ChampionshipId",
                table: "Match",
                column: "ChampionshipId");

            migrationBuilder.AddForeignKey(
                name: "FK_Match_Championship_ChampionshipId",
                table: "Match",
                column: "ChampionshipId",
                principalTable: "Championship",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Match_Championship_ChampionshipId",
                table: "Match");

            migrationBuilder.DropIndex(
                name: "IX_Match_ChampionshipId",
                table: "Match");

            migrationBuilder.DropColumn(
                name: "ChampionshipId",
                table: "Match");
        }
    }
}
