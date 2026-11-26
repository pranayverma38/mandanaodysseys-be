import { Module } from '@medusajs/framework/utils'
import FloatingReelModuleService from './service'

export const FLOATING_REEL_MODULE = 'floatingReelModuleService'

export default Module(FLOATING_REEL_MODULE, {
  service: FloatingReelModuleService,
})
