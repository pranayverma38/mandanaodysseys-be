import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { REEL_MODULE } from '../../../../modules/reel'
import ReelModuleService from '../../../../modules/reel/service'

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const reelService: ReelModuleService = req.scope.resolve(REEL_MODULE)
  const { id } = req.params

  await reelService.deleteReels(id)

  res.json({ id, deleted: true })
}
