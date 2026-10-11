import { Button, Input, Textarea, Select, Switch, Text, Heading, Badge } from '@medusajs/ui'
import { Plus, XMark } from '@medusajs/icons'
import { useState } from 'react'
import { FRONTEND_SUPPORTED_CATEGORY_OPTIONS } from '../utils/frontend-category-options'
import { DEFAULT_AMENITY_ICON, FRONTEND_SUPPORTED_ICON_OPTIONS } from '../utils/frontend-icon-options'

export type ItineraryFormData = {
  handle: string
  title: string
  badge: string
  destination: string
  address: string
  locations: { name: string; lat: string; lng: string }[]
  review_start: string
  review_count: string
  categories: { category: string }[]
  duration: { days: string; nights: string }
  mobility: string
  featured_image: string
  gallery_imgs: string[]
  amenities: { icon: string; text: string }[]
  pricing: { price: string; original_price: string; fee_and_taxes: string; total: string; price_label: string }
  description: string
  things_to_do: { name: string; time: string; description: string; imageUrl: string; lat: string; lng: string }[]
  includes: string[]
  excludes: string[]
  accommodations: { name: string; imageUrl: string; rating: string; location: string }[]
  map_lat: string
  map_lng: string
  reviews: { id: string; title: string; rating: string; content: string; author: string; date: string; datetime: string; author_avatar_url: string }[]
  is_active: boolean
}

export const DEFAULT_FORM_DATA: ItineraryFormData = {
  handle: '',
  title: '',
  badge: '',
  destination: '',
  address: '',
  locations: [],
  review_start: '4.8',
  review_count: '0',
  categories: [],
  duration: { days: '7', nights: '6' },
  mobility: 'Easy',
  featured_image: '',
  gallery_imgs: [],
  amenities: [],
  pricing: { price: '', original_price: '', fee_and_taxes: '', total: '', price_label: '' },
  description: '',
  things_to_do: [],
  includes: [],
  excludes: [],
  accommodations: [],
  map_lat: '',
  map_lng: '',
  reviews: [],
  is_active: true,
}

const MOBILITY_OPTIONS = ['Easy', 'Light Activity', 'Moderate', 'Active']

type SectionProps = { title: string; children: React.ReactNode }
function Section({ title, children }: SectionProps) {
  return (
    <div className="border border-ui-border-base rounded-lg p-5 space-y-4">
      <Heading level="h3" className="text-ui-fg-base">{title}</Heading>
      {children}
    </div>
  )
}

type FieldProps = { label: string; children: React.ReactNode; required?: boolean }
function Field({ label, children, required }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Text size="small" weight="plus" className="text-ui-fg-subtle">
        {label}{required && <span className="text-ui-fg-error ml-0.5">*</span>}
      </Text>
      {children}
    </div>
  )
}

type Props = {
  data: ItineraryFormData
  onChange: (data: ItineraryFormData) => void
  loading?: boolean
  onSubmit: () => void
  submitLabel: string
  onCancel: () => void
}

