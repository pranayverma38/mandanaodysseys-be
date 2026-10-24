/** Nested detail rows for a Things To Do card. Stored in a new column so old JSON stays intact. */
export type ThingToDoSubActivity = {
  icon: string
  subtitle: string
  description: string
}

export type ThingToDoRecord = {
  name: string
  time: string
  description: string
  imageUrl: string
  lat: number
  lng: number
}

export function normalizeSubActivities(value: unknown): ThingToDoSubActivity[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.map((item) => ({
    icon: typeof item?.icon === 'string' ? item.icon : '',
    subtitle: typeof item?.subtitle === 'string' ? item.subtitle : '',
    description: typeof item?.description === 'string' ? item.description : '',
  }))
}

/** Keep the original things_to_do JSON shape; put new rows in a parallel column. */
export function splitThingsToDoPayload(items: unknown): {
  things_to_do: ThingToDoRecord[]
  things_to_do_sub_activities: ThingToDoSubActivity[][]
} {
  const list = Array.isArray(items) ? items : []

  return {
    things_to_do: list.map((item) => ({
      name: item?.name || '',
      time: item?.time || '',
      description: item?.description || '',
      imageUrl: item?.imageUrl || '',
      lat: Number(item?.lat) || 0,
      lng: Number(item?.lng) || 0,
    })),
    things_to_do_sub_activities: list.map((item) => normalizeSubActivities(item?.sub_activities)),
  }
}

export function thingsToDoHaveSubActivities(items: unknown): boolean {
  return Array.isArray(items) && items.some((item) => item && typeof item === 'object' && 'sub_activities' in item)
}

export function resolveSubActivities(
  thingsToDoSubActivities: unknown,
  index: number,
  fallback: unknown
): ThingToDoSubActivity[] {
  if (Array.isArray(thingsToDoSubActivities) && thingsToDoSubActivities[index] !== undefined) {
    return normalizeSubActivities(thingsToDoSubActivities[index])
  }

  return normalizeSubActivities(fallback)
}
