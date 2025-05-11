import { cn } from '@/lib/utils'

export interface NotificationProps {
  text: string
  visible: boolean
  type?: 'default' | 'warning'
  className?: string
}

export function Notification({ text, visible, type = 'default', className }: NotificationProps) {
  if (!visible) return null

  return (
    <div
      className={cn(
        'absolute top-8 z-[999] flex h-12 w-full items-center justify-center px-4 transition-all duration-200',
        className
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-sm rounded-lg border border-white/10 bg-neutral-900/60 px-2 py-2 text-center text-sm text-white shadow-lg backdrop-blur-md md:px-4 md:py-2 lg:max-w-lg',
          type === 'default' && 'border-white/20 bg-neutral-800/70',
          type === 'warning' && 'border-red-500/30 bg-red-500/20 text-red-200'
        )}
      >
        {text}
      </div>
    </div>
  )
}
