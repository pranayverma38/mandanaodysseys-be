import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ITINERARY_MODULE } from '../../../../modules/itinerary'
import ItineraryModuleService from '../../../../modules/itinerary/service'

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const itineraryService: ItineraryModuleService = req.scope.resolve(ITINERARY_MODULE)
  const { handle } = req.params

  const [itinerary] = await itineraryService.listItineraries(
    { handle, is_active: true },
    { take: 1 }
  )

  if (!itinerary) {
    return res.status(404).json({ message: 'Itinerary not found' })
  }

  res.json({ itinerary: formatItinerary(itinerary) })
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
