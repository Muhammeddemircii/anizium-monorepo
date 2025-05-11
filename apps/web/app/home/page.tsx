'use client'

import { Header } from '@/components/header'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play, Info, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { animes, featuredAnime } from '@/data/animes'
import { useState } from 'react'
import { AnimatedButton } from '@/components/ui/animated-button'
import { AnimeRow } from '@/components/anime-row'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'

function HomeContent() {
  const [continueWatching] = useState(animes.slice(0, 6))
  const [trending] = useState(animes)
  const [newReleases] = useState([...animes].reverse())
  const [popular] = useState(animes.slice(2))

  return (
    <div className="space-y-8">
      {/* Ana Banner */}
      <section className="relative min-h-[90vh]">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={featuredAnime.backgroundImage}
            alt={featuredAnime.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto h-full max-w-[1400px] px-4">
          <div className="flex min-h-[90vh] items-center gap-8">
            <motion.div
              className="max-w-2xl flex-1 pt-20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="font-semibold text-primary-red">
                    {featuredAnime.rating} Puan
                  </span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/60">{featuredAnime.year}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/60">{featuredAnime.episodes} Bölüm</span>
                </motion.div>
                <motion.h1
                  className="text-4xl font-bold sm:text-5xl md:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {featuredAnime.title}
                </motion.h1>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {featuredAnime.genres.map((genre, index) => (
                    <motion.span
                      key={index}
                      className="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-sm transition-colors hover:bg-white/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {genre}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.p
                  className="max-w-xl text-lg text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {featuredAnime.description}
                </motion.p>
                <motion.div
                  className="flex gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <AnimatedButton variant="premium" size="lg">
                    <Play className="mr-2 h-5 w-5" /> İzle
                  </AnimatedButton>
                  <AnimatedButton size="lg" variant="secondary">
                    <Info className="mr-2 h-5 w-5" /> Daha Fazla Bilgi
                  </AnimatedButton>
                </motion.div>
              </div>
            </motion.div>
            {/* Cover Image */}
            <motion.div
              className="group relative hidden w-[400px] lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="aspect-square overflow-hidden rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={featuredAnime.coverImage}
                  alt={featuredAnime.title}
                  fill
                  className="rounded-3xl object-cover"
                  sizes="(max-width: 768px) 0vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 rounded-xl bg-primary-red px-4 py-2 text-white shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="font-bold">4K UHD</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* İçerik Sıraları */}
      <div className="mx-auto max-w-[1400px] px-4 pb-8 sm:pb-16">
        <div className="space-y-6 sm:space-y-8">
          <AnimeRow title="İzlemeye Devam Et" animes={continueWatching} />
          <AnimeRow title="Gündemdekiler" animes={trending} />
          <AnimeRow title="Yeni Eklenenler" animes={newReleases} />
          <AnimeRow title="Bölgende Popüler" animes={popular} />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  // İlk 5 animeyi popüler olarak göster
  const popularAnimes = animes.slice(0, 5)
  // 5-10 arası animeleri yeni eklenenler olarak göster
  const newAnimes = animes.slice(5, 10)
  // 10-15 arası animeleri trend olarak göster
  const trendingAnimes = animes.slice(10, 15)

  return (
    <Container>
      <div>
        {/* Hero Section */}
        <div className="relative h-[85vh] bg-gradient-to-b from-neutral-900 to-[#0b0b0b]">
          <div className="absolute inset-0">
            <Image
              src="/assets/covers/attack-on-titan.jpg"
              alt="Attack on Titan"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          </div>

          <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-primary-red" />
                4K UHD
              </div>

              <h1 className="text-5xl font-bold text-white">Attack on Titan</h1>
              <p className="text-lg text-white/80">
                İnsanlık, gizemli devasa yaratıklar tarafından neredeyse yok edilmiştir ve hayatta
                kalanlar, devasa duvarların arkasında yaşamaktadır.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link href="/watch/1">
                  <Button size="lg" className="gap-2">
                    <Play className="h-5 w-5" />
                    İzle
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2">
                  <Info className="h-5 w-5" />
                  Detaylar
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1400px] space-y-12 px-4 pb-12">
          <AnimeRow title="Popüler Animeler" animes={popularAnimes} href="/animeler" />

          <AnimeRow title="Yeni Eklenenler" animes={newAnimes} href="/animeler" />

          <AnimeRow title="Trend" animes={trendingAnimes} href="/animeler" />
        </div>
      </div>
    </Container>
  )
}
