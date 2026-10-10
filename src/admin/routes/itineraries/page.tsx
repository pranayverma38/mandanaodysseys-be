import { defineRouteConfig } from '@medusajs/admin-sdk'
import { MapPinIcon, PencilIcon, TrashIcon, PlusIcon } from '@medusajs/icons'
import { Button, Container, Heading, Text, Badge, Table, toast, usePrompt } from '@medusajs/ui'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Itinerary = {
  id: string
  handle: string
  title: string
  badge?: string
  destination: string
  duration: { days: number; nights: number; label: string }
  mobility: string
  is_active: boolean
  review_start: number
  review_count: number
  pricing: { price: string }
  created_at: string
}

export const config = defineRouteConfig({
  label: 'Itineraries',
  icon: MapPinIcon,
})

export default function ItinerariesPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dialog = usePrompt()

  const fetchItineraries = async () => {
    setLoading(true)
    try {
      const res = await fetch('/admin/itineraries?limit=200', {
        credentials: 'include',
      })
      const data = await res.json()
      setItineraries(data.itineraries || [])
    } catch {
      toast.error('Failed to load itineraries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItineraries()
  }, [])

  const handleDelete = async (itinerary: Itinerary) => {
    const confirmed = await dialog({
      title: 'Delete itinerary',
      description: `Are you sure you want to delete "${itinerary.title}"? This cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
    })

    if (!confirmed) return

    try {
      const res = await fetch(`/admin/itineraries/${itinerary.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Failed to delete')

      toast.success(`"${itinerary.title}" deleted`)
      fetchItineraries()
    } catch {
      toast.error('Failed to delete itinerary')
    }
  }

  return (
    <Container className="p-0">
      <div className="flex items-center justify-between px-6 py-4 border-b border-ui-border-base">
        <div>
          <Heading level="h1">Itineraries</Heading>
          <Text className="text-ui-fg-subtle mt-1" size="small">
            Manage tour packages shown on the website
          </Text>
        </div>
        <Button size="small" onClick={() => navigate('/itineraries/create')}>
          <PlusIcon />
          Create Itinerary
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Text className="text-ui-fg-subtle">Loading itineraries...</Text>
        </div>
      ) : itineraries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <MapPinIcon className="text-ui-fg-muted" />
          <Text className="text-ui-fg-subtle">No itineraries yet. Create your first one.</Text>
          <Button size="small" onClick={() => navigate('/itineraries/create')}>
            <PlusIcon />
            Create Itinerary
          </Button>
        </div>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {itineraries.map((it) => (
              <Table.Row key={it.id} className="cursor-pointer hover:bg-ui-bg-subtle-hover">
                <Table.Cell onClick={() => navigate(`/itineraries/${it.id}`)}>
                  <div>
                    <Text weight="plus">{it.title}</Text>
                    <Text size="small" className="text-ui-fg-subtle">{it.handle}</Text>
                    {it.badge && (
                      <Badge size="xsmall" color="blue" className="mt-1">{it.badge}</Badge>
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell onClick={() => navigate(`/itineraries/${it.id}`)}>
                  <Text className="capitalize">{it.destination.replace(/-/g, ' ')}</Text>
                </Table.Cell>
                <Table.Cell onClick={() => navigate(`/itineraries/${it.id}`)}>
                  <Text>{it.duration?.label || `${it.duration?.days}D/${it.duration?.nights}N`}</Text>
                </Table.Cell>
                <Table.Cell onClick={() => navigate(`/itineraries/${it.id}`)}>
                  <Text>{it.pricing?.price || '—'}</Text>
                </Table.Cell>
                <Table.Cell onClick={() => navigate(`/itineraries/${it.id}`)}>
                  <Badge color={it.is_active ? 'green' : 'grey'} size="xsmall">
                    {it.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </Table.Cell>
                <Table.Cell onClick={() => navigate(`/itineraries/${it.id}`)}>
                  <Text>★ {it.review_start?.toFixed(1)} ({it.review_count})</Text>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/itineraries/${it.id}`)
                      }}
                    >
                      <PencilIcon />
                    </Button>
                    <Button
                      size="small"
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(it)
                      }}
                    >
                      <TrashIcon />
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
