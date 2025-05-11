'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Filter, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AnimeCard } from '@/components/anime-card'
import { animes } from '@/data/animes'

// Örnek kaydedilen animeler (gerçek uygulamada API'den gelecek)
const savedAnimes = animes.slice(0, 8).map((anime) => ({
  ...anime,
  savedAt: new Date(Date.now() - Math.random() * 10000000000),
  status: ['İzleniyor', 'İzlenecek', 'İzlendi', 'Bırakıldı'][Math.floor(Math.random() * 4)],
}))

const statusFilters = ['Tümü', 'İzleniyor', 'İzlenecek', 'İzlendi', 'Bırakıldı']

export default function ListsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('Tümü')
  const [showFilters, setShowFilters] = useState(false)

  // Anime filtreleme
  const filteredAnimes = savedAnimes
    .filter(
      (anime) =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((anime) => selectedStatus === 'Tümü' || anime.status === selectedStatus)
    .sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime())

  return (
    <div className="bg-primary-dark min-h-screen px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Üst Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <Bookmark className="text-primary-red h-8 w-8" />
            <h1 className="text-3xl font-bold text-white">Listem</h1>
          </div>
          <p className="text-muted-foreground mt-2">Kaydettiğin ve takip ettiğin animeler</p>
        </motion.div>

        {/* Arama ve Filtreler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Arama */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Anime ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800/50 pl-10"
              />
            </div>

            {/* Filtre Butonu (Mobil) */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-700 sm:hidden"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtrele
            </Button>

            {/* Filtreler (Desktop) */}
            <div className="hidden gap-2 sm:flex">
              {statusFilters.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus(status)}
                  className={
                    selectedStatus === status
                      ? 'bg-primary-red hover:bg-primary-red/90'
                      : 'border-gray-700'
                  }
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtreler (Mobil) */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 sm:hidden"
            >
              {statusFilters.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus(status)}
                  className={
                    selectedStatus === status
                      ? 'bg-primary-red hover:bg-primary-red/90'
                      : 'border-gray-700'
                  }
                >
                  {status}
                </Button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Anime Listesi */}
        {filteredAnimes.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredAnimes.map((anime) => (
              <motion.div
                key={anime.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group relative"
              >
                <AnimeCard anime={anime} variant="grid" />
                {/* Durum Etiketi */}
                <div className="absolute right-2 top-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {anime.status}
                </div>
                {/* Kaydetme Tarihi */}
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-gray-300 backdrop-blur-sm">
                  {anime.savedAt.toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center rounded-xl border border-gray-800 bg-gray-900/50 py-12"
          >
            <Bookmark className="text-primary-red mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold text-white">Liste Boş</h3>
            <p className="text-muted-foreground text-center">
              Henüz listene anime eklememişsin.
              <br />
              Animeleri keşfetmeye başla ve listene ekle!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
