'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Camera } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

// Örnek avatar seçenekleri
const avatarOptions = [
  '/assets/avatars/avatar-1.png',
  '/assets/avatars/avatar-2.png',
  '/assets/avatars/avatar-3.png',
  '/assets/avatars/avatar-4.png',
  '/assets/avatars/avatar-5.png',
  '/assets/avatars/avatar-kids.png',
]

export default function NewProfilePage() {
  const [name, setName] = useState('')
  const [isKids, setIsKids] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0])

  const handleCreate = () => {
    // Profil oluşturma işlemleri burada yapılacak
    console.log('Profil oluşturuldu:', { name, isKids, avatar: selectedAvatar })
  }

  return (
    <div className="bg-primary-dark flex min-h-screen flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Üst Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center"
        >
          <Link href="/profiles" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-400 hover:text-white" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Yeni Profil Oluştur</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8"
        >
          <div className="grid gap-8 md:grid-cols-[200px,1fr]">
            {/* Avatar Bölümü */}
            <div>
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={selectedAvatar}
                  alt="Profil Avatarı"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>

            {/* Form Bölümü */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-400">
                  Profil Adı
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Profil adını girin"
                  className="bg-gray-800/50"
                  maxLength={20}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">Çocuk Profili</h3>
                  <p className="text-sm text-gray-400">
                    Bu profil sadece çocuklar için uygun içerik gösterecektir.
                  </p>
                </div>
                <Switch
                  checked={isKids}
                  onCheckedChange={setIsKids}
                  className="data-[state=checked]:bg-primary-red"
                />
              </div>
            </div>
          </div>

          {/* Avatar Seçici */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 border-t border-gray-800 pt-8"
          >
            <h3 className="mb-4 text-lg font-medium text-white">Avatar Seç</h3>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {avatarOptions.map((avatar, index) => (
                <motion.button
                  key={avatar}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedAvatar === avatar
                      ? 'border-primary-red'
                      : 'border-transparent hover:border-gray-600'
                  }`}
                >
                  <Image src={avatar} alt={`Avatar ${index + 1}`} fill className="object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Butonlar */}
          <div className="mt-8 flex justify-end space-x-4 border-t border-gray-800 pt-8">
            <Link href="/profiles">
              <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                İptal
              </Button>
            </Link>
            <Button
              onClick={handleCreate}
              disabled={!name.trim()}
              className="bg-primary-red hover:bg-primary-red/90 disabled:opacity-50"
            >
              Profil Oluştur
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
