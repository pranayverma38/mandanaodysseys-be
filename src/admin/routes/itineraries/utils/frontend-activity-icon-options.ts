import { FRONTEND_SUPPORTED_ICON_OPTIONS } from './frontend-icon-options'

/**
 * Icons for Things To Do sub-activities.
 * Time-of-day keys come first; amenity icons follow so the storefront can reuse ICONS_MAP.
 */
export const FRONTEND_SUPPORTED_ACTIVITY_ICON_OPTIONS = [
  { value: 'MorningIcon', label: 'Morning' },
  { value: 'AfternoonIcon', label: 'Afternoon' },
  { value: 'EveningIcon', label: 'Evening' },
  { value: 'FoodIcon', label: 'Food' },
  { value: 'TransportIcon', label: 'Transport' },
  { value: 'StayIcon', label: 'Stay' },
  { value: 'ActivityIcon', label: 'Activity' },
  ...FRONTEND_SUPPORTED_ICON_OPTIONS.map((icon) => ({
    value: icon,
    label: icon,
  })),
] as const
