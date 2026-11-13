import { Module } from '@medusajs/framework/utils'
import ReelModuleService from './service'

export const REEL_MODULE = 'reelModuleService'

export default Module(REEL_MODULE, {
  service: ReelModuleService,
})
