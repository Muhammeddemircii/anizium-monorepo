'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Şifre sıfırlama e-postası gönderme işlemleri burada yapılacak
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
    }, 1000)
  }

  return (
    <div className="mx-auto flex h-full max-w-xl flex-col justify-center">
      <div className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-3 text-4xl font-bold text-white"
        >
          Şifremi Unuttum
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400"
        >
          E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
        </motion.p>
      </div>

      {!emailSent ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="E-mail adresiniz"
              className="focus:border-primary-red/50 focus:ring-primary-red/20 h-14 border-white/10 bg-white/10 px-5 text-lg placeholder:text-gray-400 focus:bg-white/20 focus:ring-4"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary-red hover:bg-primary-red/90 h-14 w-full text-lg font-medium"
          >
            {isLoading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
          </Button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 text-center"
        >
          <div className="rounded-xl bg-green-500/10 p-4 text-lg text-green-500">
            Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.
          </div>
          <Button
            onClick={() => router.push('/auth/login')}
            className="bg-primary-red hover:bg-primary-red/90 h-14 w-full text-lg font-medium"
          >
            Giriş Sayfasına Dön
          </Button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center"
      >
        <Link
          href="/auth/login"
          className="text-primary-red hover:text-primary-red/80 text-lg transition-all"
        >
          Giriş sayfasına dön
        </Link>
      </motion.div>
    </div>
  )
}
