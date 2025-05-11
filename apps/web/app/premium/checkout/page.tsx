'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, CreditCard, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Örnek paket bilgileri (gerçek uygulamada API'den veya URL'den gelecek)
const selectedPlan = {
  name: 'Premium',
  price: 149.99,
  period: 'ay',
  features: [
    '4K UHD Kalitesinde İzleme',
    'Sınırsız Anime',
    'Reklamsız Deneyim',
    'Çoklu Cihaz Desteği',
    'Özel İçerikler',
    'Öncelikli Destek',
  ],
}

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardHolder, setCardHolder] = useState('')

  // Kart numarası formatlama
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  // Son kullanma tarihi formatlama
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '')
    }
    return v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Başarılı ödeme sonrası yönlendirme
    window.location.href = '/premium/success'
  }

  return (
    <div className="bg-primary-dark min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Üst Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/premium"
            className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Premium Paketlere Dön
          </Link>
          <h1 className="text-3xl font-bold text-white">Ödeme</h1>
          <p className="text-muted-foreground mt-2">
            Premium üyeliğinizi başlatmak için ödeme bilgilerinizi girin
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
          {/* Ödeme Formu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Kart Bilgileri */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">Kart Bilgileri</h2>

                  {/* Kart Numarası */}
                  <div className="space-y-2">
                    <label htmlFor="cardNumber" className="text-sm font-medium text-gray-400">
                      Kart Numarası
                    </label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        className="bg-gray-800/50 pl-10"
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                      <CreditCard className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Kart Üzerindeki İsim */}
                  <div className="space-y-2">
                    <label htmlFor="cardHolder" className="text-sm font-medium text-gray-400">
                      Kart Üzerindeki İsim
                    </label>
                    <Input
                      id="cardHolder"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="bg-gray-800/50"
                      placeholder="AD SOYAD"
                      required
                    />
                  </div>

                  {/* Son Kullanma ve CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="expiryDate" className="text-sm font-medium text-gray-400">
                        Son Kullanma Tarihi
                      </label>
                      <Input
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        maxLength={5}
                        className="bg-gray-800/50"
                        placeholder="AA/YY"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cvv" className="text-sm font-medium text-gray-400">
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                        maxLength={3}
                        className="bg-gray-800/50"
                        placeholder="000"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Güvenli Ödeme Notu */}
                <div className="flex items-start gap-3 rounded-lg bg-gray-800/30 p-4">
                  <Shield className="text-primary-red mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Güvenli Ödeme</p>
                    <p className="text-muted-foreground text-sm">
                      256-bit SSL şifreleme ile güvenli ödeme. Kart bilgileriniz bizimle güvende.
                    </p>
                  </div>
                </div>

                {/* Ödeme Butonu */}
                <Button
                  type="submit"
                  className="bg-primary-red hover:bg-primary-red/90 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'İşleniyor...' : `${selectedPlan.price} ₺ Öde`}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Seçilen Plan Özeti */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Seçilen Paket</h2>

              {/* Plan Detayları */}
              <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-primary-red font-semibold">{selectedPlan.name}</h3>
                  <p className="text-muted-foreground text-sm">Aylık Ödeme</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">{selectedPlan.price} ₺</p>
                  <p className="text-muted-foreground text-sm">/{selectedPlan.period}</p>
                </div>
              </div>

              {/* Özellikler */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-white">Paket Özellikleri:</p>
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="text-primary-red h-4 w-4 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
