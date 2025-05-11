export type FilterCategory = 'Cinematic' | 'Vintage' | 'Mood' | 'Style' | 'Color'

export interface FilterValues {
  brightness?: number
  contrast?: number
  saturation?: number
  hue?: number
  blur?: number
  sepia?: number
  grayscale?: number
  invert?: number
  temperature?: number
  saturate?: number
  hueRotate?: number
  vignette?: string
  grain?: string
}

export interface Filter {
  name: string
  category: FilterCategory
  values: FilterValues
}

export interface Subtitle {
  label: string
  srclang: string
  src: string
}

export interface SubtitleStyle {
  fontFamily: string
  fontSize: number | string
  fontWeight: number
  color: string
  backgroundColor: string
  opacity: number
  position: 'bottom' | 'top'
  textShadow: boolean
  padding: number
  margin: number
  timeOffset?: number
  customSubtitle?: {
    label: string
    src: string
  }
  minBottomPosition?: number
  letterColor?: string
  timeShift?: number
}

export interface SkipTime {
  id: string
  label: string
  notificationLabel: string
  start: number
  end: number
  onClick?: () => void
}

export interface Source {
  label: string
  src: string
  type: 'hls' | 'mp4'
  language?: string
  resolution?: string
  bitrate?: number
  level?: number
}

export interface Level {
  label: string
  resolution: string
  bitrate: number
  level: number
}

export interface AudioOption {
  label: string
  source: Source
  sources: Source[]
}

export interface PlayerControlsProps {
  buttonClassName?: string
  iconClassName?: string
  dropdownMenuContentClassName?: string
  dropdownMenuItemClassName?: string
  checkIconClassName?: string
  labelClassName?: string
  labelTextClassName?: string
  labelText?: string
  showLabel?: boolean
  portalContainerId?: string
  triggerClassName?: string
  triggerLabelClassName?: string
  triggerValueClassName?: string
  textClassName?: string
  valueClassName?: string
}

export interface Episode {
  id: string
  title: string
  season?: number
  episode?: number
}

export interface PlayerSettings {
  volume: number
  isMuted: boolean
  playbackSpeed: number
  subtitleStyle: SubtitleStyle
  brightness: number
  opacity: number
  activeFilter: string
  currentFilterValues: FilterValues | null
  lastQualityPreference?: string
  lastAudioPreference?: string
  lastSubtitleLanguage?: string
  autoQuality: boolean
}
