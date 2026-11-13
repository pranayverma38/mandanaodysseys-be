import { MedusaService } from '@medusajs/framework/utils'
import Reel from './models/reel'

class ReelModuleService extends MedusaService({
  Reel,
}) {}

export default ReelModuleService
