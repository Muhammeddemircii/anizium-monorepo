import { Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PlayerControlsProps } from './interfaces'
import { onDoubleClick } from './utils'

export interface PlayPauseButtonProps extends PlayerControlsProps {
  isPlaying: boolean
  onToggle: () => void
}

export function PlayPauseButton({
  isPlaying,
  onToggle,
  buttonClassName,
  iconClassName,
}: PlayPauseButtonProps) {
  return (
    <Button
      onDoubleClick={onDoubleClick}
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      className={cn(buttonClassName)}
    >
      {isPlaying ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </Button>
  )
}
