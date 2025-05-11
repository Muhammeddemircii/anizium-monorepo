import { SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PlayerControlsProps } from './interfaces'
import { onDoubleClick } from './utils'
export interface NextEpisodeButtonProps extends PlayerControlsProps {
  onNextEpisode: () => void
}

export function NextEpisodeButton({
  onNextEpisode,
  buttonClassName,
  iconClassName,
}: NextEpisodeButtonProps) {
  return (
    <Button
      onDoubleClick={onDoubleClick}
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation()
        onNextEpisode()
      }}
      className={cn(buttonClassName)}
    >
      <SkipForward className={iconClassName} />
    </Button>
  )
}
