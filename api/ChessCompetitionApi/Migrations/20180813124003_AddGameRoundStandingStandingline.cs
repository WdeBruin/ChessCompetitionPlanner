using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessCompetitionApi.Migrations
{
    public partial class AddGameRoundStandingStandingline : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoundId = table.Column<int>(nullable: false),
                    CompetitionId = table.Column<int>(nullable: false),
                    WhitePlayerId = table.Column<int>(nullable: false),
                    BlackPlayerId = table.Column<int>(nullable: false),
                    Result = table.Column<int>(nullable: false),
                    WhiteWinEloChange = table.Column<int>(nullable: false),
                    WhiteDrawEloChange = table.Column<int>(nullable: false),
                    WhiteLossEloChange = table.Column<int>(nullable: false),
                    BlackWinEloChange = table.Column<int>(nullable: false),
                    BlackDrawEloChange = table.Column<int>(nullable: false),
                    BlackLossEloChange = table.Column<int>(nullable: false),
                    WhiteWinCpChange = table.Column<int>(nullable: false),
                    WhiteDrawCpChange = table.Column<int>(nullable: false),
                    WhiteLossCpChange = table.Column<int>(nullable: false),
                    BlackWinCpChange = table.Column<int>(nullable: false),
                    BlackDrawCpChange = table.Column<int>(nullable: false),
                    BlackLossCpChange = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StandingLines",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StandingId = table.Column<int>(nullable: false),
                    Position = table.Column<int>(nullable: false),
                    PlayerId = table.Column<int>(nullable: false),
                    CompetitionPoints = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StandingLines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Standings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompetitionId = table.Column<int>(nullable: false),
                    RoundId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Standings", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropTable(
                name: "StandingLines");

            migrationBuilder.DropTable(
                name: "Standings");
        }
    }
}
