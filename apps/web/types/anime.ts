export interface Episode {
  id: string
  title: string
  season: number
  episode: number
}

export interface Anime {
  id: string
  title: string
  image: string
  rating: string
  year: string
  genres: string[]
  description: string
  type?: string
  status?: string
  quality?: string
  episodes?: Episode[]
}
