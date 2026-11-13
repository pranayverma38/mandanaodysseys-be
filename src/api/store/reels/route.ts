import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { REEL_MODULE } from '../../../modules/reel'
import ReelModuleService from '../../../modules/reel/service'
import { formatReel } from '../../shared/format-reel'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const reelService: ReelModuleService = req.scope.resolve(REEL_MODULE)
  const { limit = '20', offset = '0' } = req.query as Record<string, string>

  const [reels, count] = await reelService.listAndCountReels(
    {},
    {
      take: parseInt(limit),
      skip: parseInt(offset),
      order: { created_at: 'DESC' },
    }
  )

  res.json({
    reels: reels.map(formatReel),
    count,
  })
}
