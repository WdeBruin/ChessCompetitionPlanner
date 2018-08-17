﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessCompetitionApi.Migrations
{
    public partial class resultNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                           name: "Games");

            migrationBuilder.CreateTable(
               name: "Games",
               columns: table => new
               {
                   Id = table.Column<int>(nullable: false)
                       .Annotation("Sqlite:Autoincrement", true),
                   RoundNumber = table.Column<int>(nullable: false),
                   CompetitionId = table.Column<int>(nullable: false),
                   WhitePlayerId = table.Column<int>(nullable: false),
                   BlackPlayerId = table.Column<int>(nullable: false),
                   Result = table.Column<int>(nullable: true),
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                         name: "Games");

            migrationBuilder.CreateTable(
   name: "Games",
   columns: table => new
   {
       Id = table.Column<int>(nullable: false)
           .Annotation("Sqlite:Autoincrement", true),
       RoundNumber = table.Column<int>(nullable: false),
       CompetitionId = table.Column<int>(nullable: false),
       WhitePlayerId = table.Column<int>(nullable: false),
       BlackPlayerId = table.Column<int>(nullable: false),
       Result = table.Column<int>(nullable: false),
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

        }
    }
}
