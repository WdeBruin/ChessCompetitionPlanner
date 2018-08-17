﻿// <auto-generated />
using System;
using ChessCompetitionApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ChessCompetitionApi.Migrations
{
    [DbContext(typeof(CompetitionDbContext))]
    [Migration("20180816154008_resultNullable")]
    partial class resultNullable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846");

            modelBuilder.Entity("ChessCompetitionApi.Data.Competition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("RoundCount");

                    b.HasKey("Id");

                    b.ToTable("Competitions");
                });

            modelBuilder.Entity("ChessCompetitionApi.Data.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("BlackDrawCpChange");

                    b.Property<double>("BlackDrawEloChange");

                    b.Property<double>("BlackLossCpChange");

                    b.Property<double>("BlackLossEloChange");

                    b.Property<int>("BlackPlayerId");

                    b.Property<double>("BlackWinCpChange");

                    b.Property<double>("BlackWinEloChange");

                    b.Property<int>("CompetitionId");

                    b.Property<int?>("Result");

                    b.Property<int>("RoundNumber");

                    b.Property<double>("WhiteDrawCpChange");

                    b.Property<double>("WhiteDrawEloChange");

                    b.Property<double>("WhiteLossCpChange");

                    b.Property<double>("WhiteLossEloChange");

                    b.Property<int>("WhitePlayerId");

                    b.Property<double>("WhiteWinCpChange");

                    b.Property<double>("WhiteWinEloChange");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("ChessCompetitionApi.Data.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClubElo");

                    b.Property<string>("FirstName")
                        .HasMaxLength(100);

                    b.Property<string>("LastName")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("ChessCompetitionApi.Data.Round", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CompetitionId");

                    b.Property<int>("PlayerVrijgeloot");

                    b.Property<string>("PlayersInRoundIds");

                    b.Property<int>("RoundNumber");

                    b.Property<int>("RoundStatus");

                    b.HasKey("Id");

                    b.ToTable("Rounds");
                });

            modelBuilder.Entity("ChessCompetitionApi.Data.StandingLine", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CompetitionId");

                    b.Property<int>("CompetitionPoints");

                    b.Property<int>("PlayerId");

                    b.Property<int>("Position");

                    b.Property<int>("RoundNumber");

                    b.HasKey("Id");

                    b.ToTable("StandingLines");
                });
#pragma warning restore 612, 618
        }
    }
}
