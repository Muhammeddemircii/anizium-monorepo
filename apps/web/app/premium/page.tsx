'use client'

import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    name: 'DENEME PAKET',
    price: '1',
    duration: '3 Gün',
    features: [
      '4K - 1080P Görüntü Kalitesi',
      '2 Profil Seçeneği',
      'Sınırsız Anime İzleme Süresi',
      'Reklamsız Anime',
      'Çoklu Altyazı Seçenekleri',
      'Çoklu Dublaj Seçenekleri',
      '7/24 Canlı Destek',
    ],
    buttonText: '3 Gün Deneyin',
    href: '/auth/register',
    popular: false,
  },
  {
    name: 'STANDART PAKET',
    price: '14.99',
    duration: '1 Ay',
    originalPrice: '59.99',
    discount: '70',
    features: [
      '4K - 1080P Görüntü Kalitesi',
      '4 Profil Seçeneği',
      'Sınırsız Anime İzleme Süresi',
      'Reklamsız Anime',
      'Çoklu Altyazı Seçenekleri',
      'Çoklu Dublaj Seçenekleri',
      '7/24 Canlı Destek',
    ],
    buttonText: 'Satın Al',
    href: '/auth/register',
    popular: false,
  },
  {
    name: 'PLUS PAKET',
    price: '44.99',
    duration: '3 Ay',
    originalPrice: '149.99',
    discount: '70',
    features: [
      '4K - 1080P Görüntü Kalitesi',
      '4 Profil Seçeneği',
      'Sınırsız Anime İzleme Süresi',
      'Reklamsız Anime',
      'Çoklu Altyazı Seçenekleri',
      'Çoklu Dublaj Seçenekleri',
      '7/24 Canlı Destek',
      'İstek Anime',
    ],
    buttonText: 'Satın Al',
    href: '/auth/register',
    popular: true,
  },
  {
    name: 'PRO PAKET',
    price: '149.99',
    duration: '1 Yıl',
    originalPrice: '499.99',
    discount: '70',
    features: [
      '4K - 1080P Görüntü Kalitesi',
      '4 Profil Seçeneği',
      'Sınırsız Anime İzleme Süresi',
      'Reklamsız Anime',
      'Çoklu Altyazı Seçenekleri',
      'Çoklu Dublaj Seçenekleri',
      '7/24 Canlı Destek',
      'İstek Anime',
    ],
    buttonText: 'Satın Al',
    href: '/auth/register',
    popular: false,
  },
  {
    name: 'İNFİNİTY PAKET',
    subtitle: '(SINIRLI SAYIDA SATIŞ)',
    price: '749.99',
    duration: 'Sonsuz',
    originalPrice: '2,999.99',
    discount: '70',
    features: [
      '4K - 1080P Görüntü Kalitesi',
      '4 Profil Seçeneği',
      'Sınırsız Anime İzleme Süresi',
      'Reklamsız Anime',
      'Çoklu Altyazı Seçenekleri',
      'Çoklu Dublaj Seçenekleri',
      '7/24 Canlı Destek',
      'İstek Anime',
      'Özel Discord Rolü',
      'Erken Erişim',
    ],
    buttonText: 'Satın Al',
    href: '/auth/register',
    popular: false,
  },
]

export default function PremiumPage() {
  const [isGiftCodeOpen, setIsGiftCodeOpen] = useState(false)

  return (
    <div className="bg-primary-dark relative min-h-screen">
      {/* Gradient Background */}
      <div className="from-primary-red/30 pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] via-transparent to-transparent" />

      <div className="mx-auto max-w-[1400px] px-4 py-20">
        {/* Header */}
        <div className="relative mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl"
          >
            Premium Üyelik
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg"
          >
            4K kalitesinde anime keyfi için hemen premium üye olun!
          </motion.p>
        </div>

        {/* Hediye Kodu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <button
            type="button"
            onClick={() => setIsGiftCodeOpen(!isGiftCodeOpen)}
            className="hover:text-primary-red mx-auto flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-lg text-gray-400 transition-colors"
          >
            Hediye Kodu Kullan
            <ChevronDown
              className={`h-5 w-5 transition-transform ${isGiftCodeOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isGiftCodeOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mx-auto mt-4 flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm sm:flex-row">
                  <input
                    type="text"
                    placeholder="Hediye kodunuz"
                    className="focus:border-primary-red/50 focus:ring-primary-red/20 h-12 w-full flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2"
                  />
                  <Button className="bg-primary-red hover:bg-primary-red/90 h-12 w-full text-base font-medium sm:w-auto sm:px-8">
                    KULLAN
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
              className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all ${
                plan.popular
                  ? 'border-primary-red bg-primary-red/10'
                  : 'border-white/10 bg-black/20 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="bg-primary-red absolute right-0 top-0 px-3 py-1 text-sm font-medium">
                  En Popüler
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                {plan.subtitle && <p className="text-primary-red mt-1 text-sm">{plan.subtitle}</p>}

                <div className="my-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 text-lg">TL</span>
                    <span className="text-muted-foreground ml-2">/ {plan.duration}</span>
                  </div>

                  {plan.originalPrice && (
                    <div className="mt-1 space-x-2">
                      <span className="text-muted-foreground line-through">
                        {plan.originalPrice} TL
                      </span>
                      <span className="text-primary-red">%{plan.discount} İNDİRİM</span>
                    </div>
                  )}
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <Check className="text-primary-red mr-2 h-5 w-5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <Button
                    className={`h-12 w-full text-base font-medium ${
                      plan.popular
                        ? 'bg-primary-red hover:bg-primary-red/90'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-24"
        >
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Sıkça Sorulan Sorular</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Premium üyelik hakkında merak ettiğiniz her şey
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6">
            {[
              {
                question: 'Premium üyelik ne zaman başlar?',
                answer:
                  'Premium üyeliğiniz ödeme işleminizin tamamlanmasının ardından anında aktif olur.',
              },
              {
                question: 'İstediğim zaman iptal edebilir miyim?',
                answer:
                  'Evet, üyeliğinizi dilediğiniz zaman kolayca iptal edebilirsiniz. İptal işlemi anında gerçekleşir.',
              },
              {
                question: 'Hangi ödeme yöntemlerini kullanabilirim?',
                answer:
                  'Kredi kartı, banka kartı, Papara ve havale/EFT yöntemlerini kullanabilirsiniz.',
              },
              {
                question: 'Premium üyelik neleri kapsar?',
                answer:
                  '4K görüntü kalitesi, reklamsız izleme, çoklu altyazı ve dublaj seçenekleri, çoklu profil desteği ve daha fazlası.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm transition-all hover:border-white/20"
              >
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="text-muted-foreground mt-2">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
