import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1708008121785 implements MigrationInterface {
    name = 'InitialMigration1708008121785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parent" ("user_id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, CONSTRAINT "PK_2e1c234ae8f8bb156922e8e417d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "child" ("child_id" SERIAL NOT NULL, "child_name" character varying NOT NULL, "user_id" integer NOT NULL, "number_of_activateItems" integer NOT NULL, CONSTRAINT "PK_78d98f3675ecbce08b9777fbb94" PRIMARY KEY ("child_id"))`);
        await queryRunner.query(`CREATE TABLE "habit" ("habit_id" SERIAL NOT NULL, "habit_name" character varying NOT NULL, CONSTRAINT "PK_768d697fe13c306bac0eaf6f58d" PRIMARY KEY ("habit_id"))`);
        await queryRunner.query(`CREATE TABLE "habit_child_map" ("habit_child_map_id" SERIAL NOT NULL, "child_id" integer NOT NULL, "habit_id" integer NOT NULL, "habit_status" boolean NOT NULL, CONSTRAINT "PK_3d183dbd5a3d84ae579247fc8ff" PRIMARY KEY ("habit_child_map_id"))`);
        await queryRunner.query(`ALTER TABLE "habit_child_map" ADD CONSTRAINT "FK_57c410609da4a0141a0ed652884" FOREIGN KEY ("habit_id") REFERENCES "habit"("habit_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "habit_child_map" ADD CONSTRAINT "FK_5f27337317b9a087292d7012d79" FOREIGN KEY ("child_id") REFERENCES "child"("child_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit_child_map" DROP CONSTRAINT "FK_5f27337317b9a087292d7012d79"`);
        await queryRunner.query(`ALTER TABLE "habit_child_map" DROP CONSTRAINT "FK_57c410609da4a0141a0ed652884"`);
        await queryRunner.query(`DROP TABLE "habit_child_map"`);
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`DROP TABLE "child"`);
        await queryRunner.query(`DROP TABLE "parent"`);
    }

}
