import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnProfile1679367326486 implements MigrationInterface {
    name = 'addColumnProfile1679367326486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" ADD "public_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "avatar" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "reason" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "reason"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "public_id"`);
    }

}
