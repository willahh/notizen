import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserTableIsActiveDefaultValuePictureNullable1614808639117 implements MigrationInterface {
    name = 'UpdateUserTableIsActiveDefaultValuePictureNullable1614808639117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "picture" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."picture" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."isActive" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."isActive" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."picture" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "picture" SET NOT NULL`);
    }

}
