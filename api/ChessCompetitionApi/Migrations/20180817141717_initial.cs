using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessCompetitionApi.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Competitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    RoundCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Competitions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoundNumber = table.Column<int>(nullable: false),
                    CompetitionId = table.Column<int>(nullable: false),
                    WhitePlayerId = table.Column<int>(nullable: false),
                    BlackPlayerId = table.Column<int>(nullable: false),
                    Result = table.Column<double>(nullable: true),
                    WhiteWinEloChange = table.Column<double>(nullable: false),
                    WhiteDrawEloChange = table.Column<double>(nullable: false),
                    WhiteLossEloChange = table.Column<double>(nullable: false),
                    BlackWinEloChange = table.Column<double>(nullable: false),
                    BlackDrawEloChange = table.Column<double>(nullable: false),
                    BlackLossEloChange = table.Column<double>(nullable: false),
                    WhiteWinCpChange = table.Column<double>(nullable: false),
                    WhiteDrawCpChange = table.Column<double>(nullable: false),
                    WhiteLossCpChange = table.Column<double>(nullable: false),
                    BlackWinCpChange = table.Column<double>(nullable: false),
                    BlackDrawCpChange = table.Column<double>(nullable: false),
                    BlackLossCpChange = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 100, nullable: true),
                    LastName = table.Column<string>(maxLength: 100, nullable: true),
                    ClubElo = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rounds",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CompetitionId = table.Column<int>(nullable: false),
                    RoundNumber = table.Column<int>(nullable: false),
                    PlayersInRoundIds = table.Column<string>(nullable: true),
                    PlayerVrijgeloot = table.Column<int>(nullable: false),
                    RoundStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rounds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StandingLines",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Competitions");

            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "Rounds");

            migrationBuilder.DropTable(
                name: "StandingLines");
        }
    }
}
