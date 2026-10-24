import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261024115000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "itinerary" add column if not exists "gallery_videos" jsonb not null default '[]';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "itinerary" drop column if exists "gallery_videos";`);
  }

}
