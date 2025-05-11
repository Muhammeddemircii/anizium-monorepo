import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PlayerControlsProps } from './interfaces'
import { RiForward5Line, RiReplay5Line } from 'react-icons/ri'
import { onDoubleClick } from './utils'
export interface SeekButtonsProps extends PlayerControlsProps {
  onSeekBackward: () => void
  onSeekForward: () => void
}

export function SeekButtons({
  onSeekBackward,
  onSeekForward,
  buttonClassName,
  iconClassName,
}: SeekButtonsProps) {
  
  return (
    <div className={cn('flex items-center gap-2')}>
      <Button
        onDoubleClick={onDoubleClick}
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onSeekBackward()
        }}
        className={cn(buttonClassName)}
      >
        <RiReplay5Line className={cn(iconClassName, 'w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8')} />
      </Button>
      <Button
        onDoubleClick={onDoubleClick}
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onSeekForward()
        }}
        className={cn(buttonClassName)}
      >
        <RiForward5Line className={cn(iconClassName, 'w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8')} />
      </Button>
    </div>
  )
}
