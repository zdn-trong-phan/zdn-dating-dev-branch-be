import { MigrationInterface, QueryRunner } from "typeorm";

export class updateColumnBlackList1679558597643 implements MigrationInterface {
    name = 'updateColumnBlackList1679558597643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "black_list" DROP COLUMN "block_id"`);
        await queryRunner.query(`ALTER TABLE "black_list" DROP CONSTRAINT "FK_bcb387b99088df57ebd053e30f1"`);
        await queryRunner.query(`ALTER TABLE "black_list" ALTER COLUMN "blocked_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "black_list" ADD CONSTRAINT "FK_bcb387b99088df57ebd053e30f1" FOREIGN KEY ("blocked_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "black_list" DROP CONSTRAINT "FK_bcb387b99088df57ebd053e30f1"`);
        await queryRunner.query(`ALTER TABLE "black_list" ALTER COLUMN "blocked_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "black_list" ADD CONSTRAINT "FK_bcb387b99088df57ebd053e30f1" FOREIGN KEY ("blocked_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "black_list" ADD "block_id" character varying NOT NULL`);
    }

}
