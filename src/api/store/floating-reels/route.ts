import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { FLOATING_REEL_MODULE } from '../../../modules/floating-reel'
import FloatingReelModuleService from '../../../modules/floating-reel/service'
import { formatFloatingReel } from '../../shared/format-floating-reel'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const floatingReelService: FloatingReelModuleService = req.scope.resolve(FLOATING_REEL_MODULE)
  const { limit = '20', offset = '0' } = req.query as Record<string, string>

  const [floatingReels, count] = await floatingReelService.listAndCountFloatingReels(
    {},
    {
      take: parseInt(limit),
      skip: parseInt(offset),
      order: { created_at: 'DESC' },
    }
  )

  res.json({
    floating_reels: floatingReels.map(formatFloatingReel),
    count,
  })
}
