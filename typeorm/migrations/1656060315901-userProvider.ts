import { MigrationInterface, QueryRunner } from 'typeorm';

export class userProvider1656060315901 implements MigrationInterface {
  name = 'userProvider1656060315901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."providers_type_enum" AS ENUM('native', 'microsoft')`);
    await queryRunner.query(
      `CREATE TABLE "providers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."providers_type_enum" NOT NULL DEFAULT 'microsoft', "oid" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider"`);
    await queryRunner.query(`DROP TYPE "public"."users_provider_enum"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
    await queryRunner.query(
      `ALTER TABLE "providers" ADD CONSTRAINT "FK_b0a257f97e76b698c4935b27d7d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "providers" DROP CONSTRAINT "FK_b0a257f97e76b698c4935b27d7d"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    await queryRunner.query(`CREATE TYPE "public"."users_provider_enum" AS ENUM('native', 'microsoft')`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "provider" "public"."users_provider_enum" NOT NULL DEFAULT 'native'`,
    );
    await queryRunner.query(`DROP TABLE "providers"`);
    await queryRunner.query(`DROP TYPE "public"."providers_type_enum"`);
  }
}
