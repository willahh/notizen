import {MigrationInterface, QueryRunner} from "typeorm";

export class alterNoteTableAddManyToManyRelationWithTag1614947200023 implements MigrationInterface {
    name = 'alterNoteTableAddManyToManyRelationWithTag1614947200023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note_tags_tag" ("noteId" integer NOT NULL, "tagName" character varying NOT NULL, CONSTRAINT "PK_30a716dbfba28bc10a484c272b0" PRIMARY KEY ("noteId", "tagName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e5b1c3234803e65ef062812cf" ON "note_tags_tag" ("noteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8bdbe03da3fdf3e7cb65a79c9c" ON "note_tags_tag" ("tagName") `);
        await queryRunner.query(`ALTER TABLE "note_tags_tag" ADD CONSTRAINT "FK_6e5b1c3234803e65ef062812cf6" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_tags_tag" ADD CONSTRAINT "FK_8bdbe03da3fdf3e7cb65a79c9c1" FOREIGN KEY ("tagName") REFERENCES "tag"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_tags_tag" DROP CONSTRAINT "FK_8bdbe03da3fdf3e7cb65a79c9c1"`);
        await queryRunner.query(`ALTER TABLE "note_tags_tag" DROP CONSTRAINT "FK_6e5b1c3234803e65ef062812cf6"`);
        await queryRunner.query(`DROP INDEX "IDX_8bdbe03da3fdf3e7cb65a79c9c"`);
        await queryRunner.query(`DROP INDEX "IDX_6e5b1c3234803e65ef062812cf"`);
        await queryRunner.query(`DROP TABLE "note_tags_tag"`);
    }

}
