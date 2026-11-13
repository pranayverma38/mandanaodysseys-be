import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261113180000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "reel" ("id" text not null, "video_url" text not null, "title" text not null, "location" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "reel_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_reel_deleted_at" ON "reel" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "reel" cascade;`);
  }

}
