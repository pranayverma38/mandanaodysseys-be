import { defineRouteConfig } from '@medusajs/admin-sdk'
import { Plus, Trash } from '@medusajs/icons'
import { Button, Container, Heading, Table, Text, toast, usePrompt } from '@medusajs/ui'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type FloatingReel = {
  id: string
  video_url: string
  title: string
  location: string
  created_at: string
}

export const config = defineRouteConfig({
  label: 'Floating Reels',
})

export default function FloatingReelsPage() {
  const [floatingReels, setFloatingReels] = useState<FloatingReel[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dialog = usePrompt()

  const fetchFloatingReels = async () => {
    setLoading(true)
    try {
      const response = await fetch('/admin/floating-reels?limit=200', {
        credentials: 'include',
      })
      const data = await response.json()
      setFloatingReels(data.floating_reels || [])
    } catch {
      toast.error('Failed to load floating reels')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFloatingReels()
  }, [])

  const handleDelete = async (floatingReel: FloatingReel) => {
    const confirmed = await dialog({
      title: 'Delete floating reel',
      description: `Are you sure you want to delete "${floatingReel.title}"? This cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
    })

    if (!confirmed) return

    try {
      const response = await fetch(`/admin/floating-reels/${floatingReel.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      toast.success(`"${floatingReel.title}" deleted`)
      fetchFloatingReels()
    } catch {
      toast.error('Failed to delete floating reel')
    }
  }

  return (
    <Container className="p-0">
      <div className="flex items-center justify-between border-b border-ui-border-base px-6 py-4">
        <div>
          <Heading level="h1">Floating Reels</Heading>
          <Text className="mt-1 text-ui-fg-subtle" size="small">
            Manage floating homepage reels for the hero section
          </Text>
        </div>

        <Button size="small" onClick={() => navigate('/floating-reels/create')}>
          <Plus />
          Create Floating Reel
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Text className="text-ui-fg-subtle">Loading floating reels...</Text>
        </div>
      ) : floatingReels.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Text className="text-ui-fg-subtle">No floating reels yet. Create your first one.</Text>
          <Button size="small" onClick={() => navigate('/floating-reels/create')}>
            <Plus />
            Create Floating Reel
          </Button>
        </div>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Video URL</Table.HeaderCell>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {floatingReels.map((floatingReel) => (
              <Table.Row key={floatingReel.id}>
                <Table.Cell>
                  <Text weight="plus">{floatingReel.title}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{floatingReel.location}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className="max-w-[360px] truncate text-ui-fg-subtle">
                    {floatingReel.video_url}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{new Date(floatingReel.created_at).toLocaleDateString()}</Text>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-end">
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => handleDelete(floatingReel)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}
