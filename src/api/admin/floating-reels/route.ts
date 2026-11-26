import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { FLOATING_REEL_MODULE } from '../../../modules/floating-reel'
import FloatingReelModuleService from '../../../modules/floating-reel/service'
import { formatFloatingReel } from '../../shared/format-floating-reel'

function buildFloatingReelData(body: Record<string, unknown>) {
  return {
    video_url: String(body.video_url || '').trim(),
    title: String(body.title || '').trim(),
    location: String(body.location || '').trim(),
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const floatingReelService: FloatingReelModuleService = req.scope.resolve(FLOATING_REEL_MODULE)
  const { limit = '100', offset = '0' } = req.query as Record<string, string>

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
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const floatingReelService: FloatingReelModuleService = req.scope.resolve(FLOATING_REEL_MODULE)
  const body = req.body as Record<string, unknown>
  const data = buildFloatingReelData(body)

  if (!data.video_url || !data.title || !data.location) {
    res.status(400).json({
      message: 'video_url, title, and location are required',
    })
    return
  }

  const floatingReel = await floatingReelService.createFloatingReels(data as any)

  res.status(201).json({ floating_reel: formatFloatingReel(floatingReel) })
}
