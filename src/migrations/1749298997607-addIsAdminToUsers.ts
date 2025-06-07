import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsAdminToUsers1749298997607 implements MigrationInterface {
    name = 'AddIsAdminToUsers1749298997607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isAdmin\``);
    }

}
