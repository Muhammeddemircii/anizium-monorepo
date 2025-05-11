'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle, Send } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'

// Sorun kategorileri
const problemCategories = [
  'Video Oynatma Sorunu',
  'Ses Sorunu',
  'Altyazı Sorunu',
  'Bölüm Eksikliği',
  'Yanlış Çeviri',
  'Teknik Sorun',
  'Diğer',
]

export default function ReportPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: 'Başarılı',
        description: 'Bildiriminiz başarıyla gönderildi. En kısa sürede incelenecektir.',
      })

      // Formu temizle
      setCategory('')
      setTitle('')
      setMessage('')
      setEmail('')
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Bildirim gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-primary-dark min-h-screen px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Üst Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/home"
            className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Ana Sayfaya Dön
          </Link>
          <div className="flex items-center gap-3">
            <AlertCircle className="text-primary-red h-8 w-8" />
            <h1 className="text-3xl font-bold text-white">Sorun Bildir</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Yaşadığınız sorunu bize bildirin, en kısa sürede çözüm üretelim.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sorun Kategorisi */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-400">
                Sorun Kategorisi
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="focus:border-primary-red focus:ring-primary-red w-full rounded-lg border border-gray-800 bg-gray-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1"
                required
              >
                <option value="">Kategori Seçin</option>
                {problemCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Başlık */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-400">
                Sorun Başlığı
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-800/50"
                placeholder="Sorunu kısaca özetleyin"
                required
              />
            </div>

            {/* Mesaj */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-400">
                Detaylı Açıklama
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] bg-gray-800/50"
                placeholder="Yaşadığınız sorunu detaylı bir şekilde açıklayın"
                required
              />
            </div>

            {/* E-posta */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-400">
                E-posta Adresi
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50"
                placeholder="Sizinle iletişime geçebilmemiz için"
                required
              />
            </div>

            {/* Bilgilendirme */}
            <div className="flex items-start gap-3 rounded-lg bg-gray-800/30 p-4">
              <AlertCircle className="text-primary-red mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="text-muted-foreground text-sm">
                Bildiriminiz ekibimiz tarafından incelenecek ve en kısa sürede çözüm üretilecektir.
                Gelişmelerden e-posta yoluyla haberdar edileceksiniz.
              </div>
            </div>

            {/* Gönder Butonu */}
            <Button
              type="submit"
              className="bg-primary-red hover:bg-primary-red/90 w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                'Gönderiliyor...'
              ) : (
                <>
                  Bildirimi Gönder
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
