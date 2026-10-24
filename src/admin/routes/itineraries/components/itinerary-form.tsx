import { Button, Input, Textarea, Select, Switch, Text, Heading, Badge } from '@medusajs/ui'
import { Plus, XMark } from '@medusajs/icons'
import { useState } from 'react'
import { FRONTEND_SUPPORTED_CATEGORY_OPTIONS } from '../utils/frontend-category-options'
import { FRONTEND_SUPPORTED_ICON_OPTIONS } from '../utils/frontend-icon-options'

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
  pdf_link: string
  gallery_imgs: string[]
  gallery_videos: string[]
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
  pdf_link: '',
  gallery_imgs: [],
  gallery_videos: [],
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
const DEFAULT_AMENITY_ICON_OPTION = '__DEFAULT_TICK__'

function reorderItems<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex) {
    return items
  }

  const nextItems = [...items]
  const [movedItem] = nextItems.splice(fromIndex, 1)
  nextItems.splice(toIndex, 0, movedItem)
  return nextItems
}

type SectionProps = {
  title: string
  children: React.ReactNode
  description?: string
}

function Section({ title, children, description }: SectionProps) {
  return (
    <div className="space-y-4 rounded-xl border border-ui-border-base bg-ui-bg-base p-5 shadow-elevation-card-rest">
      <div className="space-y-1">
        <Heading level="h3" className="text-ui-fg-base">{title}</Heading>
        {description ? (
          <Text size="small" className="text-ui-fg-subtle">
            {description}
          </Text>
        ) : null}
      </div>
      {children}
    </div>
  )
}

type FieldProps = { label: string; children: React.ReactNode; required?: boolean }

function Field({ label, children, required }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Text size="small" weight="plus" className="text-ui-fg-subtle">
        {label}{required && <span className="ml-0.5 text-ui-fg-error">*</span>}
      </Text>
      {children}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-ui-border-base bg-ui-bg-subtle px-4 py-6 text-center">
      <Text size="small" className="text-ui-fg-subtle">
        {message}
      </Text>
    </div>
  )
}

type DragHandleProps = {
  onDragStart: (event: React.DragEvent<HTMLButtonElement>) => void
  onDragEnd: () => void
}

