import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261024135200 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "itinerary" add column if not exists "pdf_link" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "itinerary" drop column if exists "pdf_link";`);
  }

}
