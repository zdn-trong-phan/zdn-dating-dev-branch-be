import { MigrationInterface, QueryRunner } from "typeorm";

export class updateColumnProfile1679368308422 implements MigrationInterface {
    name = 'updateColumnProfile1679368308422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "reason" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "reason" SET NOT NULL`);
    }

}
