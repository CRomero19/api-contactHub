import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactsFix1690220893870 implements MigrationInterface {
    name = 'ContactsFix1690220893870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_82e70145f0669e778561f3877f2" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_752866c5247ddd34fd05559537d"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_82e70145f0669e778561f3877f2"`);
    }

}
