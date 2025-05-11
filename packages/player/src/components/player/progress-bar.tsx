import * as React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { onDoubleClick } from './utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('group relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="bg-primary/20 relative h-2 w-full grow overflow-hidden rounded-full transition-all duration-200 group-hover:h-2.5">
      <SliderPrimitive.Range className="bg-primary absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="border-primary/50 bg-background focus-visible:ring-ring block h-5 w-5 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 group-hover:scale-110" />
  </SliderPrimitive.Root>
))

export interface ProgressBarProps {
  currentTime: number
  duration: number
  onTimeChange: (value: number[]) => void
  onProgressHover: (e: React.MouseEvent) => void
  onProgressLeave: () => void
  showPreview?: boolean
  previewPosition?: number
  previewTime?: number
  className?: string
  tooltipTime?: string
  bufferedPercentage?: number
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function ProgressBar({
  currentTime,
  duration,
  onTimeChange,
  onProgressHover,
  onProgressLeave,
  showPreview,
  previewPosition,
  previewTime,
  className,
  tooltipTime,
  bufferedPercentage,
}: ProgressBarProps) {
  const [tooltipPosition, setTooltipPosition] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const position = e.clientX - rect.left
    setTooltipPosition(e.clientX - rect.left)
    setShowTooltip(true)
    onProgressHover(e)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
    onProgressLeave()
  }

  return (
    <div
      className="group relative flex items-center gap-2 px-1 md:px-4"
      onDoubleClick={onDoubleClick}
    >
      <span className="select-none text-sm text-white">
        {!isNaN(currentTime) ? formatTime(currentTime) : '00:00'}
      </span>
      <div
        className="relative flex-1"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Time Preview */}
        {showPreview && (
          <div
            className="pointer-events-none absolute -top-32 -translate-x-1/2 transform overflow-hidden rounded bg-black/90"
            style={{ left: `${previewPosition}px` }}
          >
            {/* Preview Thumbnail */}
            <div className="h-[90px] w-[160px] bg-neutral-800" />
            {/* Preview Time */}
            <div className="w-full py-1 text-center text-sm text-white">
              {formatTime(previewTime || 0)}
            </div>
          </div>
        )}
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={onTimeChange}
          className={cn('relative z-10', className)}
          disabled={duration === 0}
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-full bg-gray-500/20 ">
          <div className="h-full bg-gray-500 rounded-full" style={{ width: `${bufferedPercentage}%` }} />
        </div>
        {showTooltip && tooltipTime && (
          <div
            className="pointer-events-none absolute -top-4 z-50 rounded bg-black/90 px-2 py-1 text-xs text-white"
            style={{
              left: `${tooltipPosition}px`,
              transform: 'translate(-50%, -100%)',
              transition: 'transform 0.1s ease-out',
            }}
          >
            {tooltipTime}
          </div>
        )}
      </div>
      <span className="select-none text-sm text-white">
        {!isNaN(duration) ? formatTime(duration) : '00:00'}
      </span>
    </div>
  )
}
