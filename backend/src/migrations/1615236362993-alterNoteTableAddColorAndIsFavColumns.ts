import {MigrationInterface, QueryRunner} from "typeorm";

export class alterNoteTableAddColorAndIsFavColumns1615236362993 implements MigrationInterface {
    name = 'alterNoteTableAddColorAndIsFavColumns1615236362993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "isFav" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "note_color_enum" AS ENUM('GRAY', 'RED', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'PURPLE', 'PINK')`);
        await queryRunner.query(`ALTER TABLE "note" ADD "color" "note_color_enum" NOT NULL DEFAULT 'GRAY'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "color"`);
        await queryRunner.query(`DROP TYPE "note_color_enum"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "isFav"`);
    }

}
