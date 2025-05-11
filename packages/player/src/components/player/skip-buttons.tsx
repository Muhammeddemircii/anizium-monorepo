import { SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SkipTime } from './interfaces'
import { PlayerControlsProps } from './interfaces'
import { useEffect, useState } from 'react'
import { onDoubleClick } from './utils'
export interface SkipButtonsProps extends PlayerControlsProps {
  skipTimes: SkipTime[]
  onSkip: (skipTime: SkipTime) => void
  currentTime: number
}

export function SkipButtons({ iconClassName, skipTimes, onSkip, currentTime }: SkipButtonsProps) {
  const [activeSkipTimes, setActiveSkipTimes] = useState<SkipTime[]>([])

  useEffect(() => {
    const checkSkipButtons = () => {
      const activeButtons = skipTimes
        .filter((skip) => currentTime >= skip.start && currentTime < skip.end)
        .map((skip) => skip)

      setActiveSkipTimes(activeButtons)
    }

    checkSkipButtons()
  }, [currentTime, skipTimes])

  const handleSkip = (skip: SkipTime) => {
    setActiveSkipTimes((prev) => prev.filter(({ id }) => id !== skip.id))
    onSkip(skip)
  }
  return (
    <div className="absolute bottom-24 right-4 z-50 m-4 flex flex-col gap-2">
      {activeSkipTimes.map((skipTime) => {
        return (
          <Button
            key={skipTime.id}
            onDoubleClick={onDoubleClick}
            onClick={(e) => {
              e.stopPropagation()
              if (skipTime.onClick) {
                skipTime.onClick()
              } else {
                handleSkip(skipTime)
              }
            }}
            className={cn(
              'h-10 px-6 font-medium',
              'bg-white/20 text-white hover:bg-white/30',
              'rounded-md backdrop-blur-sm',
              'transition-all duration-200 ease-in-out',
              'flex items-center gap-2',
              skipTime.id === 'outro' && 'pr-4'
            )}
          >
            {skipTime.label}
            {skipTime.id === 'outro' && <SkipForward className={iconClassName} />}
          </Button>
        )
      })}
    </div>
  )
}
