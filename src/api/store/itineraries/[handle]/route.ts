import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ITINERARY_MODULE } from '../../../../modules/itinerary'
import ItineraryModuleService from '../../../../modules/itinerary/service'
import { formatItinerary } from '../../../shared/format-itinerary'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
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
