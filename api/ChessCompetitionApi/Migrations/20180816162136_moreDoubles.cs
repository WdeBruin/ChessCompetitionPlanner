using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessCompetitionApi.Migrations
{
    public partial class moreDoubles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                           name: "StandingLines");

            migrationBuilder.DropTable(
                           name: "Players");

            migrationBuilder.CreateTable(
                name: "StandingLines",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompetitionId = table.Column<int>(nullable: false),
                    RoundNumber = table.Column<int>(nullable: false),
                    Position = table.Column<int>(nullable: false),
                    PlayerId = table.Column<int>(nullable: false),
                    CompetitionPoints = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StandingLines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(maxLength: 100, nullable: true),
                    LastName = table.Column<string>(maxLength: 100, nullable: true),
                    ClubElo = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
        }
    }
}
