import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ITINERARY_MODULE } from '../../../modules/itinerary'
import ItineraryModuleService from '../../../modules/itinerary/service'
import { formatItinerary } from '../../shared/format-itinerary'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const itineraryService: ItineraryModuleService = req.scope.resolve(ITINERARY_MODULE)

  const { limit = '100', offset = '0' } = req.query as Record<string, string>

  const [itineraries, count] = await itineraryService.listAndCountItineraries(
    {},
    {
      take: parseInt(limit),
      skip: parseInt(offset),
      order: { created_at: 'DESC' },
    }
  )

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

  const itinerary = await itineraryService.createItineraries(data as any)

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
    pdf_link: (body.pdf_link as string) || null,
    gallery_imgs: (body.gallery_imgs as string[]) || [],
    gallery_videos: (body.gallery_videos as string[]) || [],
    amenities: (body.amenities as any[]) || [],
    pricing: (body.pricing as object) || {},
    description: (body.description as string) || '',
    things_to_do: (body.things_to_do as any[]) || [],
    includes: (body.includes as string[]) || [],
    excludes: (body.excludes as string[]) || [],
    accommodations: (body.accommodations as any[]) || [],
    map_lat: (body.map as any)?.lat != null ? Number((body.map as any).lat) : null,
    map_lng: (body.map as any)?.lng != null ? Number((body.map as any).lng) : null,
    reviews: (body.reviews as any[]) || [],
    is_active: body.is_active !== false,
  }
}
