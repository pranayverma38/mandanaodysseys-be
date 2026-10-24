import type { ItineraryFormData } from '../components/itinerary-form'

/** Convert form data → API request body */
export function buildApiPayload(form: ItineraryFormData) {
  return {
    handle: form.handle.trim(),
    title: form.title.trim(),
    badge: form.badge.trim() || null,
    destination: form.destination.trim(),
    address: form.address.trim(),
    locations: form.locations.map(l => ({
      name: l.name,
      lat: parseFloat(l.lat) || 0,
      lng: parseFloat(l.lng) || 0,
    })),
    review_start: parseFloat(form.review_start) || 0,
    review_count: parseInt(form.review_count) || 0,
    categories: form.categories,
    duration: {
      days: parseInt(form.duration.days) || 1,
      nights: parseInt(form.duration.nights) || 0,
    },
    mobility: form.mobility,
    featured_image: form.featured_image.trim() || null,
    pdf_link: form.pdf_link.trim() || null,
    gallery_imgs: form.gallery_imgs,
    gallery_videos: form.gallery_videos,
    amenities: form.amenities.map((amenity) => ({
      icon: amenity.icon.trim() || null,
      text: amenity.text.trim(),
    })),
    pricing: {
      price: form.pricing.price,
      originalPrice: form.pricing.original_price,
      feeAndTaxes: form.pricing.fee_and_taxes,
      total: form.pricing.total,
      ...(form.pricing.price_label ? { priceLabel: form.pricing.price_label } : {}),
    },
    description: form.description,
    things_to_do: form.things_to_do.map(t => ({
      name: t.name,
      time: t.time,
      description: t.description,
      imageUrl: t.imageUrl,
      lat: parseFloat(t.lat) || 0,
      lng: parseFloat(t.lng) || 0,
    })),
    includes: form.includes,
    excludes: form.excludes,
    accommodations: form.accommodations.map(a => ({
      name: a.name,
      imageUrl: a.imageUrl,
      rating: parseFloat(a.rating) || 4.5,
      location: a.location,
    })),
    map: {
      lat: parseFloat(form.map_lat) || null,
      lng: parseFloat(form.map_lng) || null,
    },
    reviews: form.reviews.map(r => ({
      id: r.id,
      title: r.title,
      rating: parseFloat(r.rating) || 5,
      content: r.content,
      author: r.author,
      date: r.date,
      datetime: r.datetime,
      authorAvatarUrl: r.author_avatar_url,
    })),
    is_active: form.is_active,
  }
}

/** Convert API response → form data */
export function buildFormData(it: any): ItineraryFormData {
  return {
    handle: it.handle || '',
    title: it.title || '',
    badge: it.badge || '',
    destination: it.destination || '',
    address: it.address || '',
    locations: (it.locations || []).map((l: any) => ({
      name: l.name || '',
      lat: String(l.lat || ''),
      lng: String(l.lng || ''),
    })),
    review_start: String(it.review_start || 4.8),
    review_count: String(it.review_count || 0),
    categories: it.categories || [],
    duration: {
      days: String(it.duration?.days || 7),
      nights: String(it.duration?.nights || 6),
    },
    mobility: it.mobility || 'Easy',
    featured_image: it.featured_image || '',
    pdf_link: it.pdf_link || '',
    gallery_imgs: it.gallery_imgs || [],
    gallery_videos: it.gallery_videos || [],
    amenities: (it.amenities || []).map((amenity: any) => ({
      icon: typeof amenity?.icon === 'string' ? amenity.icon : '',
      text: amenity?.text || '',
    })),
    pricing: {
      price: it.pricing?.price || '',
      original_price: it.pricing?.originalPrice || '',
      fee_and_taxes: it.pricing?.feeAndTaxes || '',
      total: it.pricing?.total || '',
      price_label: it.pricing?.priceLabel || '',
    },
    description: it.description || '',
    things_to_do: (it.things_to_do || []).map((t: any) => ({
      name: t.name || '',
      time: t.time || '',
      description: t.description || '',
      imageUrl: t.imageUrl || '',
      lat: String(t.lat || ''),
      lng: String(t.lng || ''),
    })),
    includes: it.includes || [],
    excludes: it.excludes || [],
    accommodations: (it.accommodations || []).map((a: any) => ({
      name: a.name || '',
      imageUrl: a.imageUrl || '',
      rating: String(a.rating || 4.5),
      location: a.location || '',
    })),
    map_lat: String(it.map?.lat || ''),
    map_lng: String(it.map?.lng || ''),
    reviews: (it.reviews || []).map((r: any) => ({
      id: r.id || String(Date.now()),
      title: r.title || '',
      rating: String(r.rating || 5),
      content: r.content || '',
      author: r.author || '',
      date: r.date || '',
      datetime: r.datetime || '',
      author_avatar_url: r.authorAvatarUrl || '',
    })),
    is_active: it.is_active !== false,
  }
}
