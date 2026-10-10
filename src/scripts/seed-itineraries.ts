import { ExecArgs } from '@medusajs/framework/types'
import { ITINERARY_MODULE } from '../modules/itinerary'

const ITINERARIES = [
  {
    handle: 'golden-triangle-india-tour',
    title: 'Golden Triangle India Tour',
    badge: 'Bestseller',
    destination: 'india',
    address: 'Delhi · Agra · Jaipur',
    locations: [
      { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
      { name: 'Agra', lat: 27.1767, lng: 78.0081 },
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    ],
    review_start: 4.9,
    review_count: 312,
    categories: [
      { category: 'cultural-heritage-tours' },
      { category: 'customized-holidays' },
    ],
    duration_days: 6,
    duration_nights: 5,
    mobility: 'Easy',
    featured_image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_imgs: [
      'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    amenities: [
      { icon: 'Car01Icon', text: 'Private A/C cab throughout' },
      { icon: 'ChefHatIcon', text: 'Daily breakfast included' },
      { icon: 'Camera01Icon', text: 'Professional guide' },
    ],
    pricing: { price: '$1,299', originalPrice: '$1,599', feeAndTaxes: '$144', total: '$1,443' },
    description: 'Explore India\'s most iconic triangle — the imperial grandeur of Delhi, the timeless Taj Mahal in Agra, and the pink-hued palaces of Jaipur — across six unforgettable days.',
    things_to_do: [
      { name: 'Taj Mahal at Sunrise', time: 'Day 2 · 6:00 AM', description: 'Visit the Taj Mahal at dawn for the most magical experience.', imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800', lat: 27.1751, lng: 78.0421 },
      { name: 'Amber Fort, Jaipur', time: 'Day 4 · Morning', description: 'Explore the stunning hilltop Amber Fort with its ornate interiors.', imageUrl: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=800', lat: 26.9855, lng: 75.8513 },
    ],
    includes: ['5 nights hotel accommodation', 'Daily breakfast', 'Private A/C cab', 'Monument entry fees', 'English-speaking guide', 'All taxes'],
    excludes: ['Flights to/from Delhi', 'Lunch and dinner', 'Personal expenses', 'Tips', 'Travel insurance'],
    accommodations: [
      { name: 'The Lalit New Delhi', imageUrl: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800', rating: 4.8, location: 'New Delhi' },
      { name: 'ITC Mughal, Agra', imageUrl: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=800', rating: 4.9, location: 'Agra' },
    ],
    map_lat: 27.5,
    map_lng: 77.0,
    reviews: [
      { id: '1', title: "Incredible journey", rating: 5, content: "The Taj at sunrise was worth every penny. Perfectly organized tour.", author: "Emma Williams", date: "Apr 10, 2025", datetime: "2025-04-10", authorAvatarUrl: '' },
    ],
    is_active: true,
  },
  {
    handle: 'bali-honeymoon-retreat',
    title: 'Bali Honeymoon Retreat',
    badge: 'Romantic',
    destination: 'bali',
    address: 'Ubud · Seminyak · Uluwatu',
    locations: [
      { name: 'Ubud', lat: -8.5069, lng: 115.2625 },
      { name: 'Seminyak', lat: -8.6913, lng: 115.1682 },
      { name: 'Uluwatu', lat: -8.8291, lng: 115.0849 },
    ],
    review_start: 4.9,
    review_count: 203,
    categories: [
      { category: 'honeymoon-packages' },
      { category: 'luxury-escapes' },
      { category: 'beach-holidays' },
    ],
    duration_days: 7,
    duration_nights: 6,
    mobility: 'Easy',
    featured_image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_imgs: [
      'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    amenities: [
      { icon: 'BedSingle02Icon', text: 'Private pool villas' },
      { icon: 'ChefHatIcon', text: 'Couples spa & dining' },
      { icon: 'Beach02Icon', text: 'Beach club access' },
    ],
    pricing: { price: '$2,899', originalPrice: '$3,399', feeAndTaxes: '$322', total: '$3,221' },
    description: "Celebrate your honeymoon across Bali's most romantic settings—from Ubud's jungle villas and couples spa rituals to Seminyak sunsets and a private cliffside dinner at Uluwatu.",
    things_to_do: [
      { name: 'Ubud Rice Terrace & Spa', time: 'Day 1–2 · Flexible', description: 'Walk Tegallalang rice terraces and unwind with a traditional Balinese couples massage.', imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800', lat: -8.4312, lng: 115.2799 },
      { name: 'Seminyak Beach & Sunset', time: 'Day 3–4 · Afternoons', description: 'Beach club days, oceanfront dining, and golden-hour cocktails on Seminyak Beach.', imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800', lat: -8.6913, lng: 115.1682 },
      { name: 'Uluwatu Temple & Kecak Dance', time: 'Day 5 · 4:00 PM - 8:00 PM', description: 'Watch the sunset Kecak fire dance perched above the Indian Ocean cliffs.', imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800', lat: -8.8291, lng: 115.0849 },
      { name: 'Private Candlelit Dinner', time: 'Day 6 · 7:00 PM', description: "A chef-curated private dinner under the stars at your villa.", imageUrl: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800', lat: -8.5193, lng: 115.2633 },
    ],
    includes: ['6 nights luxury villa and resort stays', 'Daily breakfast and 3 romantic dinners', 'Private airport transfers (DPS)', 'Couples spa treatment in Ubud', 'Uluwatu temple & Kecak dance tickets', 'Private candlelit villa dinner', 'All applicable taxes'],
    excludes: ['International flights', 'Travel insurance', 'Personal expenses', 'Optional water sports', 'Alcoholic beverages (except welcome drink)', 'Tips and gratuities'],
    accommodations: [
      { name: 'Hanging Gardens of Bali', imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800', rating: 4.9, location: 'Ubud, Bali' },
      { name: 'Potato Head Beach Club Hotel', imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800', rating: 4.8, location: 'Seminyak, Bali' },
    ],
    map_lat: -8.4095,
    map_lng: 115.1889,
    reviews: [
      { id: '1', title: 'Dream honeymoon', rating: 5, content: 'The private pool villa and cliffside dinner made our trip unforgettable.', author: 'S. Walkinshaw', date: 'May 16, 2025', datetime: '2025-05-16', authorAvatarUrl: '' },
    ],
    is_active: true,
  },
]

export default async function seedItineraries({ container }: ExecArgs) {
  const itineraryService = container.resolve(ITINERARY_MODULE)

  console.log('Seeding itineraries...')

  for (const data of ITINERARIES) {
    const existing = await itineraryService.listItineraries({ handle: data.handle })
    if (existing.length > 0) {
      console.log(`  Skipping ${data.handle} (already exists)`)
      continue
    }
    await itineraryService.createItineraries(data)
    console.log(`  Created: ${data.title}`)
  }

  console.log('Itinerary seed complete.')
}
