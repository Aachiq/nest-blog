import { MigrationInterface, QueryRunner } from "typeorm";

export class DropColmunIsAdminUsersTable1749300732483 implements MigrationInterface {
    name = 'DropColmunIsAdminUsersTable1749300732483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isAdmin\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT '0'`);
    }

}
