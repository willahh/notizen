import {MigrationInterface, QueryRunner} from "typeorm";

export class migration202103121615512165534 implements MigrationInterface {
    name = 'migration202103121615512165534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "tag_icon_enum" AS ENUM('TAG', 'HASHTAG')`);
        await queryRunner.query(`CREATE TYPE "tag_color_enum" AS ENUM('GRAY', 'RED', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'PURPLE', 'PINK')`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "icon" "tag_icon_enum" NOT NULL DEFAULT 'TAG', "color" "tag_color_enum" NOT NULL DEFAULT 'GRAY', CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "note_color_enum" AS ENUM('GRAY', 'RED', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'PURPLE', 'PINK')`);
        await queryRunner.query(`CREATE TABLE "note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "content" character varying, "createDate" TIMESTAMP NOT NULL, "updateDate" TIMESTAMP NOT NULL, "isFav" boolean NOT NULL DEFAULT false, "color" "note_color_enum" NOT NULL DEFAULT 'GRAY', CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "picture" character varying, "isActive" boolean NOT NULL DEFAULT true, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note_tags_tag" ("noteId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_2b984c7d3fe402800e2c3830740" PRIMARY KEY ("noteId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e5b1c3234803e65ef062812cf" ON "note_tags_tag" ("noteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8aa86b09c799e40c8273f07d8f" ON "note_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "note_tags_tag" ADD CONSTRAINT "FK_6e5b1c3234803e65ef062812cf6" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_tags_tag" ADD CONSTRAINT "FK_8aa86b09c799e40c8273f07d8fc" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_tags_tag" DROP CONSTRAINT "FK_8aa86b09c799e40c8273f07d8fc"`);
        await queryRunner.query(`ALTER TABLE "note_tags_tag" DROP CONSTRAINT "FK_6e5b1c3234803e65ef062812cf6"`);
        await queryRunner.query(`DROP INDEX "IDX_8aa86b09c799e40c8273f07d8f"`);
        await queryRunner.query(`DROP INDEX "IDX_6e5b1c3234803e65ef062812cf"`);
        await queryRunner.query(`DROP TABLE "note_tags_tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TYPE "note_color_enum"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TYPE "tag_color_enum"`);
        await queryRunner.query(`DROP TYPE "tag_icon_enum"`);
    }

}
