'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

// Örnek profil verileri
const profiles = [
  {
    id: 1,
    name: 'Metehan',
    avatar: '/assets/avatars/avatar-1.png',
    isKids: false,
  },
  {
    id: 2,
    name: 'Ayşe',
    avatar: '/assets/avatars/avatar-2.png',
    isKids: false,
  },
  {
    id: 3,
    name: 'Çocuk',
    avatar: '/assets/avatars/avatar-kids.png',
    isKids: true,
  },
]

export default function ProfilesPage() {
  const [isEditing, setIsEditing] = useState(false)

  // Profil kartı animasyon varyantları
  const profileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="bg-primary-dark flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center text-4xl font-bold text-white"
        >
          {isEditing ? 'Profili Düzenle' : 'Kim İzliyor?'}
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              custom={index}
              variants={profileVariants}
              whileHover="hover"
              className="group flex flex-col items-center"
            >
              <Link
                href={isEditing ? `/profiles/edit/${profile.id}` : '/home'}
                className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="group-hover:ring-primary-red object-cover transition-all duration-300 group-hover:ring-2"
                  sizes="(max-width: 768px) 25vw, 20vw"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Pencil className="h-8 w-8 text-white" />
                  </div>
                )}
              </Link>
              <motion.span
                className={`text-lg ${
                  profile.isKids ? 'text-primary-red' : 'text-gray-300'
                } group-hover:text-white`}
              >
                {profile.name}
              </motion.span>
            </motion.div>
          ))}

          {/* Yeni Profil Ekle */}
          {profiles.length < 5 && (
            <motion.div
              custom={profiles.length}
              variants={profileVariants}
              whileHover="hover"
              className="group flex flex-col items-center"
            >
              <Link
                href="/profiles/new"
                className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-600 transition-colors duration-300 hover:border-gray-400"
              >
                <Plus className="h-12 w-12 text-gray-600 transition-colors duration-300 group-hover:text-gray-400" />
              </Link>
              <span className="text-lg text-gray-600 transition-colors duration-300 group-hover:text-gray-400">
                Profil Ekle
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Düzenle Butonu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsEditing(!isEditing)}
            className="border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white"
          >
            {isEditing ? 'Bitti' : 'Profilleri Yönet'}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