export default function ItineraryForm({ data, onChange, loading, onSubmit, submitLabel, onCancel }: Props) {
  const set = (field: keyof ItineraryFormData, value: unknown) =>
    onChange({ ...data, [field]: value })

  const setPricing = (field: keyof ItineraryFormData['pricing'], value: string) =>
    onChange({ ...data, pricing: { ...data.pricing, [field]: value } })

  const setDuration = (field: keyof ItineraryFormData['duration'], value: string) =>
    onChange({ ...data, duration: { ...data.duration, [field]: value } })

  // ---- Locations ----
  const addLocation = () =>
    set('locations', [...data.locations, { name: '', lat: '', lng: '' }])
  const updateLocation = (i: number, field: string, value: string) => {
    const locs = [...data.locations]
    locs[i] = { ...locs[i], [field]: value }
    set('locations', locs)
  }
  const removeLocation = (i: number) =>
    set('locations', data.locations.filter((_, idx) => idx !== i))

  // ---- Categories ----
  const [newCategory, setNewCategory] = useState('')
  const addCategory = () => {
    if (!newCategory.trim()) return
    if (data.categories.some((category) => category.category === newCategory)) return
    set('categories', [...data.categories, { category: newCategory }])
    setNewCategory('')
  }
  const removeCategory = (i: number) =>
    set('categories', data.categories.filter((_, idx) => idx !== i))

  // ---- Gallery ----
  const [newGalleryUrl, setNewGalleryUrl] = useState('')
  const addGalleryImg = () => {
    if (!newGalleryUrl.trim()) return
    set('gallery_imgs', [...data.gallery_imgs, newGalleryUrl.trim()])
    setNewGalleryUrl('')
  }
  const removeGalleryImg = (i: number) =>
    set('gallery_imgs', data.gallery_imgs.filter((_, idx) => idx !== i))

  // ---- Amenities ----
  const addAmenity = () =>
    set('amenities', [...data.amenities, { icon: DEFAULT_AMENITY_ICON, text: '' }])
  const updateAmenity = (i: number, field: string, value: string) => {
    const items = [...data.amenities]
    items[i] = { ...items[i], [field]: value }
    set('amenities', items)
  }
  const removeAmenity = (i: number) =>
    set('amenities', data.amenities.filter((_, idx) => idx !== i))

  // ---- Things To Do ----
  const addThingToDo = () =>
    set('things_to_do', [...data.things_to_do, { name: '', time: '', description: '', imageUrl: '', lat: '', lng: '' }])
  const updateThingToDo = (i: number, field: string, value: string) => {
    const items = [...data.things_to_do]
    items[i] = { ...items[i], [field]: value }
    set('things_to_do', items)
  }
  const removeThingToDo = (i: number) =>
    set('things_to_do', data.things_to_do.filter((_, idx) => idx !== i))

  // ---- Includes ----
  const [newInclude, setNewInclude] = useState('')
  const addInclude = () => {
    if (!newInclude.trim()) return
    set('includes', [...data.includes, newInclude.trim()])
    setNewInclude('')
  }
  const removeInclude = (i: number) =>
    set('includes', data.includes.filter((_, idx) => idx !== i))

  // ---- Excludes ----
  const [newExclude, setNewExclude] = useState('')
  const addExclude = () => {
    if (!newExclude.trim()) return
    set('excludes', [...data.excludes, newExclude.trim()])
    setNewExclude('')
  }
  const removeExclude = (i: number) =>
    set('excludes', data.excludes.filter((_, idx) => idx !== i))

  // ---- Accommodations ----
  const addAccommodation = () =>
    set('accommodations', [...data.accommodations, { name: '', imageUrl: '', rating: '4.5', location: '' }])
  const updateAccommodation = (i: number, field: string, value: string) => {
    const items = [...data.accommodations]
    items[i] = { ...items[i], [field]: value }
    set('accommodations', items)
  }
  const removeAccommodation = (i: number) =>
    set('accommodations', data.accommodations.filter((_, idx) => idx !== i))

  // ---- Reviews ----
  const addReview = () =>
    set('reviews', [...data.reviews, {
      id: String(Date.now()),
      title: '', rating: '5', content: '',
      author: '', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      datetime: new Date().toISOString().split('T')[0],
      author_avatar_url: '',
    }])
  const updateReview = (i: number, field: string, value: string) => {
    const items = [...data.reviews]
    items[i] = { ...items[i], [field]: value }
    set('reviews', items)
  }
  const removeReview = (i: number) =>
    set('reviews', data.reviews.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Section title="Basic Information">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title" required>
            <Input value={data.title} onChange={e => set('title', e.target.value)} placeholder="Bali Honeymoon Retreat" />
          </Field>
          <Field label="Handle (URL slug)" required>
            <Input value={data.handle} onChange={e => set('handle', e.target.value)} placeholder="bali-honeymoon-retreat" />
          </Field>
          <Field label="Badge">
            <Input value={data.badge} onChange={e => set('badge', e.target.value)} placeholder="Romantic" />
          </Field>
          <Field label="Destination slug" required>
            <Input value={data.destination} onChange={e => set('destination', e.target.value)} placeholder="bali" />
          </Field>
          <Field label="Address / Route" required>
            <Input value={data.address} onChange={e => set('address', e.target.value)} placeholder="Ubud · Seminyak · Uluwatu" />
          </Field>
          <Field label="Mobility">
            <Select value={data.mobility} onValueChange={v => set('mobility', v)}>
              <Select.Trigger>
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                {MOBILITY_OPTIONS.map(m => (
                  <Select.Item key={m} value={m}>{m}</Select.Item>
                ))}
              </Select.Content>
            </Select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Duration — Days" required>
            <Input type="number" min="1" value={data.duration.days} onChange={e => setDuration('days', e.target.value)} />
          </Field>
          <Field label="Duration — Nights" required>
            <Input type="number" min="0" value={data.duration.nights} onChange={e => setDuration('nights', e.target.value)} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Average Rating">
            <Input type="number" min="0" max="5" step="0.1" value={data.review_start} onChange={e => set('review_start', e.target.value)} />
          </Field>
          <Field label="Review Count">
            <Input type="number" min="0" value={data.review_count} onChange={e => set('review_count', e.target.value)} />
          </Field>
        </div>

        <Field label="Active">
          <Switch checked={data.is_active} onCheckedChange={v => set('is_active', v)} />
        </Field>
      </Section>

      {/* Description */}
      <Section title="Description">
        <Textarea
          value={data.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Write a compelling description of this itinerary..."
          rows={4}
        />
      </Section>

      {/* Images */}
      <Section title="Images">
        <Field label="Featured Image URL">
          <Input value={data.featured_image} onChange={e => set('featured_image', e.target.value)} placeholder="https://..." />
        </Field>
        {data.featured_image && (
          <img src={data.featured_image} alt="Featured" className="h-32 w-full object-cover rounded-md" />
        )}

        <Field label="Gallery Images">
          <div className="flex gap-2">
            <Input
              value={newGalleryUrl}
              onChange={e => setNewGalleryUrl(e.target.value)}
              placeholder="https://..."
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addGalleryImg())}
            />
            <Button type="button" variant="secondary" size="small" onClick={addGalleryImg}>
              <Plus /> Add
            </Button>
          </div>
          <div className="space-y-2 mt-2">
            {data.gallery_imgs.map((url, i) => (
              <div key={i} className="flex items-center gap-2">
                <img src={url} alt="" className="h-10 w-16 object-cover rounded" />
                <Text size="small" className="flex-1 truncate text-ui-fg-subtle">{url}</Text>
                <Button type="button" variant="danger" size="small" onClick={() => removeGalleryImg(i)}>
                  <XMark />
                </Button>
              </div>
            ))}
          </div>
        </Field>
      </Section>

      {/* Pricing */}
      <Section title="Pricing">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (e.g. $2,899)" required>
            <Input value={data.pricing.price} onChange={e => setPricing('price', e.target.value)} placeholder="$2,899" />
          </Field>
          <Field label="Original Price">
            <Input value={data.pricing.original_price} onChange={e => setPricing('original_price', e.target.value)} placeholder="$3,399" />
          </Field>
          <Field label="Fees & Taxes">
            <Input value={data.pricing.fee_and_taxes} onChange={e => setPricing('fee_and_taxes', e.target.value)} placeholder="$322" />
          </Field>
          <Field label="Total">
            <Input value={data.pricing.total} onChange={e => setPricing('total', e.target.value)} placeholder="$3,221" />
          </Field>
          <Field label="Price Label (optional)">
            <Input value={data.pricing.price_label} onChange={e => setPricing('price_label', e.target.value)} placeholder="per person" />
          </Field>
        </div>
      </Section>

      {/* Categories */}
      <Section title="Categories">
        <div className="flex gap-2">
          <Select value={newCategory} onValueChange={setNewCategory}>
            <Select.Trigger className="w-full">
              <Select.Value placeholder="Select a supported category" />
            </Select.Trigger>
            <Select.Content>
              {FRONTEND_SUPPORTED_CATEGORY_OPTIONS.map((category) => (
                <Select.Item key={category} value={category}>
                  {category}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
          <Button type="button" variant="secondary" size="small" onClick={addCategory}>
            <Plus /> Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.categories.map((cat, i) => (
            <Badge key={i} color="blue" className="flex items-center gap-1">
              {cat.category}
              <button type="button" onClick={() => removeCategory(i)} className="ml-1">
                <XMark className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </Section>

      {/* Locations */}
      <Section title="Locations (for map)">
        <div className="space-y-3">
          {data.locations.map((loc, i) => (
            <div key={i} className="flex gap-2 items-end">
              <Field label="Name">
                <Input value={loc.name} onChange={e => updateLocation(i, 'name', e.target.value)} placeholder="Ubud" />
              </Field>
              <Field label="Lat">
                <Input value={loc.lat} onChange={e => updateLocation(i, 'lat', e.target.value)} placeholder="-8.5069" />
              </Field>
              <Field label="Lng">
                <Input value={loc.lng} onChange={e => updateLocation(i, 'lng', e.target.value)} placeholder="115.2625" />
              </Field>
              <Button type="button" variant="danger" size="small" onClick={() => removeLocation(i)} className="mb-0.5">
                <XMark />
              </Button>
            </div>
          ))}
          <Button type="button" variant="secondary" size="small" onClick={addLocation}>
            <Plus /> Add Location
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <Field label="Map Center Lat">
            <Input value={data.map_lat} onChange={e => set('map_lat', e.target.value)} placeholder="-8.4095" />
          </Field>
          <Field label="Map Center Lng">
            <Input value={data.map_lng} onChange={e => set('map_lng', e.target.value)} placeholder="115.1889" />
          </Field>
        </div>
      </Section>

      {/* Amenities */}
      <Section title="Amenities">
        <div className="space-y-3">
          {data.amenities.map((amenity, i) => (
            <div key={i} className="flex gap-2 items-end">
              <Field label="Icon">
                <Select value={amenity.icon} onValueChange={v => updateAmenity(i, 'icon', v)}>
                  <Select.Trigger className="w-48">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    {FRONTEND_SUPPORTED_ICON_OPTIONS.map(icon => (
                      <Select.Item key={icon} value={icon}>{icon}</Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </Field>
              <Field label="Text">
                <Input value={amenity.text} onChange={e => updateAmenity(i, 'text', e.target.value)} placeholder="Private pool villas" />
              </Field>
              <Button type="button" variant="danger" size="small" onClick={() => removeAmenity(i)} className="mb-0.5">
                <XMark />
              </Button>
            </div>
          ))}
          <Button type="button" variant="secondary" size="small" onClick={addAmenity}>
            <Plus /> Add Amenity
          </Button>
        </div>
      </Section>

      {/* Things To Do */}
      <Section title="Things To Do">
        <div className="space-y-4">
          {data.things_to_do.map((item, i) => (
            <div key={i} className="border border-ui-border-base rounded-md p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Text weight="plus" size="small">Activity {i + 1}</Text>
                <Button type="button" variant="danger" size="small" onClick={() => removeThingToDo(i)}>
                  <XMark /> Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name">
                  <Input value={item.name} onChange={e => updateThingToDo(i, 'name', e.target.value)} placeholder="Ubud Rice Terrace & Spa" />
                </Field>
                <Field label="Time">
                  <Input value={item.time} onChange={e => updateThingToDo(i, 'time', e.target.value)} placeholder="Day 1–2 · Flexible" />
                </Field>
                <Field label="Image URL">
                  <Input value={item.imageUrl} onChange={e => updateThingToDo(i, 'imageUrl', e.target.value)} placeholder="https://..." />
                </Field>
                <Field label="Description">
                  <Input value={item.description} onChange={e => updateThingToDo(i, 'description', e.target.value)} placeholder="Walk rice terraces..." />
                </Field>
                <Field label="Lat">
                  <Input value={item.lat} onChange={e => updateThingToDo(i, 'lat', e.target.value)} placeholder="-8.4312" />
                </Field>
                <Field label="Lng">
                  <Input value={item.lng} onChange={e => updateThingToDo(i, 'lng', e.target.value)} placeholder="115.2799" />
                </Field>
              </div>
            </div>
          ))}
          <Button type="button" variant="secondary" size="small" onClick={addThingToDo}>
            <Plus /> Add Activity
          </Button>
        </div>
      </Section>

      {/* Includes */}
      <Section title="Includes">
        <div className="flex gap-2">
          <Input
            value={newInclude}
            onChange={e => setNewInclude(e.target.value)}
            placeholder="6 nights luxury villa stay"
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addInclude())}
          />
          <Button type="button" variant="secondary" size="small" onClick={addInclude}>
            <Plus /> Add
          </Button>
        </div>
        <div className="space-y-2 mt-2">
          {data.includes.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Text size="small" className="flex-1">✓ {item}</Text>
              <Button type="button" variant="danger" size="small" onClick={() => removeInclude(i)}>
                <XMark />
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Excludes */}
      <Section title="Excludes">
        <div className="flex gap-2">
          <Input
            value={newExclude}
            onChange={e => setNewExclude(e.target.value)}
            placeholder="International flights"
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addExclude())}
          />
          <Button type="button" variant="secondary" size="small" onClick={addExclude}>
            <Plus /> Add
          </Button>
        </div>
        <div className="space-y-2 mt-2">
          {data.excludes.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Text size="small" className="flex-1">✗ {item}</Text>
              <Button type="button" variant="danger" size="small" onClick={() => removeExclude(i)}>
                <XMark />
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Accommodations */}
      <Section title="Accommodations">
        <div className="space-y-4">
          {data.accommodations.map((acc, i) => (
            <div key={i} className="border border-ui-border-base rounded-md p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Text weight="plus" size="small">Hotel {i + 1}</Text>
                <Button type="button" variant="danger" size="small" onClick={() => removeAccommodation(i)}>
                  <XMark /> Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Hotel Name">
                  <Input value={acc.name} onChange={e => updateAccommodation(i, 'name', e.target.value)} placeholder="Hanging Gardens of Bali" />
                </Field>
                <Field label="Location">
                  <Input value={acc.location} onChange={e => updateAccommodation(i, 'location', e.target.value)} placeholder="Ubud, Bali" />
                </Field>
                <Field label="Image URL">
                  <Input value={acc.imageUrl} onChange={e => updateAccommodation(i, 'imageUrl', e.target.value)} placeholder="https://..." />
                </Field>
                <Field label="Rating">
                  <Input type="number" min="0" max="5" step="0.1" value={acc.rating} onChange={e => updateAccommodation(i, 'rating', e.target.value)} placeholder="4.9" />
                </Field>
              </div>
            </div>
          ))}
          <Button type="button" variant="secondary" size="small" onClick={addAccommodation}>
            <Plus /> Add Accommodation
          </Button>
        </div>
      </Section>

      {/* Reviews */}
      <Section title="Reviews">
        <div className="space-y-4">
          {data.reviews.map((review, i) => (
            <div key={i} className="border border-ui-border-base rounded-md p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Text weight="plus" size="small">Review {i + 1}</Text>
                <Button type="button" variant="danger" size="small" onClick={() => removeReview(i)}>
                  <XMark /> Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Title">
                  <Input value={review.title} onChange={e => updateReview(i, 'title', e.target.value)} placeholder="Dream honeymoon" />
                </Field>
                <Field label="Rating">
                  <Input type="number" min="1" max="5" step="0.5" value={review.rating} onChange={e => updateReview(i, 'rating', e.target.value)} />
                </Field>
                <Field label="Author">
                  <Input value={review.author} onChange={e => updateReview(i, 'author', e.target.value)} placeholder="S. Walkinshaw" />
                </Field>
                <Field label="Date">
                  <Input value={review.date} onChange={e => updateReview(i, 'date', e.target.value)} placeholder="May 16, 2025" />
                </Field>
                <Field label="Content">
                  <Textarea value={review.content} onChange={e => updateReview(i, 'content', e.target.value)} placeholder="The private pool villa was amazing..." rows={2} />
                </Field>
                <Field label="Avatar URL">
                  <Input value={review.author_avatar_url} onChange={e => updateReview(i, 'author_avatar_url', e.target.value)} placeholder="https://..." />
                </Field>
              </div>
            </div>
          ))}
          <Button type="button" variant="secondary" size="small" onClick={addReview}>
            <Plus /> Add Review
          </Button>
        </div>
      </Section>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-4 border-t border-ui-border-base">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onSubmit} isLoading={loading}>
          {submitLabel}
        </Button>
      </div>
    </div>
  )
}
