import { Module } from '@medusajs/framework/utils'
import ItineraryModuleService from './service'

export const ITINERARY_MODULE = 'itineraryModuleService'

export default Module(ITINERARY_MODULE, {
  service: ItineraryModuleService,
})
