import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableNoteAddIsDeletedColumn1617218829691 implements MigrationInterface {
    name = 'AlterTableNoteAddIsDeletedColumn1617218829691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "isDeleted"`);
    }

}
