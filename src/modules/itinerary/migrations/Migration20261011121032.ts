import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261011121032 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "itinerary" ("id" text not null, "handle" text not null, "title" text not null, "badge" text null, "destination" text not null, "address" text not null, "locations" jsonb not null, "review_start" real not null default 0, "review_count" integer not null default 0, "categories" jsonb not null, "duration_days" integer not null, "duration_nights" integer not null, "mobility" text not null, "featured_image" text null, "gallery_imgs" jsonb not null, "amenities" jsonb not null, "pricing" jsonb not null, "description" text not null, "things_to_do" jsonb not null, "includes" jsonb not null, "excludes" jsonb not null, "accommodations" jsonb not null, "map_lat" real null, "map_lng" real null, "reviews" jsonb not null, "is_active" boolean not null default true, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "itinerary_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_itinerary_deleted_at" ON "itinerary" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "itinerary" cascade;`);
  }

}
