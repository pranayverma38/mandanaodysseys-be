import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { REEL_MODULE } from '../../../modules/reel'
import ReelModuleService from '../../../modules/reel/service'
import { formatReel } from '../../shared/format-reel'

function buildReelData(body: Record<string, unknown>) {
  return {
    video_url: String(body.video_url || '').trim(),
    title: String(body.title || '').trim(),
    location: String(body.location || '').trim(),
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const reelService: ReelModuleService = req.scope.resolve(REEL_MODULE)
  const { limit = '100', offset = '0' } = req.query as Record<string, string>

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
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const reelService: ReelModuleService = req.scope.resolve(REEL_MODULE)
  const body = req.body as Record<string, unknown>
  const data = buildReelData(body)

  if (!data.video_url || !data.title || !data.location) {
    res.status(400).json({
      message: 'video_url, title, and location are required',
    })
    return
  }

  const reel = await reelService.createReels(data as any)

  res.status(201).json({ reel: formatReel(reel) })
}
