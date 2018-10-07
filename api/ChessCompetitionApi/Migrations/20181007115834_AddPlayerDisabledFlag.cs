using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessCompetitionApi.Migrations
{
    public partial class AddPlayerDisabledFlag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Disabled",
                table: "Players",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Disabled",
                table: "Players");
        }
    }
}
