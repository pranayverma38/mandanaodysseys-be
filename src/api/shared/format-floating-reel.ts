export function formatFloatingReel(floatingReel: any) {
  return {
    id: floatingReel.id,
    video_url: floatingReel.video_url,
    title: floatingReel.title,
    location: floatingReel.location,
    created_at: floatingReel.created_at,
    updated_at: floatingReel.updated_at,
  }
}
