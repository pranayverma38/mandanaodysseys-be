export const EXPERIENCE_TITLE_MAX_LENGTH = 40
export const EXPERIENCE_SUBTITLE_MAX_LENGTH = 50

export type ItineraryExperience = {
  title: string
  subtitle: string
  imageUrl: string
  description: string
  location: string
}

function clampText(value: unknown, maxLength?: number): string {
  if (typeof value !== 'string') {
    return ''
  }

  const normalized = value.trim()

  if (!maxLength) {
    return normalized
  }

  return normalized.slice(0, maxLength)
}

export function normalizeExperience(value: unknown): ItineraryExperience {
  const experience = (value ?? {}) as Record<string, unknown>

  return {
    title: clampText(experience.title, EXPERIENCE_TITLE_MAX_LENGTH),
    subtitle: clampText(experience.subtitle, EXPERIENCE_SUBTITLE_MAX_LENGTH),
    imageUrl: clampText(experience.imageUrl),
    description: clampText(experience.description),
    location: clampText(experience.location),
  }
}

export function normalizeExperiences(value: unknown): ItineraryExperience[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.map(normalizeExperience)
}
