import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigrations1678792321272 implements MigrationInterface {
    name = 'SecondMigrations1678792321272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "birthday" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "birthday" TIMESTAMP NOT NULL`);
    }

}
