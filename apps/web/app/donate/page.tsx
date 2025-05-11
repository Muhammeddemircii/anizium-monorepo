'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Coffee, CreditCard, Shield, Gift, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'

// Bağış paketleri
const donationPackages = [
  {
    id: 1,
    name: 'Küçük Destek',
    amount: 50,
    icon: Coffee,
    description: 'Bize bir kahve ısmarlayın',
    benefits: ['Teşekkür Maili', 'Özel Discord Rolü'],
  },
  {
    id: 2,
    name: 'Orta Destek',
    amount: 100,
    icon: Star,
    description: 'Gelişimimize katkıda bulunun',
    benefits: ['Teşekkür Maili', 'Özel Discord Rolü', 'İsminiz Destekçiler Sayfasında'],
  },
  {
    id: 3,
    name: 'Büyük Destek',
    amount: 250,
    icon: Gift,
    description: 'Büyümemize yardımcı olun',
    benefits: [
      'Teşekkür Maili',
      'Özel Discord Rolü',
      'İsminiz Destekçiler Sayfasında',
      '1 Aylık Premium Üyelik',
    ],
  },
]

export default function DonatePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const { toast } = useToast()

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

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: 'Teşekkürler!',
        description: 'Bağışınız için teşekkür ederiz. Desteğiniz bizim için çok değerli.',
      })

      // Formu temizle
      setSelectedPackage(null)
      setCustomAmount('')
      setMessage('')
      setCardNumber('')
      setExpiryDate('')
      setCvv('')
      setCardHolder('')
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Bağış işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
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
            <Heart className="text-primary-red h-8 w-8" />
            <h1 className="text-3xl font-bold text-white">Bağış Yap</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Anizium'un gelişimine katkıda bulunarak daha iyi bir platform olmamıza yardımcı olun.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Bağış Paketleri */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-white">Destek Paketleri</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {donationPackages.map((pkg) => {
                const Icon = pkg.icon
                return (
                  <motion.button
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedPackage(pkg.id)
                      setCustomAmount('')
                    }}
                    className={`flex flex-col items-center rounded-xl border p-6 text-center transition-colors ${
                      selectedPackage === pkg.id
                        ? 'border-primary-red bg-primary-red/10'
                        : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                    }`}
                  >
                    <Icon
                      className={`mb-4 h-8 w-8 ${
                        selectedPackage === pkg.id ? 'text-primary-red' : 'text-gray-400'
                      }`}
                    />
                    <h3 className="mb-1 font-semibold text-white">{pkg.name}</h3>
                    <p className="mb-4 text-2xl font-bold text-white">{pkg.amount} ₺</p>
                    <p className="text-muted-foreground mb-4 text-sm">{pkg.description}</p>
                    <ul className="text-muted-foreground mt-auto space-y-2 text-sm">
                      {pkg.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center justify-center gap-2">
                          <Star
                            className={`h-3 w-3 ${
                              selectedPackage === pkg.id ? 'text-primary-red' : 'text-gray-400'
                            }`}
                          />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Özel Miktar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Özel Miktar</h3>
            <div className="flex gap-4">
              <Input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedPackage(null)
                }}
                className="bg-gray-800/50"
                placeholder="Miktar girin"
                min="1"
              />
              <span className="flex items-center text-lg font-semibold text-white">₺</span>
            </div>
          </motion.div>

          {/* Mesaj */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Mesajınız (Opsiyonel)</h3>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] bg-gray-800/50"
              placeholder="Eklemek istediğiniz bir mesaj var mı?"
            />
          </motion.div>

          {/* Ödeme Formu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
          >
            <h2 className="mb-6 text-xl font-semibold text-white">Ödeme Bilgileri</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Güvenli Ödeme Notu */}
              <div className="flex items-start gap-3 rounded-lg bg-gray-800/30 p-4">
                <Shield className="text-primary-red mt-0.5 h-5 w-5 flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  256-bit SSL şifreleme ile güvenli ödeme. Kart bilgileriniz bizimle güvende.
                </div>
              </div>

              {/* Bağış Butonu */}
              <Button
                type="submit"
                className="bg-primary-red hover:bg-primary-red/90 w-full"
                disabled={isLoading || (!selectedPackage && !customAmount)}
              >
                {isLoading ? (
                  'İşleniyor...'
                ) : (
                  <>
                    {selectedPackage
                      ? `${
                          donationPackages.find((pkg) => pkg.id === selectedPackage)?.amount
                        } ₺ Bağış Yap`
                      : customAmount
                        ? `${customAmount} ₺ Bağış Yap`
                        : 'Bağış Yap'}
                    <Heart className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
