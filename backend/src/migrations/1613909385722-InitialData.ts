import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialData1613909385722 implements MigrationInterface {
    name = 'InitialData1613909385722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "note" ADD "createDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD "updateDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "updateDate"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "createDate"`);
        await queryRunner.query(`DROP TABLE "note"`);
    }

}
