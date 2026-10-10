import { MedusaService } from '@medusajs/framework/utils'
import Itinerary from './models/itinerary'

class ItineraryModuleService extends MedusaService({
  Itinerary,
}) {}

export default ItineraryModuleService
