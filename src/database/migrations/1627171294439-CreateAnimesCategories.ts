import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnimesCategories1627171294439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "animes_categories",
        columns: [
          {
            name: "animeId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "categoryId",
            type: "uuid",
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKAnimeId",
            referencedTableName: "animes",
            referencedColumnNames: ["id"],
            columnNames: ["animeId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKCategoryId",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["categoryId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animes_categories_categories");
  }
}
