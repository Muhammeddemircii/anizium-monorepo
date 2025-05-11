'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ChevronDown, LogOut, Settings, Bookmark, Users, Bell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedButton } from '@/components/ui/animated-button'
import { usePathname, useRouter } from 'next/navigation'
import { routes } from '@/config/routes'

// Örnek profiller (gerçek uygulamada API'den gelecek)
const profiles = [
  {
    id: 1,
    name: 'Metehan',
    email: 'metehan@example.com',
    avatar: '/assets/avatars/avatar-1.png',
  },
  {
    id: 2,
    name: 'Ayşe',
    avatar: '/assets/avatars/avatar-2.png',
  },
  {
    id: 3,
    name: 'Çocuk',
    avatar: '/assets/avatars/avatar-kids.png',
    isKids: true,
  },
]

// Aktif kullanıcı
const user = {
  ...profiles[0],
  isLoggedIn: true,
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false)

  // Sayfa değiştiğinde dropdown'ları kapat
  useEffect(() => {
    setShowProfileMenu(false)
    setShowNotifications(false)
    setShowProfileSwitcher(false)
  }, [pathname])

  // ESC tuşuna basıldığında dropdown'ları kapat
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowProfileMenu(false)
        setShowNotifications(false)
        setShowProfileSwitcher(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showProfileMenu || showNotifications || showProfileSwitcher) {
        const target = e.target as HTMLElement
        if (!target.closest('.dropdown-container')) {
          setShowProfileMenu(false)
          setShowNotifications(false)
          setShowProfileSwitcher(false)
        }
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [showProfileMenu, showNotifications, showProfileSwitcher])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/animeler?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Profil değiştirme işlevi
  const handleSwitchProfile = (profile: (typeof profiles)[0]) => {
    // Gerçek uygulamada API çağrısı yapılacak
    console.log('Profil değiştiriliyor:', profile)
    setShowProfileSwitcher(false)
  }

  return (
    <motion.header
      className="bg-background/80 fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href={routes.root.path}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Image
              src="/assets/anizium.png"
              alt="Anizium Logo"
              width={100}
              height={35}
              className="object-contain"
            />
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href={routes.home.path}>
            <motion.span
              className={`relative text-sm font-medium transition-colors ${
                pathname === routes.home.path ? 'text-primary' : 'hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {routes.home.label}
              {pathname === routes.home.path && (
                <motion.div
                  className="bg-primary absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
                  layoutId="underline"
                />
              )}
            </motion.span>
          </Link>
          <Link href={routes.animes.path}>
            <motion.span
              className={`relative text-sm font-medium transition-colors ${
                pathname === routes.animes.path ? 'text-primary' : 'hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {routes.animes.label}
              {pathname === routes.animes.path && (
                <motion.div
                  className="bg-primary absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
                  layoutId="underline"
                />
              )}
            </motion.span>
          </Link>
          <Link href={routes.premium.path}>
            <motion.span
              className={`relative text-sm font-medium transition-colors ${
                pathname === routes.premium.path ? 'text-primary' : 'hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {routes.premium.label}
              {pathname === routes.premium.path && (
                <motion.div
                  className="bg-primary absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
                  layoutId="underline"
                />
              )}
            </motion.span>
          </Link>
        </nav>

        {/* Search */}
        <motion.div
          className="hidden max-w-md flex-1 md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSearch} className="group relative">
            <Search className="text-muted-foreground group-hover:text-primary absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors" />
            <Input
              placeholder="Anime ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus:border-primary border-transparent bg-white/10 pl-9 transition-all focus:bg-white/20"
            />
          </form>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {user.isLoggedIn ? (
            <>
              {/* Bildirimler */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                  {/* Bildirim sayısı */}
                  <span className="bg-primary-red absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-xs font-medium text-white">
                    3
                  </span>
                </button>

                {/* Bildirimler Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-80 rounded-xl border border-white/10 bg-gray-900/95 p-2 backdrop-blur-sm"
                    >
                      <div className="space-y-1">
                        {/* Örnek bildirimler */}
                        {[1, 2, 3].map((notification) => (
                          <button
                            key={notification}
                            className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-white/5"
                          >
                            <div className="bg-primary-red/10 rounded-lg p-2">
                              <Bell className="text-primary-red h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-white">
                                Yeni bölüm eklendi: One Piece Episode 1051
                              </p>
                              <p className="text-xs text-gray-400">2 saat önce</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="mt-2 border-t border-white/10 pt-2">
                        <button className="w-full rounded-lg p-2 text-center text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white">
                          Tüm Bildirimleri Gör
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profil */}
              <div className="dropdown-container relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowProfileMenu(!showProfileMenu)
                    setShowNotifications(false)
                    setShowProfileSwitcher(false)
                  }}
                  className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-white/10"
                >
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      showProfileMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Profil Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-56 rounded-xl border border-white/10 bg-gray-900/95 p-2 backdrop-blur-sm"
                    >
                      {/* Kullanıcı Bilgileri */}
                      <div className="border-b border-white/10 p-3">
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>

                      {/* Profil Değiştirici */}
                      <div className="border-b border-white/10 p-1">
                        <button
                          onClick={() => setShowProfileSwitcher(!showProfileSwitcher)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Profil Değiştir
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              showProfileSwitcher ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Profil Listesi */}
                        <AnimatePresence>
                          {showProfileSwitcher && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-1 space-y-1"
                            >
                              {profiles.map((profile) => (
                                <button
                                  key={profile.id}
                                  onClick={() => handleSwitchProfile(profile)}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                  <Image
                                    src={profile.avatar}
                                    alt={profile.name}
                                    width={24}
                                    height={24}
                                    className="rounded"
                                  />
                                  <span className={profile.isKids ? 'text-primary-red' : undefined}>
                                    {profile.name}
                                  </span>
                                  {profile.id === user.id && (
                                    <span className="text-primary-red ml-auto text-xs">✓</span>
                                  )}
                                </button>
                              ))}
                              <Link
                                href="/profiles"
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                              >
                                <Users className="h-4 w-4" />
                                Profilleri Yönet
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Menü */}
                      <div className="space-y-1 p-1">
                        <Link
                          href="/lists"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <Bookmark className="h-4 w-4" />
                          Listem
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <Settings className="h-4 w-4" />
                          Ayarlar
                        </Link>
                      </div>

                      {/* Çıkış */}
                      <div className="border-t border-white/10 p-1">
                        <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-white/10">
                          <LogOut className="h-4 w-4" />
                          Çıkış Yap
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link href={routes.login.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary-red transition-all hover:bg-white/10"
                >
                  {routes.login.label}
                </Button>
              </Link>
              <Link href={routes.register.path}>
                <AnimatedButton variant="premium" size="sm">
                  {routes.register.label}
                </AnimatedButton>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </motion.header>
  )
}
