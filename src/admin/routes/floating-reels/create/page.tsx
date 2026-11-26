import { defineRouteConfig } from '@medusajs/admin-sdk'
import { Container, Heading, Text, toast } from '@medusajs/ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingReelForm, {
  DEFAULT_FLOATING_REEL_FORM_DATA,
  FloatingReelFormData,
} from '../components/floating-reel-form'

export const config = defineRouteConfig({
  label: 'Create Floating Reel',
})

export default function CreateFloatingReelPage() {
  const [formData, setFormData] = useState<FloatingReelFormData>(DEFAULT_FLOATING_REEL_FORM_DATA)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!formData.video_url || !formData.title || !formData.location) {
      toast.error('Video URL, title, and location are required')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/admin/floating-reels', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create')
      }

      toast.success(`"${formData.title}" created successfully`)
      navigate('/floating-reels')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create floating reel')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-6">
      <div>
        <Heading level="h1">Create Floating Reel</Heading>
        <Text className="mt-1 text-ui-fg-subtle">Add a new floating reel for the homepage hero</Text>
      </div>

      <Container className="p-6 lg:p-8">
        <FloatingReelForm
          data={formData}
          loading={loading}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/floating-reels')}
        />
      </Container>
    </div>
  )
}
