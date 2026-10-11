import { defineRouteConfig } from '@medusajs/admin-sdk'
import { Container, Heading, Text, toast } from '@medusajs/ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ItineraryForm, { DEFAULT_FORM_DATA, ItineraryFormData } from '../components/itinerary-form'
import { buildApiPayload } from '../utils/payload'

export const config = defineRouteConfig({
  label: 'Create Itinerary',
})

export default function CreateItineraryPage() {
  const [formData, setFormData] = useState<ItineraryFormData>(DEFAULT_FORM_DATA)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!formData.title || !formData.handle || !formData.destination) {
      toast.error('Title, handle, and destination are required')
      return
    }

    setLoading(true)
    try {
      const payload = buildApiPayload(formData)
      const res = await fetch('/admin/itineraries', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to create')
      }

      toast.success(`"${formData.title}" created successfully`)
      navigate('/itineraries')
    } catch (err: any) {
      toast.error(err.message || 'Failed to create itinerary')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-6">
      <div>
        <Heading level="h1">Create Itinerary</Heading>
        <Text className="text-ui-fg-subtle mt-1">Add a new tour package to the website</Text>
      </div>

      <Container className="p-6 lg:p-8">
        <ItineraryForm
          data={formData}
          onChange={setFormData}
          loading={loading}
          onSubmit={handleSubmit}
          submitLabel="Create Itinerary"
          onCancel={() => navigate('/itineraries')}
        />
      </Container>
    </div>
  )
}
