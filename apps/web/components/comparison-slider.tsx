import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ComparisonSliderProps {
  leftImage: string
  rightImage: string
  leftLabel?: string
  rightLabel?: string
  aspectRatio?: number
  className?: string
}

export function ComparisonSlider({
  leftImage,
  rightImage,
  leftLabel = 'Diğer Platformlar (1080p)',
  rightLabel = 'Anizium (4K UHD)',
  aspectRatio = 16 / 9,
  className,
}: ComparisonSliderProps) {
  const [position, setPosition] = React.useState(50)
  const [isDragging, setIsDragging] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = 'touches' in event ? event.touches[0].clientX : event.clientX
    const position = ((x - rect.left) / rect.width) * 100

    setPosition(Math.min(Math.max(position, 0), 100))
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = event.touches[0].clientX
    const position = ((x - rect.left) / rect.width) * 100

    setPosition(Math.min(Math.max(position, 0), 100))
  }

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const handleMouseUp = () => setIsDragging(false)
    const handleTouchEnd = () => setIsDragging(false)

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('group relative select-none', className)}
      style={{ aspectRatio }}
      onMouseMove={handleMove}
      onTouchMove={(e) => handleMove(e)}
    >
      {/* Left Image (1080p) */}
      <div className="absolute inset-0 overflow-hidden">
        <Image src={leftImage} alt="1080p" className="h-full w-full object-cover" fill priority />
        <div className="absolute right-4 top-4 rounded-lg bg-black/90 px-4 py-2 text-sm font-medium">
          {leftLabel}
        </div>
      </div>

      {/* Right Image (4K) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={rightImage} alt="4K" className="h-full w-full object-cover" fill priority />
        <div className="absolute left-4 top-4 rounded-lg bg-black/90 px-4 py-2 text-sm font-medium text-primary">
          {rightLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute bottom-0 top-0 w-1 cursor-ew-resize bg-white"
        style={{ left: `${position}%` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
