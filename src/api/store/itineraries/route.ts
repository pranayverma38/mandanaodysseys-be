import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ITINERARY_MODULE } from '../../../modules/itinerary'
import ItineraryModuleService from '../../../modules/itinerary/service'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const itineraryService: ItineraryModuleService = req.scope.resolve(ITINERARY_MODULE)

  const { destination, category, limit = '100', offset = '0' } = req.query as Record<string, string>

  const filters: Record<string, unknown> = { is_active: true }
  if (destination) filters.destination = destination

  const itineraries = await itineraryService.listItineraries(filters, {
    take: parseInt(limit),
    skip: parseInt(offset),
    order: { created_at: 'DESC' },
  })

  let result = itineraries

  if (category) {
    result = itineraries.filter((it: any) =>
      Array.isArray(it.categories) &&
      it.categories.some((c: { category: string }) => c.category === category)
    )
  }

  res.json({
    itineraries: result.map(formatItinerary),
    count: result.length,
  })
}

function formatItinerary(it: any) {
  return {
    id: it.id,
    handle: it.handle,
    title: it.title,
    badge: it.badge,
    destination: it.destination,
    address: it.address,
    locations: it.locations || [],
    review_start: it.review_start,
    review_count: it.review_count,
    categories: it.categories || [],
    duration: {
      days: it.duration_days,
      nights: it.duration_nights,
      label: `${it.duration_days} Days / ${it.duration_nights} Nights`,
    },
    mobility: it.mobility,
    featured_image: it.featured_image,
    gallery_imgs: it.gallery_imgs || [],
    amenities: it.amenities || [],
    pricing: it.pricing || {},
    description: it.description,
    things_to_do: it.things_to_do || [],
    includes: it.includes || [],
    excludes: it.excludes || [],
    accommodations: it.accommodations || [],
    map: { lat: it.map_lat, lng: it.map_lng },
    reviews: it.reviews || [],
    created_at: it.created_at,
    updated_at: it.updated_at,
  }
}
