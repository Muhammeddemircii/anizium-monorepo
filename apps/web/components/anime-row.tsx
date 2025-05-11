'use client'

import { motion } from 'framer-motion'
import { AnimeCard } from './anime-card'
import { ChevronRight } from 'lucide-react'
import { Anime } from '@/types'
import Link from 'next/link'

interface AnimeRowProps {
  title: string
  animes: Anime[]
  href?: string
}

export function AnimeRow({ title, animes, href }: AnimeRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {href && (
          <Link
            href={href}
            className="flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
          >
            Tümünü Gör
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} variant="grid" />
        ))}
      </div>
    </motion.div>
  )
}
