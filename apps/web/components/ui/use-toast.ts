// Basit bir toast hook'u
import { useState } from 'react'

interface ToastOptions {
  title: string
  description: string
  variant?: 'default' | 'destructive'
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([])

  const toast = (options: ToastOptions) => {
    const id = Math.random().toString()
    setToasts((prev) => [...prev, options])

    // Otomatik kaldırma
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== options))
    }, options.duration || 3000)
  }

  return { toast, toasts }
}
