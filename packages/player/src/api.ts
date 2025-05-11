export interface ResponseSubtitle {
  row: number
  group: string
  name: string
  short_name: string
  link: string
}

export interface ResponseVideoLink {
  hls: boolean
  quality: 720 | 1080 | 1440 | 2160
  link: string
}

export interface ResponsePlayerSource {
  group: number
  row: number
  name: string
  hls: boolean
  link: ResponseVideoLink[]
}

export interface ResponsePlayerData {
  isError: boolean
  success: boolean
  style: string
  js_version: string
  subtitle: ResponseSubtitle[]
  source: ResponsePlayerSource[]
  banner: string
  next_episode_id?: string
  next_episode?: string
  opening?: {
    start: string
    end: string
  }
}
