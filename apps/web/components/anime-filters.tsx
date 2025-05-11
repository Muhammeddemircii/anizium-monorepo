'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

interface AnimeFiltersProps {
  show: boolean
  categories: {
    genres: string[]
    years: string[]
    countries: string[]
    status: string[]
    quality: string[]
    type: string[]
    sortBy: string[]
  }
  activeFilters: {
    genres: string[]
    years: string[]
    countries: string[]
    status: string[]
    quality: string[]
    type: string[]
    sortBy: string[]
  }
  onFilterChange: (category: string, value: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function AnimeFilters({
  show,
  categories,
  activeFilters,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: AnimeFiltersProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="mb-8 w-full overflow-hidden rounded-lg bg-card"
        >
          {/* Arama */}
          <div className="border-b border-white/10 p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Anime ara..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-12 bg-white/10 pl-12 text-xl"
              />
            </div>
          </div>

          {/* Filtreler */}
          <div className="grid divide-x divide-white/10 md:grid-cols-2">
            {/* Sol Taraf - Türler */}
            <div className="p-6">
              <h3 className="mb-4 text-xl font-semibold">Türler</h3>
              <div className="flex flex-wrap gap-2">
                {categories.genres.map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => onFilterChange('genres', item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'rounded-full px-5 py-2.5 text-base font-medium transition-colors',
                      activeFilters.genres.includes(item)
                        ? 'bg-primary text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    )}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sağ Taraf - Diğer Filtreler */}
            <div className="space-y-6 p-6">
              {/* Yıl */}
              <div>
                <h3 className="mb-4 text-xl font-semibold">Yıl</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.years.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => onFilterChange('years', item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'rounded-full px-5 py-2.5 text-base font-medium transition-colors',
                        activeFilters.years.includes(item)
                          ? 'bg-primary text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      )}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Durum */}
              <div>
                <h3 className="mb-4 text-xl font-semibold">Durum</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.status.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => onFilterChange('status', item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'rounded-full px-5 py-2.5 text-base font-medium transition-colors',
                        activeFilters.status.includes(item)
                          ? 'bg-primary text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      )}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Kalite */}
              <div>
                <h3 className="mb-4 text-xl font-semibold">Kalite</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.quality.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => onFilterChange('quality', item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'rounded-full px-5 py-2.5 text-base font-medium transition-colors',
                        activeFilters.quality.includes(item)
                          ? 'bg-primary text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      )}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div>
                <h3 className="mb-4 text-xl font-semibold">Tip</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.type.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => onFilterChange('type', item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'rounded-full px-5 py-2.5 text-base font-medium transition-colors',
                        activeFilters.type.includes(item)
                          ? 'bg-primary text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      )}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sıralama */}
              <div>
                <h3 className="mb-4 text-xl font-semibold">Sıralama</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.sortBy.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => onFilterChange('sortBy', item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'rounded-full px-5 py-2.5 text-base font-medium transition-colors',
                        activeFilters.sortBy.includes(item)
                          ? 'bg-primary text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      )}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
