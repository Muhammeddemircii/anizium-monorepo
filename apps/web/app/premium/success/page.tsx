'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  return (
    <div className="bg-primary-dark flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Başarı İkonu */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="mb-8 flex justify-center"
        >
          <div className="bg-primary-red/10 flex h-24 w-24 items-center justify-center rounded-full">
            <CheckCircle className="text-primary-red h-12 w-12" />
          </div>
        </motion.div>

        {/* Başlık ve Açıklama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="mb-4 text-3xl font-bold text-white">Premium Üyeliğiniz Aktif!</h1>
          <p className="text-muted-foreground mb-8">
            Ödemeniz başarıyla tamamlandı. Artık tüm premium özelliklere erişebilirsiniz.
          </p>

          {/* Özellikler */}
          <div className="mb-8 space-y-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 text-left">
            <h2 className="text-lg font-semibold text-white">Aktif Edilen Özellikler:</h2>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary-red h-4 w-4" />
                4K UHD kalitesinde anime izleme
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary-red h-4 w-4" />
                Reklamsız kesintisiz izleme deneyimi
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary-red h-4 w-4" />
                Özel içeriklere erişim
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary-red h-4 w-4" />4 farklı cihazda eş zamanlı
                izleme
              </li>
            </ul>
          </div>

          {/* Butonlar */}
          <div className="space-y-4">
            <Link href="/home">
              <Button className="bg-primary-red hover:bg-primary-red/90 w-full">
                Anime İzlemeye Başla
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" className="w-full border-gray-800 hover:bg-white/5">
                Üyelik Ayarlarım
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
