'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { FaDiscord, FaInstagram } from 'react-icons/fa'
import { SiVisa, SiMastercard } from 'react-icons/si'
import { routes } from '@/config/routes'

export function Footer() {
  return (
    <footer className="mt-20 bg-card">
      <div className="mx-auto max-w-[1400px] px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <Image
              src="/assets/anizium.png"
              alt="Anizium Logo"
              width={120}
              height={40}
              className="object-contain"
            />
            <p className="text-sm text-muted-foreground">
              Dünyanın ilk ve tek 4K Anime izleme platformu Anizium olarak, sevdiğiniz anime
              serilerini 4K kalite ve Türkçe dublajla zenginleştirerek sizlere sunuyoruz.
            </p>
          </div>

          {/* Üyelik */}
          <div className="space-y-4 md:col-span-2">
            <div className="mx-auto w-full max-w-md space-y-4">
              <h3 className="text-lg font-semibold">Üye Olmak Ücretsiz!</h3>
              <p className="text-sm text-muted-foreground">
                Yeni bölüm bildirimleri, kaldığın yerden devam et ve daha fazlası.
              </p>
              <form className="space-y-2">
                <Input type="email" placeholder="email@adresin.com" className="bg-white/10" />
                <Button type="submit" className="w-full">
                  Oluştur
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                aniziumdestek@gmail.com üzerinden bizlerle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>

          {/* Ödeme ve Sosyal Medya */}
          <div className="space-y-8">
            {/* Sosyal Medya */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bizi takip et</h3>
              <div className="flex items-center gap-4">
                <motion.a
                  href="https://discord.gg/anizium"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-primary/20 hover:text-primary"
                >
                  <FaDiscord className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/anizium"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-primary/20 hover:text-primary"
                >
                  <FaInstagram className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            {/* Ödeme */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ödeme yöntemleri</h3>
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center rounded-lg bg-white/10 p-3 transition-colors hover:bg-white/20"
                >
                  <SiVisa className="h-10 w-10" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center rounded-lg bg-white/10 p-3 transition-colors hover:bg-white/20"
                >
                  <SiMastercard className="h-10 w-10" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center rounded-lg bg-white/10 p-3 text-lg font-bold transition-colors hover:bg-white/20"
                >
                  TROY
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © Anizium, 2024 - Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href={routes.privacyPolicy.path}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {routes.privacyPolicy.label}
              </Link>
              <Link
                href={routes.commentPolicy.path}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {routes.commentPolicy.label}
              </Link>
              <Link
                href={routes.termsOfUse.path}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {routes.termsOfUse.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
