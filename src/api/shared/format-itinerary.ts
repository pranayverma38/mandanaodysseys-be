import { resolveSubActivities } from './things-to-do'

/** Shared formatter: normalises DB row → API response shape the frontend expects. */
export function formatItinerary(it: any) {
  const days = Math.round(Number(it.duration_days))
  const nights = Math.round(Number(it.duration_nights))

  return {
    id: it.id,
    handle: it.handle,
    title: it.title,
    badge: it.badge ?? null,
    destination: it.destination,
    address: it.address,
    locations: (it.locations || []).map((l: any) => ({
      name: l.name,
      lat: Number(l.lat),
      lng: Number(l.lng),
    })),
    review_start: Number(it.review_start),
    review_count: Math.round(Number(it.review_count)),
    categories: it.categories || [],
    duration: {
      days,
      nights,
      label: `${days} Days / ${nights} Nights`,
    },
    mobility: it.mobility,
    featured_image: it.featured_image ?? null,
    pdf_link: it.pdf_link ?? null,
    gallery_imgs: it.gallery_imgs || [],
    gallery_videos: it.gallery_videos || [],
    amenities: (it.amenities || []).map((amenity: any) => ({
      icon: typeof amenity?.icon === 'string' ? amenity.icon : null,
      text: amenity?.text || '',
    })),
    pricing: it.pricing || {},
    description: it.description,
    things_to_do: (it.things_to_do || []).map((t: any, index: number) => ({
      name: t.name,
      time: t.time,
      description: t.description,
      imageUrl: t.imageUrl,
      lat: Number(t.lat),
      lng: Number(t.lng),
      sub_activities: resolveSubActivities(it.things_to_do_sub_activities, index, t.sub_activities),
    })),
    includes: it.includes || [],
    excludes: it.excludes || [],
    accommodations: (it.accommodations || []).map((a: any) => ({
      name: a.name,
      imageUrl: a.imageUrl,
      rating: Number(a.rating),
      location: a.location,
    })),
    map: {
      lat: it.map_lat != null ? Number(it.map_lat) : null,
      lng: it.map_lng != null ? Number(it.map_lng) : null,
    },
    reviews: (it.reviews || []).map((r: any) => ({
      id: r.id,
      title: r.title,
      rating: Number(r.rating),
      content: r.content,
      author: r.author,
      date: r.date,
      datetime: r.datetime,
      authorAvatarUrl: r.authorAvatarUrl || '',
    })),
    is_active: it.is_active,
    created_at: it.created_at,
    updated_at: it.updated_at,
  }
}