function DragHandle({ onDragStart, onDragEnd }: DragHandleProps) {
  return (
    <button
      type="button"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="inline-flex h-9 items-center rounded-md border border-ui-border-base bg-ui-bg-base px-2 text-ui-fg-subtle transition hover:bg-ui-bg-subtle cursor-grab active:cursor-grabbing"
      title="Drag to reorder"
      aria-label="Drag to reorder"
    >
      <span className="flex flex-col gap-1" aria-hidden="true">
        <span className="block h-0.5 w-4 rounded-full bg-current" />
        <span className="block h-0.5 w-4 rounded-full bg-current" />
        <span className="block h-0.5 w-4 rounded-full bg-current" />
      </span>
    </button>
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
  const twoColumnGridClass = 'grid grid-cols-1 gap-4 md:grid-cols-2'

  const set = (field: keyof ItineraryFormData, value: unknown) =>
    onChange({ ...data, [field]: value })

  const setPricing = (field: keyof ItineraryFormData['pricing'], value: string) =>
    onChange({ ...data, pricing: { ...data.pricing, [field]: value } })

  const setDuration = (field: keyof ItineraryFormData['duration'], value: string) =>
    onChange({ ...data, duration: { ...data.duration, [field]: value } })

  const addLocation = () =>
    set('locations', [...data.locations, { name: '', lat: '', lng: '' }])

  const updateLocation = (i: number, field: string, value: string) => {
    const locs = [...data.locations]
    locs[i] = { ...locs[i], [field]: value }
    set('locations', locs)
  }

  const removeLocation = (i: number) =>
    set('locations', data.locations.filter((_, idx) => idx !== i))

  const [newCategory, setNewCategory] = useState('')

  const addCategory = () => {
    if (!newCategory.trim()) return
    if (data.categories.some((category) => category.category === newCategory)) return
    set('categories', [...data.categories, { category: newCategory }])
    setNewCategory('')
  }

  const removeCategory = (i: number) =>
    set('categories', data.categories.filter((_, idx) => idx !== i))

  const [newGalleryUrl, setNewGalleryUrl] = useState('')
  const [newGalleryVideoUrl, setNewGalleryVideoUrl] = useState('')

  const addGalleryImg = () => {
    if (!newGalleryUrl.trim()) return
    set('gallery_imgs', [...data.gallery_imgs, newGalleryUrl.trim()])
    setNewGalleryUrl('')
  }

  const removeGalleryImg = (i: number) =>
    set('gallery_imgs', data.gallery_imgs.filter((_, idx) => idx !== i))

  const addGalleryVideo = () => {
    if (!newGalleryVideoUrl.trim()) return
    set('gallery_videos', [...data.gallery_videos, newGalleryVideoUrl.trim()])
    setNewGalleryVideoUrl('')
  }

  const removeGalleryVideo = (i: number) =>
    set('gallery_videos', data.gallery_videos.filter((_, idx) => idx !== i))

  const addAmenity = () =>
    set('amenities', [...data.amenities, { icon: '', text: '' }])

  const updateAmenity = (i: number, field: string, value: string) => {
    const items = [...data.amenities]
    items[i] = { ...items[i], [field]: value }
    set('amenities', items)
  }

  const moveAmenity = (fromIndex: number, toIndex: number) =>
    set('amenities', reorderItems(data.amenities, fromIndex, toIndex))

  const removeAmenity = (i: number) =>
    set('amenities', data.amenities.filter((_, idx) => idx !== i))

  const addThingToDo = () =>
    set('things_to_do', [...data.things_to_do, { name: '', time: '', description: '', imageUrl: '', lat: '', lng: '' }])

  const updateThingToDo = (i: number, field: string, value: string) => {
    const items = [...data.things_to_do]
    items[i] = { ...items[i], [field]: value }
    set('things_to_do', items)
  }

  const removeThingToDo = (i: number) =>
    set('things_to_do', data.things_to_do.filter((_, idx) => idx !== i))

  const [newInclude, setNewInclude] = useState('')

  const addInclude = () => {
    if (!newInclude.trim()) return
    set('includes', [...data.includes, newInclude.trim()])
    setNewInclude('')
  }

  const removeInclude = (i: number) =>
    set('includes', data.includes.filter((_, idx) => idx !== i))

  const moveInclude = (fromIndex: number, toIndex: number) =>
    set('includes', reorderItems(data.includes, fromIndex, toIndex))

  const [newExclude, setNewExclude] = useState('')

  const addExclude = () => {
    if (!newExclude.trim()) return
    set('excludes', [...data.excludes, newExclude.trim()])
    setNewExclude('')
  }

  const removeExclude = (i: number) =>
    set('excludes', data.excludes.filter((_, idx) => idx !== i))

  const moveExclude = (fromIndex: number, toIndex: number) =>
    set('excludes', reorderItems(data.excludes, fromIndex, toIndex))

  const addAccommodation = () =>
    set('accommodations', [...data.accommodations, { name: '', imageUrl: '', rating: '4.5', location: '' }])

  const updateAccommodation = (i: number, field: string, value: string) => {
    const items = [...data.accommodations]
    items[i] = { ...items[i], [field]: value }
    set('accommodations', items)
  }

  const removeAccommodation = (i: number) =>
    set('accommodations', data.accommodations.filter((_, idx) => idx !== i))

  const addReview = () =>
    set('reviews', [...data.reviews, {
      id: String(Date.now()),
      title: '',
      rating: '5',
      content: '',
      author: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
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

  const [draggedAmenityIndex, setDraggedAmenityIndex] = useState<number | null>(null)
  const [draggedIncludeIndex, setDraggedIncludeIndex] = useState<number | null>(null)
  const [draggedExcludeIndex, setDraggedExcludeIndex] = useState<number | null>(null)

  const handleAmenityDragStart = (index: number, event: React.DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', `amenity:${index}`)
    setDraggedAmenityIndex(index)
  }

  const handleIncludeDragStart = (index: number, event: React.DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', `include:${index}`)
    setDraggedIncludeIndex(index)
  }

  const handleExcludeDragStart = (index: number, event: React.DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', `exclude:${index}`)
    setDraggedExcludeIndex(index)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <Section
            title="Basic Information"
            description="Core trip details shown in the itinerary listing and detail page."
          >
            <div className={twoColumnGridClass}>
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
              <Field label="Duration — Days" required>
                <Input type="number" min="1" value={data.duration.days} onChange={e => setDuration('days', e.target.value)} />
              </Field>
              <Field label="Duration — Nights" required>
                <Input type="number" min="0" value={data.duration.nights} onChange={e => setDuration('nights', e.target.value)} />
              </Field>
              <Field label="Average Rating">
                <Input type="number" min="0" max="5" step="0.1" value={data.review_start} onChange={e => set('review_start', e.target.value)} />
              </Field>
              <Field label="Review Count">
                <Input type="number" min="0" value={data.review_count} onChange={e => set('review_count', e.target.value)} />
              </Field>
            </div>
          </Section>

          <Section
            title="Description"
            description="Write the primary copy for the itinerary. Aim for clarity and conversion."
          >
            <Textarea
              value={data.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Write a compelling description of this itinerary..."
              rows={6}
            />
          </Section>

          <Section
            title="Pricing"
            description="Enter AUD amounts. The storefront treats these as Australian dollars."
          >
            <div className={twoColumnGridClass}>
              <Field label="Price (AUD, e.g. 2899)" required>
                <Input value={data.pricing.price} onChange={e => setPricing('price', e.target.value)} placeholder="2899" />
              </Field>
              <Field label="Original Price (AUD)">
                <Input value={data.pricing.original_price} onChange={e => setPricing('original_price', e.target.value)} placeholder="3399" />
              </Field>
              <Field label="Fees & Taxes (AUD)">
                <Input value={data.pricing.fee_and_taxes} onChange={e => setPricing('fee_and_taxes', e.target.value)} placeholder="322" />
              </Field>
              <Field label="Total (AUD)">
                <Input value={data.pricing.total} onChange={e => setPricing('total', e.target.value)} placeholder="3221" />
              </Field>
            </div>
            <Field label="Price Label (optional)">
              <Input value={data.pricing.price_label} onChange={e => setPricing('price_label', e.target.value)} placeholder="per person" />
            </Field>
          </Section>
        </div>

        <div className="space-y-6 xl:sticky xl:top-6 self-start">
          <Section
            title="Publishing"
            description="Quick controls for status and classification."
          >
            <div className="rounded-lg border border-ui-border-base bg-ui-bg-subtle p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Text weight="plus" size="small">Active itinerary</Text>
                  <Text size="small" className="text-ui-fg-subtle">
                    Toggle whether this itinerary should appear as available.
                  </Text>
                </div>
                <Switch checked={data.is_active} onCheckedChange={v => set('is_active', v)} />
              </div>
            </div>

            <Field label="Categories">
              <div className="flex flex-col gap-2 sm:flex-row">
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
                <Button type="button" variant="secondary" size="small" onClick={addCategory} className="sm:self-end">
                  <Plus /> Add
                </Button>
              </div>
            </Field>

            {data.categories.length ? (
              <div className="flex flex-wrap gap-2">
                {data.categories.map((cat, i) => (
                  <Badge key={i} color="blue" className="flex items-center gap-1">
                    {cat.category}
                    <button type="button" onClick={() => removeCategory(i)} className="ml-1">
                      <XMark className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <EmptyState message="No categories added yet." />
            )}
          </Section>

          <Section
            title="Images"
            description="The cover preview shows the full image without cropping while staying visually compact."
          >
            <Field label="Featured Image URL">
              <Input value={data.featured_image} onChange={e => set('featured_image', e.target.value)} placeholder="https://..." />
            </Field>

            {data.featured_image ? (
              <div className="rounded-xl border border-ui-border-base bg-ui-bg-subtle p-3">
                <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-lg bg-ui-bg-base p-3">
                  <img
                    src={data.featured_image}
                    alt="Featured"
                    className="max-h-[280px] w-full rounded-md object-contain"
                  />
                </div>
              </div>
            ) : (
              <EmptyState message="Add a featured image URL to preview it here." />
            )}

            <Field label="Gallery Images">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  value={newGalleryUrl}
                  onChange={e => setNewGalleryUrl(e.target.value)}
                  placeholder="https://..."
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addGalleryImg())}
                />
                <Button type="button" variant="secondary" size="small" onClick={addGalleryImg} className="sm:self-end">
                  <Plus /> Add
                </Button>
              </div>
            </Field>

            {data.gallery_imgs.length ? (
              <div className="space-y-2">
                {data.gallery_imgs.map((url, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-ui-border-base bg-ui-bg-subtle p-2.5">
                    <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-ui-bg-base">
                      <img src={url} alt="" className="h-full w-full object-contain" />
                    </div>
                    <Text size="small" className="flex-1 truncate text-ui-fg-subtle">{url}</Text>
                    <Button type="button" variant="danger" size="small" onClick={() => removeGalleryImg(i)}>
                      <XMark />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No gallery images added yet." />
            )}

            <Field label="Gallery Videos">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  value={newGalleryVideoUrl}
                  onChange={e => setNewGalleryVideoUrl(e.target.value)}
                  placeholder="https://..."
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addGalleryVideo())}
                />
                <Button type="button" variant="secondary" size="small" onClick={addGalleryVideo} className="sm:self-end">
                  <Plus /> Add
                </Button>
              </div>
            </Field>

            {data.gallery_videos.length ? (
              <div className="space-y-2">
                {data.gallery_videos.map((url, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-ui-border-base bg-ui-bg-subtle p-2.5">
                    <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md bg-ui-bg-base">
                      <Text size="xsmall" className="text-ui-fg-subtle">Video</Text>
                    </div>
                    <Text size="small" className="flex-1 truncate text-ui-fg-subtle">{url}</Text>
                    <Button type="button" variant="danger" size="small" onClick={() => removeGalleryVideo(i)}>
                      <XMark />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No gallery videos added yet." />
            )}
          </Section>

          <Section
            title="Itinerary PDF"
            description="Upload or paste a PDF link. The storefront can use this to offer a downloadable itinerary."
          >
            <Field label="PDF Link">
              <Input
                value={data.pdf_link}
                onChange={e => set('pdf_link', e.target.value)}
                placeholder="https://.../itinerary.pdf"
              />
            </Field>

            {data.pdf_link ? (
              <div className="flex items-center gap-3 rounded-lg border border-ui-border-base bg-ui-bg-subtle p-2.5">
                <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md bg-ui-bg-base">
                  <Text size="xsmall" className="text-ui-fg-subtle">PDF</Text>
                </div>
                <a
                  href={data.pdf_link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 truncate text-sm text-ui-fg-interactive hover:underline"
                >
                  {data.pdf_link}
                </a>
                <Button type="button" variant="danger" size="small" onClick={() => set('pdf_link', '')}>
                  <XMark />
                </Button>
              </div>
            ) : (
              <EmptyState message="Add a PDF link to preview it here." />
            )}
          </Section>
        </div>
      </div>

      <div className="grid gap-6 2xl:grid-cols-2">
        <Section
          title="Locations (for map)"
          description="Add destination pins and a default center point for the map."
        >
          <div className="space-y-3">
            {data.locations.map((loc, i) => (
              <div key={i} className="grid gap-3 rounded-lg border border-ui-border-base bg-ui-bg-subtle p-3 md:grid-cols-[minmax(0,1.5fr)_1fr_1fr_auto] md:items-end">
                <Field label="Name">
                  <Input value={loc.name} onChange={e => updateLocation(i, 'name', e.target.value)} placeholder="Ubud" />
                </Field>
                <Field label="Lat">
                  <Input value={loc.lat} onChange={e => updateLocation(i, 'lat', e.target.value)} placeholder="-8.5069" />
                </Field>
                <Field label="Lng">
                  <Input value={loc.lng} onChange={e => updateLocation(i, 'lng', e.target.value)} placeholder="115.2625" />
                </Field>
                <Button type="button" variant="danger" size="small" onClick={() => removeLocation(i)} className="md:mb-0.5">
                  <XMark />
                </Button>
              </div>
            ))}
            <Button type="button" variant="secondary" size="small" onClick={addLocation}>
              <Plus /> Add Location
            </Button>
          </div>

          <div className={twoColumnGridClass}>
            <Field label="Map Center Lat">
              <Input value={data.map_lat} onChange={e => set('map_lat', e.target.value)} placeholder="-8.4095" />
            </Field>
            <Field label="Map Center Lng">
              <Input value={data.map_lng} onChange={e => set('map_lng', e.target.value)} placeholder="115.1889" />
            </Field>
          </div>
        </Section>

        <Section
          title="Amenities"
          description="Short highlights that help users scan the offering quickly. Drag items to rearrange them."
        >
          <div className="space-y-3">
            {data.amenities.map((amenity, i) => (
              <div
                key={i}
                onDragOver={(event) => {
                  event.preventDefault()
                  event.dataTransfer.dropEffect = 'move'
                }}
                onDragEnter={(event) => {
                  event.preventDefault()
                  if (draggedAmenityIndex == null || draggedAmenityIndex === i) {
                    return
                  }

                  moveAmenity(draggedAmenityIndex, i)
                  setDraggedAmenityIndex(i)
                }}
                onDrop={(event) => {
                  event.preventDefault()
                  setDraggedAmenityIndex(null)
                }}
                className={`grid gap-3 rounded-lg border border-ui-border-base bg-ui-bg-subtle p-3 transition-all duration-200 ease-out md:grid-cols-[auto_220px_minmax(0,1fr)_auto] md:items-end ${
                  draggedAmenityIndex === i ? 'scale-[0.99] opacity-70 shadow-elevation-card-hover' : ''
                }`}
              >
                <div className="md:mb-0.5">
                  <DragHandle
                    onDragStart={(event) => handleAmenityDragStart(i, event)}
                    onDragEnd={() => setDraggedAmenityIndex(null)}
                  />
                </div>
                <Field label="Icon">
                  <Select
                    value={amenity.icon || DEFAULT_AMENITY_ICON_OPTION}
                    onValueChange={(value) => updateAmenity(i, 'icon', value === DEFAULT_AMENITY_ICON_OPTION ? '' : value)}
                  >
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Default tick mark" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value={DEFAULT_AMENITY_ICON_OPTION}>Default tick mark</Select.Item>
                      {FRONTEND_SUPPORTED_ICON_OPTIONS.map(icon => (
                        <Select.Item key={icon} value={icon}>{icon}</Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                </Field>
                <Field label="Text">
                  <Input value={amenity.text} onChange={e => updateAmenity(i, 'text', e.target.value)} placeholder="Private pool villas" />
                </Field>
                <Button type="button" variant="danger" size="small" onClick={() => removeAmenity(i)} className="md:mb-0.5">
                  <XMark />
                </Button>
              </div>
            ))}
            <Button type="button" variant="secondary" size="small" onClick={addAmenity}>
              <Plus /> Add Amenity
            </Button>
          </div>
        </Section>

        <Section
          title="Includes"
          description="What the package covers. Drag items to rearrange them."
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={newInclude}
              onChange={e => setNewInclude(e.target.value)}
              placeholder="6 nights luxury villa stay"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addInclude())}
            />
            <Button type="button" variant="secondary" size="small" onClick={addInclude} className="sm:self-end">
              <Plus /> Add
            </Button>
          </div>

          {data.includes.length ? (
            <div className="mt-2 space-y-2">
              {data.includes.map((item, i) => (
                <div
                  key={`${item}-${i}`}
                  onDragOver={(event) => {
                    event.preventDefault()
                    event.dataTransfer.dropEffect = 'move'
                  }}
                  onDragEnter={(event) => {
                    event.preventDefault()
                    if (draggedIncludeIndex == null || draggedIncludeIndex === i) {
                      return
                    }

                    moveInclude(draggedIncludeIndex, i)
                    setDraggedIncludeIndex(i)
                  }}
                  onDrop={(event) => {
                    event.preventDefault()
                    setDraggedIncludeIndex(null)
                  }}
                  className={`flex items-center gap-2 rounded-lg border border-ui-border-base bg-ui-bg-subtle px-3 py-2 transition-all duration-200 ease-out ${
                    draggedIncludeIndex === i ? 'scale-[0.99] opacity-70 shadow-elevation-card-hover' : ''
                  }`}
                >
                  <DragHandle
                    onDragStart={(event) => handleIncludeDragStart(i, event)}
                    onDragEnd={() => setDraggedIncludeIndex(null)}
                  />
                  <Text size="small" className="flex-1">✓ {item}</Text>
                  <Button type="button" variant="danger" size="small" onClick={() => removeInclude(i)}>
                    <XMark />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No included items added yet." />
          )}
        </Section>

        <Section
          title="Excludes"
          description="What is intentionally not part of the package. Drag items to rearrange them."
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={newExclude}
              onChange={e => setNewExclude(e.target.value)}
              placeholder="International flights"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addExclude())}
            />
            <Button type="button" variant="secondary" size="small" onClick={addExclude} className="sm:self-end">
              <Plus /> Add
            </Button>
          </div>

          {data.excludes.length ? (
            <div className="mt-2 space-y-2">
              {data.excludes.map((item, i) => (
                <div
                  key={`${item}-${i}`}
                  onDragOver={(event) => {
                    event.preventDefault()
                    event.dataTransfer.dropEffect = 'move'
                  }}
                  onDragEnter={(event) => {
                    event.preventDefault()
                    if (draggedExcludeIndex == null || draggedExcludeIndex === i) {
                      return
                    }

                    moveExclude(draggedExcludeIndex, i)
                    setDraggedExcludeIndex(i)
                  }}
                  onDrop={(event) => {
                    event.preventDefault()
                    setDraggedExcludeIndex(null)
                  }}
                  className={`flex items-center gap-2 rounded-lg border border-ui-border-base bg-ui-bg-subtle px-3 py-2 transition-all duration-200 ease-out ${
                    draggedExcludeIndex === i ? 'scale-[0.99] opacity-70 shadow-elevation-card-hover' : ''
                  }`}
                >
                  <DragHandle
                    onDragStart={(event) => handleExcludeDragStart(i, event)}
                    onDragEnd={() => setDraggedExcludeIndex(null)}
                  />
                  <Text size="small" className="flex-1">✗ {item}</Text>
                  <Button type="button" variant="danger" size="small" onClick={() => removeExclude(i)}>
                    <XMark />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No excluded items added yet." />
          )}
        </Section>
      </div>

      <Section
        title="Things To Do"
        description="Build the itinerary experiences visitors will browse on the detail page."
      >
        <div className="space-y-4">
          {data.things_to_do.map((item, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-ui-border-base bg-ui-bg-subtle p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Text weight="plus" size="small">Activity {i + 1}</Text>
                <Button type="button" variant="danger" size="small" onClick={() => removeThingToDo(i)}>
                  <XMark /> Remove
                </Button>
              </div>
              <div className={twoColumnGridClass}>
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

      <Section
        title="Accommodations"
        description="List the stays associated with the itinerary."
      >
        <div className="space-y-4">
          {data.accommodations.map((acc, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-ui-border-base bg-ui-bg-subtle p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Text weight="plus" size="small">Hotel {i + 1}</Text>
                <Button type="button" variant="danger" size="small" onClick={() => removeAccommodation(i)}>
                  <XMark /> Remove
                </Button>
              </div>
              <div className={twoColumnGridClass}>
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

      <Section
        title="Reviews"
        description="Add concise testimonials and metadata for social proof."
      >
        <div className="space-y-4">
          {data.reviews.map((review, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-ui-border-base bg-ui-bg-subtle p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Text weight="plus" size="small">Review {i + 1}</Text>
                <Button type="button" variant="danger" size="small" onClick={() => removeReview(i)}>
                  <XMark /> Remove
                </Button>
              </div>
              <div className={twoColumnGridClass}>
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
                  <Textarea value={review.content} onChange={e => updateReview(i, 'content', e.target.value)} placeholder="The private pool villa was amazing..." rows={3} />
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

      <div className="flex justify-end gap-3 border-t border-ui-border-base pt-4">
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
