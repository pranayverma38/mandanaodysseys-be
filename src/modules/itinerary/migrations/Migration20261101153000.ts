import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261101153000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "itinerary" add column if not exists "experiences" jsonb not null default '[]';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "itinerary" drop column if exists "experiences";`);
  }

}
