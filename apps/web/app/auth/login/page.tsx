'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const features = [
  'Ultra HD 4K Kalitesinde Anime',
  'Türkçe Altyazı ve Dublaj',
  'Reklamsız İzleme Deneyimi',
  'Çoklu Cihaz Desteği',
  'Yeni Bölümler Anında',
  'Özel İçerikler',
]

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Giriş işlemleri burada yapılacak
    setTimeout(() => {
      setIsLoading(false)
      router.push('/home')
    }, 1000)
  }

  return (
    <>
      {/* Ana Başlık */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-5xl font-bold !leading-normal text-transparent sm:text-6xl">
          Anizium'a Hoş Geldin!
        </h1>
      </motion.div>

      <div className="grid gap-16 md:grid-cols-2">
        {/* Sol Taraf - Form ve Slogan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto w-full max-w-xl md:max-w-none"
        >
          <div className="mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-3xl font-bold text-white sm:text-4xl"
            >
              Giriş Yap
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 sm:text-xl"
            >
              Anime dünyasına giriş yap ve maceraya başla!
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Kullanıcı adı veya E-mail"
                  className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Şifre"
                  className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary-red hover:bg-primary-red/90 h-14 w-full text-lg font-medium"
            >
              {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 space-y-4"
          >
            <Link
              href="/auth/forgot-password"
              className="hover:text-primary-red block text-lg text-gray-400 transition-colors"
            >
              Şifreni mi unuttun?
            </Link>
            <div className="text-lg text-gray-400">
              Hesabın yok mu?{' '}
              <Link
                href="/auth/register"
                className="text-primary-red hover:text-primary-red/80 font-medium transition-all"
              >
                Kayıt Ol
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Sağ Taraf - Özellikler */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative md:block"
        >
          <div className="absolute -left-px top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />
          <div className="md:pl-16 lg:pl-24">
            <h3 className="mb-8 text-center text-2xl font-semibold text-white sm:text-3xl md:text-left">
              Neden Anizium?
            </h3>
            <ul className="space-y-8">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-5 text-lg sm:text-xl"
                >
                  <div className="bg-primary-red/10 text-primary-red flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Check className="h-6 w-6" />
                  </div>
                  <span className="text-gray-400">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  )
}
