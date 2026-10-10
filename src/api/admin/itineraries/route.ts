import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ITINERARY_MODULE } from '../../../modules/itinerary'
import ItineraryModuleService from '../../../modules/itinerary/service'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const itineraryService: ItineraryModuleService = req.scope.resolve(ITINERARY_MODULE)

  const { limit = '100', offset = '0' } = req.query as Record<string, string>

  const itineraries = await itineraryService.listItineraries(
    {},
    {
      take: parseInt(limit),
      skip: parseInt(offset),
      order: { created_at: 'DESC' },
    }
  )

  const count = await itineraryService.countItineraries()

  res.json({
    itineraries: itineraries.map(formatItinerary),
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const itineraryService: ItineraryModuleService = req.scope.resolve(ITINERARY_MODULE)

  const body = req.body as Record<string, unknown>
  const data = buildItineraryData(body)

  const itinerary = await itineraryService.createItineraries(data)

  res.status(201).json({ itinerary: formatItinerary(itinerary) })
}

function buildItineraryData(body: Record<string, unknown>) {
  const duration = (body.duration as any) || {}
  return {
    handle: body.handle as string,
    title: body.title as string,
    badge: (body.badge as string) || null,
    destination: body.destination as string,
    address: body.address as string,
    locations: (body.locations as any[]) || [],
    review_start: Number(body.review_start) || 0,
    review_count: Number(body.review_count) || 0,
    categories: (body.categories as any[]) || [],
    duration_days: Number(duration.days) || 1,
    duration_nights: Number(duration.nights) || 0,
    mobility: (body.mobility as string) || 'Easy',
    featured_image: (body.featured_image as string) || null,
    gallery_imgs: (body.gallery_imgs as string[]) || [],
    amenities: (body.amenities as any[]) || [],
    pricing: (body.pricing as object) || {},
    description: (body.description as string) || '',
    things_to_do: (body.things_to_do as any[]) || [],
    includes: (body.includes as string[]) || [],
    excludes: (body.excludes as string[]) || [],
    accommodations: (body.accommodations as any[]) || [],
    map_lat: (body.map as any)?.lat ? Number((body.map as any).lat) : null,
    map_lng: (body.map as any)?.lng ? Number((body.map as any).lng) : null,
    reviews: (body.reviews as any[]) || [],
    is_active: body.is_active !== false,
  }
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
    is_active: it.is_active,
    created_at: it.created_at,
    updated_at: it.updated_at,
  }
}
