import { Maximize, Minimize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PlayerControlsProps } from './interfaces'

export interface FullscreenToggleProps extends PlayerControlsProps {
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

export function FullscreenToggle({
  isFullscreen,
  onToggleFullscreen,
  buttonClassName,
  iconClassName,
}: FullscreenToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleFullscreen}
      className={cn(buttonClassName)}
    >
      {isFullscreen ? (
        <Minimize className={iconClassName} />
      ) : (
        <Maximize className={iconClassName} />
      )}
    </Button>
  )
}
