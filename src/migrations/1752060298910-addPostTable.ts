import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPostTable1752060298910 implements MigrationInterface {
    name = 'AddPostTable1752060298910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`idCategoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_37010e329d22986df3917c526f4\` FOREIGN KEY (\`idCategoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_37010e329d22986df3917c526f4\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
    }

}
