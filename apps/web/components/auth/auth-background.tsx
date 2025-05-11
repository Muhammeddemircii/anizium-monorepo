'use client'

import Image from 'next/image'
import { animeCovers } from '@/data/animes'

export function AuthBackground() {
  return (
    <>
      {/* Anime Kolaj Arkaplanı */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-[2/3] transform overflow-hidden rounded-2xl transition-transform hover:scale-105"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: 0.6 + (i % 3) * 0.2,
              }}
            >
              <Image
                src={animeCovers[i % animeCovers.length]}
                alt="Anime cover"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                priority={i < 12}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="from-primary-dark/80 via-primary-dark/85 to-primary-dark/90 absolute inset-0 bg-gradient-to-b" />
    </>
  )
}
