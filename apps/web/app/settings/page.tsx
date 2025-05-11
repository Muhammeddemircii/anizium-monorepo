'use client'

import { motion } from 'framer-motion'
import { Settings, Lock, CreditCard, Bell, User, LogOut } from 'lucide-react'
import Link from 'next/link'

const menuItems = [
  {
    icon: User,
    title: 'Profil Ayarları',
    description: 'Profil bilgilerinizi düzenleyin',
    href: '/settings/profile',
  },
  {
    icon: Lock,
    title: 'Şifre Değiştir',
    description: 'Hesap şifrenizi güncelleyin',
    href: '/settings/change-password',
  },
  {
    icon: CreditCard,
    title: 'Ödeme Yöntemi',
    description: 'Ödeme bilgilerinizi yönetin',
    href: '/settings/payment',
  },
  {
    icon: Bell,
    title: 'Bildirim Ayarları',
    description: 'Bildirim tercihlerinizi düzenleyin',
    href: '/settings/notifications',
  },
]

export default function SettingsPage() {
  return (
    <div className="bg-primary-dark min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Üst Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4">
            <Settings className="text-primary-red h-8 w-8" />
            <h1 className="text-3xl font-bold text-white">Ayarlar</h1>
          </div>
        </motion.div>

        {/* Menü Öğeleri */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid gap-4 md:grid-cols-2"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className="flex items-start gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-colors hover:border-gray-700"
                >
                  <div className="rounded-lg bg-gray-800/50 p-3">
                    <Icon className="text-primary-red h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Çıkış Yap Butonu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <button className="flex w-full items-center gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 text-left transition-colors hover:border-gray-700">
            <div className="rounded-lg bg-gray-800/50 p-3">
              <LogOut className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-500">Çıkış Yap</h2>
              <p className="text-sm text-gray-400">Hesabınızdan güvenli çıkış yapın</p>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
