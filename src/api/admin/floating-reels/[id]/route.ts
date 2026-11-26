import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { FLOATING_REEL_MODULE } from '../../../../modules/floating-reel'
import FloatingReelModuleService from '../../../../modules/floating-reel/service'

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const floatingReelService: FloatingReelModuleService = req.scope.resolve(FLOATING_REEL_MODULE)
  const { id } = req.params

  await floatingReelService.deleteFloatingReels(id)

  res.json({ id, deleted: true })
}
