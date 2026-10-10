import { model } from '@medusajs/framework/utils'

const Itinerary = model.define('itinerary', {
  id: model.id().primaryKey(),
  handle: model.text(),
  title: model.text(),
  badge: model.text().nullable(),
  destination: model.text(),
  address: model.text(),
  locations: model.json(),
  review_start: model.float().default(0),
  review_count: model.number().default(0),
  categories: model.json(),
  duration_days: model.number(),
  duration_nights: model.number(),
  mobility: model.text(),
  featured_image: model.text().nullable(),
  gallery_imgs: model.json(),
  amenities: model.json(),
  pricing: model.json(),
  description: model.text(),
  things_to_do: model.json(),
  includes: model.json(),
  excludes: model.json(),
  accommodations: model.json(),
  map_lat: model.float().nullable(),
  map_lng: model.float().nullable(),
  reviews: model.json(),
  is_active: model.boolean().default(true),
})

export default Itinerary
