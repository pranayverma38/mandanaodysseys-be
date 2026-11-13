import { defineRouteConfig } from '@medusajs/admin-sdk'
import { Container, Heading, Text, toast } from '@medusajs/ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReelForm, { DEFAULT_REEL_FORM_DATA, ReelFormData } from '../components/reel-form'

export const config = defineRouteConfig({
  label: 'Create Reel',
})

export default function CreateReelPage() {
  const [formData, setFormData] = useState<ReelFormData>(DEFAULT_REEL_FORM_DATA)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!formData.video_url || !formData.title || !formData.location) {
      toast.error('Video URL, title, and location are required')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/admin/reels', {
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
      navigate('/reels')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create reel')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-6">
      <div>
        <Heading level="h1">Create Reel</Heading>
        <Text className="mt-1 text-ui-fg-subtle">Add a new homepage reel</Text>
      </div>

      <Container className="p-6 lg:p-8">
        <ReelForm
          data={formData}
          loading={loading}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/reels')}
        />
      </Container>
    </div>
  )
}
