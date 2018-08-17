using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessCompetitionApi.Migrations
{
    public partial class changeStandingKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Standings");

            migrationBuilder.DropTable(
                name: "StandingLines"
            );

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
                   CompetitionPoints = table.Column<int>(nullable: false)
               },
               constraints: table =>
               {
                   table.PrimaryKey("PK_StandingLines", x => x.Id);
               });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Standings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompetitionId = table.Column<int>(nullable: false),
                    RoundNumber = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Standings", x => x.Id);
                });

            migrationBuilder.DropTable(
               name: "StandingLines"
           );

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
        }
    }
}
