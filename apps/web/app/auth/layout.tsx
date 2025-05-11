'use client'

import { AuthBackground } from '@/components/auth/auth-background'
import { motion } from 'framer-motion'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[85vh] overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="from-primary-red/30 pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] via-transparent to-transparent" />

      {/* Auth Background */}
      {/* <AuthBackground /> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-8 md:px-12 lg:px-24"
      >
        {/* <div className="min-h-[70%] overflow-hidden rounded-2xl border-white/10 bg-black/30 shadow-[0_0_10px_rgba(247,33,28,0.05)] backdrop-blur-xl"> */}
        <div className="p-4 sm:px-6 md:px-8">{children}</div>
        {/* </div> */}
      </motion.div>
    </div>
  )
}
