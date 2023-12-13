using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SampleBackendApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Areas_Cities_CityId",
                table: "Areas");

            migrationBuilder.DropForeignKey(
                name: "FK_Areas_Counties_CountyId",
                table: "Areas");

            migrationBuilder.DropForeignKey(
                name: "FK_Areas_States_StateId",
                table: "Areas");

            migrationBuilder.DropForeignKey(
                name: "FK_Cities_States_StateId",
                table: "Cities");

            migrationBuilder.DropForeignKey(
                name: "FK_Counties_Cities_CityId",
                table: "Counties");

            migrationBuilder.DropIndex(
                name: "IX_Counties_CityId",
                table: "Counties");

            migrationBuilder.DropIndex(
                name: "IX_Cities_StateId",
                table: "Cities");

            migrationBuilder.DropIndex(
                name: "IX_Areas_CityId",
                table: "Areas");

            migrationBuilder.DropIndex(
                name: "IX_Areas_CountyId",
                table: "Areas");

            migrationBuilder.DropIndex(
                name: "IX_Areas_StateId",
                table: "Areas");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Counties");

            migrationBuilder.DropColumn(
                name: "StateId",
                table: "Cities");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Counties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StateId",
                table: "Cities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Counties_CityId",
                table: "Counties",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_StateId",
                table: "Cities",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_Areas_CityId",
                table: "Areas",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Areas_CountyId",
                table: "Areas",
                column: "CountyId");

            migrationBuilder.CreateIndex(
                name: "IX_Areas_StateId",
                table: "Areas",
                column: "StateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Areas_Cities_CityId",
                table: "Areas",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Areas_Counties_CountyId",
                table: "Areas",
                column: "CountyId",
                principalTable: "Counties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Areas_States_StateId",
                table: "Areas",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_States_StateId",
                table: "Cities",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Counties_Cities_CityId",
                table: "Counties",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
