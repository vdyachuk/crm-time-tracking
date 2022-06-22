import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1655571951028 implements MigrationInterface {
  name = 'init1655571951028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "departments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."projects_type_enum" AS ENUM('undefined', 'backend', 'frontend', 'mobile', 'desktop')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."projects_status_enum" AS ENUM('paused', 'in_progress', 'ended', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "type" "public"."projects_type_enum" NOT NULL DEFAULT 'undefined', "status" "public"."projects_status_enum" NOT NULL DEFAULT 'paused', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "departmentId" uuid, "clientId" uuid, CONSTRAINT "REL_a63577f1af41220752b20fb58c" UNIQUE ("departmentId"), CONSTRAINT "REL_091f9433895a53408cb8ae3864" UNIQUE ("clientId"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "loggedDays" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "hours" numeric NOT NULL, "minutes" numeric NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "projectId" uuid, CONSTRAINT "PK_5cc4b8018673e6cc8b5470a5b65" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "userId" uuid, CONSTRAINT "REL_315ecd98bd1a42dcf2ec4e2e98" UNIQUE ("userId"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."users_provider_enum" AS ENUM('native', 'microsoft')`);
    await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('idle', 'working', 'on_bench')`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255), "salary" numeric, "provider" "public"."users_provider_enum" NOT NULL DEFAULT 'native', "status" "public"."users_status_enum" NOT NULL DEFAULT 'idle', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" uuid, "departmentId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_368e146b785b574f42ae9e53d5" UNIQUE ("roleId"), CONSTRAINT "REL_554d853741f2083faaa5794d2a" UNIQUE ("departmentId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "projectId" uuid, CONSTRAINT "PK_2c804ed4019b80ce48eedba5cec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notificationTypes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_31bac0331b9b54c1c8c977ef37c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roleNotificationTypes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "template" text NOT NULL, "notificationTypeId" uuid, "roleId" uuid, CONSTRAINT "PK_200960249b0577c1a9796cd405c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" text NOT NULL, "isDelivered" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleNotificationTypeId" uuid, "projectId" uuid, "userId" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "departmentId" uuid, CONSTRAINT "REL_79c25c981447c1a9bb01ddb19f" UNIQUE ("departmentId"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects_users_users" ("projectsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_b95933b7c73ac3da347cc5d3c44" PRIMARY KEY ("projectsId", "usersId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_dba863a033479a80f18dc58c7f" ON "projects_users_users" ("projectsId") `);
    await queryRunner.query(`CREATE INDEX "IDX_9181fa056d2ce94965926ac2e5" ON "projects_users_users" ("usersId") `);
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_a63577f1af41220752b20fb58c6" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_091f9433895a53408cb8ae3864f" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "loggedDays" ADD CONSTRAINT "FK_8dfef5dd23ce38e494ede53d8b4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "loggedDays" ADD CONSTRAINT "FK_faf1fb50a9b4097dccb35ee3846" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_554d853741f2083faaa5794d2ae" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rates" ADD CONSTRAINT "FK_cd296144bf64811ed81e3058af1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rates" ADD CONSTRAINT "FK_bc3ff5e86a60311ae0220c1d3df" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roleNotificationTypes" ADD CONSTRAINT "FK_dc22c01c79c0ac0bdf231130fd4" FOREIGN KEY ("notificationTypeId") REFERENCES "notificationTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roleNotificationTypes" ADD CONSTRAINT "FK_7952d9950b4d5c3a741b33533e4" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_4e1de2d411d4a81f0316fcba27e" FOREIGN KEY ("roleNotificationTypeId") REFERENCES "roleNotificationTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_124708b9c8bc9778d960799e3e0" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_79c25c981447c1a9bb01ddb19f2" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_users_users" ADD CONSTRAINT "FK_dba863a033479a80f18dc58c7fe" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_users_users" ADD CONSTRAINT "FK_9181fa056d2ce94965926ac2e55" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects_users_users" DROP CONSTRAINT "FK_9181fa056d2ce94965926ac2e55"`);
    await queryRunner.query(`ALTER TABLE "projects_users_users" DROP CONSTRAINT "FK_dba863a033479a80f18dc58c7fe"`);
    await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_79c25c981447c1a9bb01ddb19f2"`);
    await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
    await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_124708b9c8bc9778d960799e3e0"`);
    await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_4e1de2d411d4a81f0316fcba27e"`);
    await queryRunner.query(`ALTER TABLE "roleNotificationTypes" DROP CONSTRAINT "FK_7952d9950b4d5c3a741b33533e4"`);
    await queryRunner.query(`ALTER TABLE "roleNotificationTypes" DROP CONSTRAINT "FK_dc22c01c79c0ac0bdf231130fd4"`);
    await queryRunner.query(`ALTER TABLE "rates" DROP CONSTRAINT "FK_bc3ff5e86a60311ae0220c1d3df"`);
    await queryRunner.query(`ALTER TABLE "rates" DROP CONSTRAINT "FK_cd296144bf64811ed81e3058af1"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_554d853741f2083faaa5794d2ae"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"`);
    await queryRunner.query(`ALTER TABLE "loggedDays" DROP CONSTRAINT "FK_faf1fb50a9b4097dccb35ee3846"`);
    await queryRunner.query(`ALTER TABLE "loggedDays" DROP CONSTRAINT "FK_8dfef5dd23ce38e494ede53d8b4"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_091f9433895a53408cb8ae3864f"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a63577f1af41220752b20fb58c6"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9181fa056d2ce94965926ac2e5"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_dba863a033479a80f18dc58c7f"`);
    await queryRunner.query(`DROP TABLE "projects_users_users"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TABLE "roleNotificationTypes"`);
    await queryRunner.query(`DROP TABLE "notificationTypes"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "rates"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_provider_enum"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TABLE "loggedDays"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."projects_type_enum"`);
    await queryRunner.query(`DROP TABLE "departments"`);
  }
}
