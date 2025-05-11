'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Kayıt işlemleri burada yapılacak
    setTimeout(() => {
      setIsLoading(false)
      router.push('/home')
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-3 text-4xl font-bold text-white"
        >
          Kayıt Ol
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-lg text-lg text-gray-400"
        >
          Şifrenizi unuttuğunuz da doğrulama için bu bilgiler kullanılacaktır. Hesap erişiminizi
          kaybetmemek için bilgilerinizi doğru giriniz.
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
          <Input
            type="text"
            placeholder="Kullanıcı Adı*"
            className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
            required
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="text"
              placeholder="Ad (zorunlu değil)"
              className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
            />
            <Input
              type="text"
              placeholder="Soyad (zorunlu değil)"
              className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
            />
          </div>

          <Input
            type="email"
            placeholder="E-mail*"
            className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
            required
          />

          <Input
            type="tel"
            placeholder="Telefon (zorunlu değil)"
            className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
          />

          <Input
            type="password"
            placeholder="Şifre*"
            className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
            required
          />

          <Input
            type="password"
            placeholder="Şifreni Doğrula*"
            className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary-red hover:bg-primary-red/90 h-14 w-full text-lg font-medium"
        >
          {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
        </Button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center"
      >
        <div className="text-lg text-gray-400">
          Zaten hesabın var mı?{' '}
          <Link
            href="/auth/login"
            className="text-primary-red hover:text-primary-red/80 font-medium transition-all"
          >
            Giriş Yap
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
