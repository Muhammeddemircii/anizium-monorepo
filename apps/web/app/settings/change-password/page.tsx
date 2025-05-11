'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basit validasyon
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Hata',
        description: 'Yeni şifreler eşleşmiyor.',
        variant: 'destructive',
      })
      setIsLoading(false)
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Hata',
        description: 'Yeni şifre en az 6 karakter olmalıdır.',
        variant: 'destructive',
      })
      setIsLoading(false)
      return
    }

    try {
      // API çağrısı burada yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simüle edilmiş API çağrısı

      toast({
        title: 'Başarılı',
        description: 'Şifreniz başarıyla değiştirildi.',
      })

      // Formu temizle
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Şifre değiştirme işlemi başarısız oldu.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-primary-dark flex min-h-screen flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-md">
        {/* Üst Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center"
        >
          <Link href="/settings" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-400 hover:text-white" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Şifre Değiştir</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mevcut Şifre */}
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium text-gray-400">
                Mevcut Şifre
              </label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-gray-800/50 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Yeni Şifre */}
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-400">
                Yeni Şifre
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-800/50 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Yeni Şifre Tekrar */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-400">
                Yeni Şifre Tekrar
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-800/50 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Şifre Gereksinimleri */}
            <div className="rounded-lg bg-gray-800/30 p-4">
              <h3 className="mb-2 text-sm font-medium text-gray-300">Şifre Gereksinimleri:</h3>
              <ul className="space-y-1 text-xs text-gray-400">
                <li className={newPassword.length >= 6 ? 'text-green-500' : ''}>
                  • En az 6 karakter uzunluğunda
                </li>
                <li className={/[A-Z]/.test(newPassword) ? 'text-green-500' : ''}>
                  • En az 1 büyük harf
                </li>
                <li className={/[0-9]/.test(newPassword) ? 'text-green-500' : ''}>
                  • En az 1 rakam
                </li>
              </ul>
            </div>

            {/* Butonlar */}
            <div className="flex justify-end space-x-4">
              <Link href="/settings">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:text-white"
                >
                  İptal
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-primary-red hover:bg-primary-red/90"
                disabled={isLoading}
              >
                {isLoading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
