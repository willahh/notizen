import {MigrationInterface, QueryRunner} from "typeorm";

export class alterNoteTableAddManyToManyRelationWithTag1615149981912 implements MigrationInterface {
    name = 'alterNoteTableAddManyToManyRelationWithTag1615149981912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note_tags_tag" ("noteId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_2b984c7d3fe402800e2c3830740" PRIMARY KEY ("noteId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e5b1c3234803e65ef062812cf" ON "note_tags_tag" ("noteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8aa86b09c799e40c8273f07d8f" ON "note_tags_tag" ("tagId") `);
        await queryRunner.query(`COMMENT ON COLUMN "tag"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "note_tags_tag" ADD CONSTRAINT "FK_6e5b1c3234803e65ef062812cf6" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_tags_tag" ADD CONSTRAINT "FK_8aa86b09c799e40c8273f07d8fc" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_tags_tag" DROP CONSTRAINT "FK_8aa86b09c799e40c8273f07d8fc"`);
        await queryRunner.query(`ALTER TABLE "note_tags_tag" DROP CONSTRAINT "FK_6e5b1c3234803e65ef062812cf6"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b"`);
        await queryRunner.query(`COMMENT ON COLUMN "tag"."name" IS NULL`);
        await queryRunner.query(`DROP INDEX "IDX_8aa86b09c799e40c8273f07d8f"`);
        await queryRunner.query(`DROP INDEX "IDX_6e5b1c3234803e65ef062812cf"`);
        await queryRunner.query(`DROP TABLE "note_tags_tag"`);
    }

}
