import {MigrationInterface, QueryRunner} from "typeorm";

export class NoteNullable1613921024459 implements MigrationInterface {
    name = 'NoteNullable1613921024459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "createDate"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "updateDate"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "createDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD "updateDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "note"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "content" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "note"."content" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "note"."content" IS NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "note"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "updateDate"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "createDate"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "updateDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD "createDate" TIMESTAMP NOT NULL`);
    }

}
