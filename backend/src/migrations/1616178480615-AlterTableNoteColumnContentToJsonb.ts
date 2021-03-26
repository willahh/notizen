import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableNoteColumnContentToJsonb1616178480615 implements MigrationInterface {
    name = 'AlterTableNoteColumnContentToJsonb1616178480615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "content" jsonb DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "content" character varying`);
    }

}
