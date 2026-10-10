import { defineRouteConfig } from '@medusajs/admin-sdk'
import { Container, Heading, Text, toast, Badge } from '@medusajs/ui'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItineraryForm, { ItineraryFormData } from '../components/itinerary-form'
import { buildApiPayload, buildFormData } from '../utils/payload'

export const config = defineRouteConfig({
  label: 'Edit Itinerary',
})

export default function EditItineraryPage() {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<ItineraryFormData | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    fetch(`/admin/itineraries/${id}`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (data.itinerary) {
          setFormData(buildFormData(data.itinerary))
        }
      })
      .catch(() => toast.error('Failed to load itinerary'))
      .finally(() => setFetching(false))
  }, [id])

  const handleSubmit = async () => {
    if (!formData || !id) return
    if (!formData.title || !formData.handle || !formData.destination) {
      toast.error('Title, handle, and destination are required')
      return
    }

    setLoading(true)
    try {
      const payload = buildApiPayload(formData)
      const res = await fetch(`/admin/itineraries/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to update')
      }

      toast.success('Itinerary updated successfully')
    } catch (err: any) {
      toast.error(err.message || 'Failed to update itinerary')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Text className="text-ui-fg-subtle">Loading itinerary...</Text>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center py-20">
        <Text className="text-ui-fg-error">Itinerary not found</Text>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <Heading level="h1">{formData.title}</Heading>
          <div className="flex items-center gap-2 mt-1">
            <Text className="text-ui-fg-subtle" size="small">{formData.handle}</Text>
            <Badge color={formData.is_active ? 'green' : 'grey'} size="xsmall">
              {formData.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </div>

      <Container className="p-6">
        <ItineraryForm
          data={formData}
          onChange={setFormData}
          loading={loading}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          onCancel={() => navigate('/itineraries')}
        />
      </Container>
    </div>
  )
}
