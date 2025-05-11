import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import { Play, Info, Plus, Star, X, Calendar, Clock, Film, ChevronDown, Pause } from 'lucide-react'
import Image from 'next/image'
import { AnimatedButton } from './ui/animated-button'
import { useState } from 'react'
import { Episode } from '@/types'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { routes } from '@/config/routes'
import { useRouter } from 'next/navigation'

interface AnimeDetailModalProps {
  anime: {
    title: string
    image: string
    rating?: string
    year?: string
    genres?: string[]
    episodes?: Episode[]
    description?: string
    seasons?: {
      title: string
      episodes: number
    }[]
  }
  isOpen: boolean
  onClose: () => void
}

export function AnimeDetailModal({ anime, isOpen, onClose }: AnimeDetailModalProps) {
  const [selectedSeason, setSelectedSeason] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const router = useRouter()

  const seasons = anime.seasons || [
    { title: 'Sezon 1', episodes: 12 },
    { title: 'Sezon 2', episodes: 13 },
    { title: 'Sezon 3', episodes: 24 },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[90vh] max-w-[65vw] overflow-hidden bg-background/95 p-0 backdrop-blur-sm">
        <VisuallyHidden>
          <DialogTitle>{anime.title}</DialogTitle>
        </VisuallyHidden>
        {/* Video/Banner Section */}
        <div className="relative h-[40vh] min-h-[300px] w-full">
          {isVideoPlaying ? (
            <video
              src="/assets/anime-1080p.mp4"
              autoPlay
              muted
              loop
              className="h-full w-full object-cover"
            />
          ) : (
            <Image src={anime.image} alt={anime.title} fill className="object-cover" priority />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-background/20 p-2 transition-colors hover:bg-background/40"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Video Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <motion.button
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="rounded-full bg-background/20 p-2 text-white transition-colors hover:bg-background/40"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isVideoPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="custom-scrollbar overflow-y-auto" style={{ height: 'calc(90vh - 40vh)' }}>
          <div className="space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold">{anime.title}</h2>
                {anime.rating && (
                  <div className="flex items-center gap-2 rounded-full bg-yellow-400/10 px-3 py-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-yellow-400">{anime.rating}</span>
                  </div>
                )}
              </div>

              {/* Meta Information */}
              <div className="flex items-center gap-6 text-muted-foreground">
                {anime.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{anime.year}</span>
                  </div>
                )}
                {anime.episodes && anime.episodes.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Film className="h-4 w-4" />
                    <span>{anime.episodes.length} Bölüm</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>24 dk</span>
                </div>
              </div>

              {/* Genres */}
              {anime.genres && (
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <span
                      key={genre}
                      className="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-sm transition-colors hover:bg-white/20"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {anime.description && (
                <p className="text-lg leading-relaxed text-muted-foreground">{anime.description}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <AnimatedButton
                variant="premium"
                size="lg"
                onClick={() => router.push(routes.watch.getPath?.() ?? '#')}
              >
                <Play className="mr-2 h-5 w-5" /> İzle
              </AnimatedButton>
              <AnimatedButton variant="secondary" size="lg" onClick={() => {}}>
                <Plus className="mr-2 h-5 w-5" /> Listeme Ekle
              </AnimatedButton>
            </div>

            {/* Additional Content */}
            <div className="space-y-6">
              {/* Sezon Seçimi */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    className="cursor-pointer appearance-none rounded-lg bg-white/10 px-4 py-2 pr-10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {seasons.map((season, index) => (
                      <option key={season.title} value={index}>
                        {season.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                </div>
                <span className="text-muted-foreground">
                  {seasons[selectedSeason].episodes} Bölüm
                </span>
              </div>

              {/* Bölümler */}
              <div>
                <h3 className="mb-4 text-xl font-semibold">Bölümler</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {Array.from({ length: seasons[selectedSeason].episodes }).map((_, episode) => (
                    <motion.div
                      key={episode}
                      className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={anime.image}
                        alt={`${anime.title} - Bölüm ${episode + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 text-sm font-medium text-white">
                        Bölüm {episode + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold">Benzer Animeler</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <motion.div
                      key={item}
                      className="relative aspect-[2/3] cursor-pointer overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={anime.image}
                        alt={`Benzer Anime ${item}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="truncate text-sm font-medium text-white">
                          Benzer Anime {item}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
