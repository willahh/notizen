import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTagTableAddIconAndColorColumns1615306725375 implements MigrationInterface {
    name = 'alterTagTableAddIconAndColorColumns1615306725375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "tag_icon_enum" AS ENUM('TAG', 'HASHTAG')`);
        await queryRunner.query(`ALTER TABLE "tag" ADD "icon" "tag_icon_enum" NOT NULL DEFAULT 'TAG'`);
        await queryRunner.query(`CREATE TYPE "tag_color_enum" AS ENUM('GRAY', 'RED', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'PURPLE', 'PINK')`);
        await queryRunner.query(`ALTER TABLE "tag" ADD "color" "tag_color_enum" NOT NULL DEFAULT 'GRAY'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "color"`);
        await queryRunner.query(`DROP TYPE "tag_color_enum"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "icon"`);
        await queryRunner.query(`DROP TYPE "tag_icon_enum"`);
    }

}
