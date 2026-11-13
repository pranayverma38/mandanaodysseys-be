export function formatReel(reel: any) {
  return {
    id: reel.id,
    video_url: reel.video_url,
    title: reel.title,
    location: reel.location,
    created_at: reel.created_at,
    updated_at: reel.updated_at,
  }
}
