import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ITINERARY_MODULE } from '../../../modules/itinerary'
import ItineraryModuleService from '../../../modules/itinerary/service'
import { formatItinerary } from '../../shared/format-itinerary'

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
