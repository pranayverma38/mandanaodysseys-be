import { MedusaService } from '@medusajs/framework/utils'
import FloatingReel from './models/floating-reel'

class FloatingReelModuleService extends MedusaService({
  FloatingReel,
}) {}

export default FloatingReelModuleService
