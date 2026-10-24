import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ITINERARY_MODULE } from '../../../../modules/itinerary'
import ItineraryModuleService from '../../../../modules/itinerary/service'
import { formatItinerary } from '../../../shared/format-itinerary'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const itineraryService: ItineraryModuleService = req.scope.resolve(ITINERARY_MODULE)
  const { id } = req.params

  const itinerary = await itineraryService.retrieveItinerary(id)
  res.json({ itinerary: formatItinerary(itinerary) })
}

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  const itineraryService: ItineraryModuleService = req.scope.resolve(ITINERARY_MODULE)
  const { id } = req.params

  const body = req.body as Record<string, unknown>
  const duration = (body.duration as any) || {}

  const updateData: Record<string, unknown> = {}

  if (body.handle !== undefined) updateData.handle = body.handle
  if (body.title !== undefined) updateData.title = body.title
  if (body.badge !== undefined) updateData.badge = body.badge
  if (body.destination !== undefined) updateData.destination = body.destination
  if (body.address !== undefined) updateData.address = body.address
  if (body.locations !== undefined) updateData.locations = body.locations
  if (body.review_start !== undefined) updateData.review_start = Number(body.review_start)
  if (body.review_count !== undefined) updateData.review_count = Number(body.review_count)
  if (body.categories !== undefined) updateData.categories = body.categories
  if (duration.days !== undefined) updateData.duration_days = Number(duration.days)
  if (duration.nights !== undefined) updateData.duration_nights = Number(duration.nights)
  if (body.mobility !== undefined) updateData.mobility = body.mobility
  if (body.featured_image !== undefined) updateData.featured_image = body.featured_image
  if (body.gallery_imgs !== undefined) updateData.gallery_imgs = body.gallery_imgs
  if (body.gallery_videos !== undefined) updateData.gallery_videos = body.gallery_videos
  if (body.amenities !== undefined) updateData.amenities = body.amenities
  if (body.pricing !== undefined) updateData.pricing = body.pricing
  if (body.description !== undefined) updateData.description = body.description
  if (body.things_to_do !== undefined) updateData.things_to_do = body.things_to_do
  if (body.includes !== undefined) updateData.includes = body.includes
  if (body.excludes !== undefined) updateData.excludes = body.excludes
  if (body.accommodations !== undefined) updateData.accommodations = body.accommodations
  if ((body.map as any)?.lat !== undefined) updateData.map_lat = Number((body.map as any).lat)
  if ((body.map as any)?.lng !== undefined) updateData.map_lng = Number((body.map as any).lng)
  if (body.reviews !== undefined) updateData.reviews = body.reviews
  if (body.is_active !== undefined) updateData.is_active = body.is_active

  const itinerary = await itineraryService.updateItineraries({ id, ...updateData })
  res.json({ itinerary: formatItinerary(itinerary) })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const itineraryService: ItineraryModuleService = req.scope.resolve(ITINERARY_MODULE)
  const { id } = req.params

  await itineraryService.deleteItineraries(id)
  res.json({ id, deleted: true })
}
