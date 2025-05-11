'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, Info, Plus, Star } from 'lucide-react'
import { AnimeDetailModal } from './anime-detail-modal'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Anime } from '@/types'
import { routes } from '@/config/routes'

interface AnimeCardProps {
  anime: Anime
  variant?: 'grid' | 'list'
}

export function AnimeCard({ anime, variant = 'grid' }: AnimeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleWatch = (e: React.MouseEvent, anime: Anime) => {
    e.stopPropagation()
    router.push(routes.watch.getPath?.() ?? '#')
  }

  if (variant === 'list') {
    return (
      <>
        <motion.div
          className="group relative h-[200px] cursor-pointer overflow-hidden rounded-xl bg-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          layout
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex h-full">
            {/* Poster */}
            <div className="relative w-[140px] flex-shrink-0">
              <Image src={anime.image} alt={anime.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                  <Button
                    size="sm"
                    className="w-full text-xs"
                    onClick={(e) => handleWatch(e, anime)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    İzle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsModalOpen(true)
                    }}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Detaylar
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-2 text-lg font-bold">{anime.title}</h3>
                  {anime.genres && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {anime.genres.map((genre) => (
                        <span key={genre} className="rounded-full bg-white/10 px-2 py-1 text-xs">
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {anime.rating && (
                  <div className="flex items-center gap-1 rounded-full bg-yellow-400/10 px-2 py-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">{anime.rating}</span>
                  </div>
                )}
              </div>

              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{anime.description}</p>

              <div className="mt-auto flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {anime.type && <span>{anime.type}</span>}
                  {anime.episodes && <span>• {anime.episodes.length} Bölüm</span>}
                  {anime.year && <span>• {anime.year}</span>}
                </div>
                {anime.quality && (
                  <span className="rounded-full bg-primary px-2 py-1 text-xs text-white">
                    {anime.quality}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <AnimeDetailModal
          anime={anime}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    )
  }

  return (
    <>
      <motion.div
        className="group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-xl"
        whileHover={{ scale: 1.15 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <Image
          src={anime.image}
          alt={anime.title}
          fill
          className="object-cover transition-transform"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 flex translate-y-[100%] flex-col gap-2 p-4 transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex items-center gap-2">
            {anime.rating && (
              <div className="flex items-center gap-1 rounded-md bg-yellow-400/20 px-2 py-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">{anime.rating}</span>
              </div>
            )}
            {anime.type && (
              <div className="rounded-md bg-white/20 px-2 py-1">
                <span className="text-sm font-medium">{anime.type}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-tight">{anime.title}</h3>
          <div className="flex flex-wrap gap-1">
            {anime.genres?.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              className="w-full bg-primary-red hover:bg-primary-red/90"
              onClick={(e) => handleWatch(e, anime)}
            >
              <Play className="mr-2 h-4 w-4" /> İzle
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                setIsModalOpen(true)
              }}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <AnimeDetailModal anime={anime} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
