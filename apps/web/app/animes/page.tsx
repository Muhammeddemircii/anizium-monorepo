'use client'

import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { AnimeCard } from '@/components/anime-card'
import { AnimeFilters } from '@/components/anime-filters'
import { Grid, List, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { animes } from '@/data/animes'
import { useSearchParams } from 'next/navigation'
import { Container } from '@/components/container'

const alphabet = [
  '#',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

// Örnek filtre kategorileri
const filterCategories = {
  genres: [
    'Aksiyon',
    'Macera',
    'Komedi',
    'Dram',
    'Fantastik',
    'Korku',
    'Gizem',
    'Romantik',
    'Bilim Kurgu',
    'Spor',
    'Doğaüstü',
    'Psikolojik',
    'Gerilim',
    'Suç',
    'Tarih',
    'Vahşi Batı',
    'İsekai',
    'Askeri',
    'Dedektif',
    'Ecchi',
    'Harem',
    'Vampir',
    'Kan & Vahşet',
    'Shounen',
    'Seinen',
    'Canavar',
    'Şeytan',
    'İntikam',
    'Okul',
    'Shoujo',
    'Oyun',
    'Samuray',
    'Ninja',
    'Yaşamdan Kesitler',
    'Mecha',
    'Parodi',
    'Sihir',
    'Türkçe Dublaj',
  ],
  years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
  countries: ['Japonya', 'Çin', 'Güney Kore'],
  status: ['Devam Ediyor', 'Tamamlandı', 'Yakında'],
  quality: ['4K', '1080p', '720p'],
  type: ['TV', 'Film', 'OVA', 'ONA', 'Special'],
  sortBy: [
    'IMDb Yüksek',
    'IMDb Düşük',
    'Yeni Eklenenler',
    'En Eski Eklenenler',
    'Çıkış Tarihi En Yeni',
    'Çıkış Tarihi En Eski',
  ],
}

function AnimePageContent() {
  const searchParams = useSearchParams()
  const [isGridView, setIsGridView] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<{
    genres: string[]
    years: string[]
    countries: string[]
    status: string[]
    quality: string[]
    type: string[]
    sortBy: string[]
  }>({
    genres: [],
    years: [],
    countries: [],
    status: [],
    quality: [],
    type: [],
    sortBy: [],
  })

  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'year' | 'latest'>('latest')
  const [searchQuery, setSearchQuery] = useState('')

  // URL'den arama sorgusunu al
  useEffect(() => {
    const query = searchParams.get('search')
    if (query) {
      setSearchQuery(query)
      setShowFilters(true) // Filtreleri otomatik aç
    }
  }, [searchParams])

  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters((prev) => {
      const categoryFilters = prev[category as keyof typeof prev]
      const isSelected = categoryFilters.includes(value)

      return {
        ...prev,
        [category]: isSelected
          ? categoryFilters.filter((item) => item !== value)
          : [...categoryFilters, value],
      }
    })
  }

  const filteredAnimes = animes.filter((anime) => {
    // Alfabetik filtre kontrolü
    if (selectedLetter) {
      if (selectedLetter === '#') {
        if (anime.title.match(/^[0-9]/)) return true
        return false
      }
      if (!anime.title.toUpperCase().startsWith(selectedLetter)) return false
    }

    // Diğer filtreler
    const matchesGenres =
      activeFilters.genres.length === 0 ||
      activeFilters.genres.some((genre) => anime.genres?.includes(genre))

    const matchesYear =
      activeFilters.years.length === 0 || activeFilters.years.includes(anime.year || '')

    const matchesStatus =
      activeFilters.status.length === 0 || activeFilters.status.includes(anime.status || '')

    const matchesQuality =
      activeFilters.quality.length === 0 || activeFilters.quality.includes(anime.quality || '')

    const matchesType =
      activeFilters.type.length === 0 || activeFilters.type.includes(anime.type || '')

    // Arama sorgusu kontrolü
    const matchesSearch =
      searchQuery === '' || anime.title.toLowerCase().includes(searchQuery.toLowerCase())

    return (
      matchesGenres &&
      matchesYear &&
      matchesStatus &&
      matchesQuality &&
      matchesType &&
      matchesSearch
    )
  })

  // Sıralama işlemi
  const sortedAnimes = [...filteredAnimes].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return Number(b.rating) - Number(a.rating)
      case 'name':
        return a.title.localeCompare(b.title)
      case 'year':
        return Number(b.year) - Number(a.year)
      case 'latest':
      default:
        return 0
    }
  })

  return (
    <Container>
      <div>
        <div className="mx-auto max-w-[1400px] px-4">
          {/* Alphabet Filter */}
          <motion.div
            className="mb-8 rounded-lg bg-card p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap justify-center gap-2">
              {alphabet.map((letter) => (
                <motion.button
                  key={letter}
                  className={cn(
                    'h-10 w-10 rounded-lg text-base font-medium transition-colors',
                    selectedLetter === letter
                      ? 'bg-primary text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLetter(letter === selectedLetter ? null : letter)}
                >
                  {letter}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <motion.h1
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Animeler
            </motion.h1>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center gap-2 rounded-lg bg-white/10 p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={isGridView ? 'bg-white/20' : ''}
                  onClick={() => setIsGridView(true)}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={!isGridView ? 'bg-white/20' : ''}
                  onClick={() => setIsGridView(false)}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'bg-primary text-white' : ''}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtrele
              </Button>
            </div>
          </div>

          {/* Filters */}
          <AnimeFilters
            show={showFilters}
            categories={filterCategories}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Anime Grid/List */}
          <motion.div
            className={`grid gap-6 ${
              isGridView
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                : 'grid-cols-1'
            }`}
            layout
          >
            {sortedAnimes.length > 0 ? (
              [...sortedAnimes, ...sortedAnimes, ...sortedAnimes].map((anime, index) => (
                <motion.div
                  key={anime.title + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <AnimeCard anime={anime} variant={isGridView ? 'grid' : 'list'} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full py-12 text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Sonuç bulunamadı
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </Container>
  )
}

export default function AnimePage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <AnimePageContent />
    </Suspense>
  )
}
