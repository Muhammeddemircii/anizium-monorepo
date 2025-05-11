'use client'

import { Button } from '@/components/ui/button'
import { Play, Monitor, Smartphone, Zap, Film, Gamepad, Globe2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComparisonSlider } from '@/components/comparison-slider'
import { AnimatedButton } from '@/components/ui/animated-button'
import { AnimeCard } from '@/components/anime-card'
import { motion } from 'framer-motion'
import { animes, animeCovers } from '@/data/animes'

const features = [
  {
    title: 'Ultra HD 4K Kalite',
    description: 'Tüm animeleri kristal netliğinde 4K çözünürlükte izleyin.',
  },
  {
    title: 'Türkçe Altyazı ve Dublaj',
    description: 'Geniş Türkçe altyazı ve dublaj seçenekleriyle izleyin.',
  },
  {
    title: 'Çoklu Cihaz Desteği',
    description: 'Tüm cihazlarınızda kesintisiz anime keyfi yaşayın.',
  },
  {
    title: 'Yeni Bölümler',
    description: 'En yeni bölümlere anında erişin.',
  },
  {
    title: 'Özel İçerikler',
    description: "Sadece Anizium'da bulabileceğiniz özel içerikler.",
  },
  {
    title: 'Reklamsız Deneyim',
    description: 'Kesintisiz, reklamsız anime keyfi.',
  },
]

const FeatureIcons = [Monitor, Globe2, Smartphone, Zap, Film, Gamepad]

const popularAnimes = animes.slice(0, 4)

export default function HomePage() {
  return (
    <div className="bg-primary-dark relative min-h-screen overflow-hidden">
      {/* Anime Kolaj Arkaplanı */}
      <div className="absolute inset-0 opacity-40">
        <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-[2/3] transform overflow-hidden rounded-2xl transition-transform hover:scale-105"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: 0.5 + (i % 3) * 0.2,
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
      <div className="from-background/90 via-background/80 to-background absolute inset-0 bg-gradient-to-b" />

      {/* İçerik */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-10 pt-20">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="mb-12 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold !leading-normal text-transparent sm:text-5xl md:text-7xl">
                Anime İzlemenin En İyi Yolu
                <br />
                <span className="text-primary-red">4K UHD</span> ile Tanışın
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Türkiye'nin ilk ve tek 4K anime platformunda, en sevdiğiniz animeleri Ultra HD
                kalitede izleyin.
              </p>
            </div>

            {/* Quality Comparison Slider */}
            <div className="relative mx-auto max-w-5xl">
              <ComparisonSlider
                leftImage="/assets/comparison/anime-1080p.png"
                rightImage="/assets/comparison/anime-4k.png"
                className="shadow-primary-red/10 rounded-2xl shadow-2xl"
              />
              <div className="border-primary/40 bg-primary/20 text-primary absolute -bottom-12 left-1/2 -translate-x-1/2 rounded-full border px-4 py-2 text-sm font-medium">
                Kalite farkını görmek için kaydırın
              </div>
            </div>

            {/* CTA */}
            <div className="mx-auto mt-20 flex max-w-xl flex-col justify-center gap-6 sm:flex-row">
              <input
                type="email"
                placeholder="Email adresin"
                className="focus:border-primary/50 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus:outline-none"
              />
              <Link href="/auth/register">
                <AnimatedButton variant="premium" size="lg" className="w-full rounded-xl sm:w-auto">
                  <Play className="mr-2 h-5 w-5" /> ÜCRETSİZ DENE!
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="from-background to-background/90 bg-gradient-to-b py-24">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="mb-16 text-center">
              <div className="border-primary/20 bg-primary/10 mb-4 inline-block rounded-full border px-4 py-2">
                <span className="text-primary font-semibold">Neden Anizium?</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Anime İzlemenin Geleceği</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Anime tutkunları için özenle tasarlandı
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = FeatureIcons[index]
                return (
                  <motion.div
                    key={index}
                    className="hover:border-primary/50 group rounded-xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:bg-white/10"
                    initial={{ scale: 1, y: 0 }}
                    whileHover={{
                      scale: 1.08,
                      y: -10,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 15,
                    }}
                  >
                    <motion.div
                      className="bg-primary/10 mb-6 w-fit rounded-lg p-3"
                      whileHover={{ rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 10 }}
                    >
                      <Icon className="text-primary h-6 w-6" />
                    </motion.div>
                    <h3 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popüler Animeler */}
        <section className="from-background/90 to-background bg-gradient-to-b py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
                Popüler Animeler
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
                En çok izlenen ve beğenilen animeler
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
              {popularAnimes.map((anime, index) => (
                <AnimeCard key={anime.title} anime={anime} variant="grid" />
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="from-background to-background/90 bg-gradient-to-b py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="mb-12 text-center">
              <div className="border-primary-red/20 bg-primary-red/10 mb-4 inline-block rounded-full border px-3 py-1.5 sm:px-4 sm:py-2">
                <span className="text-primary-red text-sm font-semibold sm:text-base">
                  Sorularınız mı var?
                </span>
              </div>
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">
                Sık Sorulan Sorular
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
                Merak ettiğiniz tüm soruların cevapları burada
              </p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-4">
              {[
                {
                  question: "Anizium'u nasıl izleyebilirim?",
                  answer:
                    "Anizium'u bilgisayar, telefon, tablet ve smart TV'ler üzerinden izleyebilirsiniz. Tek yapmanız gereken üye olmak!",
                },
                {
                  question: '4K içerikler ek ücretli mi?',
                  answer:
                    'Hayır! Tüm 4K içerikler premium üyeliğinize dahildir. Ek ücret ödemenize gerek yok.',
                },
                {
                  question: 'İstediğim zaman iptal edebilir miyim?',
                  answer:
                    'Evet, üyeliğinizi dilediğiniz zaman kolayca iptal edebilirsiniz. Taahhüt yok, ek ücret yok!',
                },
                {
                  question: 'Türkçe altyazı ve dublaj seçeneği var mı?',
                  answer:
                    'Evet! Tüm içeriklerimizde Türkçe altyazı, birçok içeriğimizde ise Türkçe dublaj seçeneği mevcuttur.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="border-border/50 bg-card/30 hover:border-primary-red/50 hover:bg-card/50 group cursor-pointer rounded-2xl border p-6 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <h3 className="group-hover:text-primary-red mb-2 text-lg font-semibold transition-colors">
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Subscription */}
        <section className="from-background/90 to-background relative overflow-hidden bg-gradient-to-b py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="border-primary-red/20 bg-primary-red/10 relative overflow-hidden rounded-3xl border p-8 sm:p-12">
              <div className="from-primary-red/5 absolute inset-0 bg-gradient-to-r to-transparent" />
              <div className="relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Hemen İzlemeye Başla</h2>
                  <p className="text-muted-foreground mb-8">
                    Email adresini gir, anime dünyasına katıl!
                  </p>
                  <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      placeholder="Email adresin"
                      className="border-border/50 bg-background/60 focus:border-primary-red/50 flex-1 rounded-xl border px-4 py-3 transition-colors focus:outline-none"
                    />
                    <Link href="/auth/register">
                      <Button
                        size="lg"
                        className="bg-primary-red hover:bg-primary-red/80 rounded-xl"
                      >
                        <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> ÜCRETSİZ DENE!
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
