import { defineRouteConfig } from '@medusajs/admin-sdk'
import { Plus, Trash } from '@medusajs/icons'
import { Button, Container, Heading, Table, Text, toast, usePrompt } from '@medusajs/ui'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Reel = {
  id: string
  video_url: string
  title: string
  location: string
  created_at: string
}

export const config = defineRouteConfig({
  label: 'Reels',
})

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dialog = usePrompt()

  const fetchReels = async () => {
    setLoading(true)
    try {
      const response = await fetch('/admin/reels?limit=200', {
        credentials: 'include',
      })
      const data = await response.json()
      setReels(data.reels || [])
    } catch {
      toast.error('Failed to load reels')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReels()
  }, [])

  const handleDelete = async (reel: Reel) => {
    const confirmed = await dialog({
      title: 'Delete reel',
      description: `Are you sure you want to delete "${reel.title}"? This cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
    })

    if (!confirmed) return

    try {
      const response = await fetch(`/admin/reels/${reel.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      toast.success(`"${reel.title}" deleted`)
      fetchReels()
    } catch {
      toast.error('Failed to delete reel')
    }
  }

  return (
    <Container className="p-0">
      <div className="flex items-center justify-between border-b border-ui-border-base px-6 py-4">
        <div>
          <Heading level="h1">Reels</Heading>
          <Text className="mt-1 text-ui-fg-subtle" size="small">
            Manage homepage reels for the Journeys That Inspired Us section
          </Text>
        </div>

        <Button size="small" onClick={() => navigate('/reels/create')}>
          <Plus />
          Create Reel
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Text className="text-ui-fg-subtle">Loading reels...</Text>
        </div>
      ) : reels.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Text className="text-ui-fg-subtle">No reels yet. Create your first one.</Text>
          <Button size="small" onClick={() => navigate('/reels/create')}>
            <Plus />
            Create Reel
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
            {reels.map((reel) => (
              <Table.Row key={reel.id}>
                <Table.Cell>
                  <Text weight="plus">{reel.title}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{reel.location}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className="max-w-[360px] truncate text-ui-fg-subtle">
                    {reel.video_url}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{new Date(reel.created_at).toLocaleDateString()}</Text>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-end">
                    <Button size="small" variant="danger" onClick={() => handleDelete(reel)}>
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
