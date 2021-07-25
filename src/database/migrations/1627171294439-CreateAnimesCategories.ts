import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnimesCategories1627171294439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "animes_categories_categories",
        columns: [
          {
            name: "animesId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "categoriesId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["animesId"],
            referencedColumnNames: ["id"],
            referencedTableName: "animes",
          },
          {
            columnNames: ["categoriesId"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animes_categories_categories");
  }
}
