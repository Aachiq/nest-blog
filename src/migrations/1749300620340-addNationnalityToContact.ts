import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNationnalityToContact1749300620340 implements MigrationInterface {
    name = 'AddNationnalityToContact1749300620340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contacts\` ADD \`nationality\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contacts\` DROP COLUMN \`nationality\``);
    }

}
