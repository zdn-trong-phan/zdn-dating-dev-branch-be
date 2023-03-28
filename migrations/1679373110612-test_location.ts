import { MigrationInterface, QueryRunner } from "typeorm";

export class testLocation1679373110612 implements MigrationInterface {
    name = 'testLocation1679373110612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "t_test_location" ("pk_id" SERIAL NOT NULL, "s_city" character varying NOT NULL, "d_lat" double precision NOT NULL, "d_long" double precision NOT NULL, "location" geography(Point,4326), CONSTRAINT "PK_cd313d408fd082163e272cf471e" PRIMARY KEY ("pk_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4a717e7d8a41eecf5499ebd673" ON "t_test_location" USING GiST ("location") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_4a717e7d8a41eecf5499ebd673"`);
        await queryRunner.query(`DROP TABLE "t_test_location"`);
    }

}
