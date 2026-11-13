import { Button, Heading, Input, Text } from '@medusajs/ui'

export type ReelFormData = {
  video_url: string
  title: string
  location: string
}

export const DEFAULT_REEL_FORM_DATA: ReelFormData = {
  video_url: '',
  title: '',
  location: '',
}

type Props = {
  data: ReelFormData
  loading?: boolean
  onChange: (data: ReelFormData) => void
  onSubmit: () => void
  onCancel: () => void
}

type FieldProps = {
  label: string
  children: React.ReactNode
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Text size="small" weight="plus" className="text-ui-fg-subtle">
        {label}
      </Text>
      {children}
    </div>
  )
}

export default function ReelForm({ data, loading, onChange, onSubmit, onCancel }: Props) {
  const set = (field: keyof ReelFormData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Heading level="h2">Reel Details</Heading>
        <Text className="text-ui-fg-subtle" size="small">
          Add the reel content shown in the homepage inspiration section.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Field label="Video URL">
          <Input
            value={data.video_url}
            onChange={(event) => set('video_url', event.target.value)}
            placeholder="https://.../video.mp4"
          />
        </Field>

        <Field label="Title">
          <Input
            value={data.title}
            onChange={(event) => set('title', event.target.value)}
            placeholder="Prajakta's Singapore Holiday"
          />
        </Field>

        <Field label="Location">
          <Input
            value={data.location}
            onChange={(event) => set('location', event.target.value)}
            placeholder="Singapore"
          />
        </Field>
      </div>

      <div className="flex justify-end gap-3 border-t border-ui-border-base pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onSubmit} isLoading={loading}>
          Create Reel
        </Button>
      </div>
    </div>
  )
}
