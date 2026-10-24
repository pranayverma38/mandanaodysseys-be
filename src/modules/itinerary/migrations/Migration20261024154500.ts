import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261024154500 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "itinerary" add column if not exists "things_to_do_sub_activities" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "itinerary" drop column if exists "things_to_do_sub_activities";`);
  }

}
