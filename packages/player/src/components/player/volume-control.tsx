import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PlayerControlsProps } from './interfaces'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { onDoubleClick } from './utils'
export interface VolumeControlProps extends PlayerControlsProps {
  volume: number
  isMuted: boolean
  onVolumeChange: (value: number) => void
  onToggleMute: () => void
}

export function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  buttonClassName,
  iconClassName,
}: VolumeControlProps) {
  return (
    <div className="relative flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <Button
        onDoubleClick={onDoubleClick}
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onToggleMute()
        }}
        className={cn('', buttonClassName)}
      >
        {isMuted || volume === 0 ? (
          <VolumeX className={iconClassName} />
        ) : (
          <Volume2 className={iconClassName} />
        )}
      </Button>
      <SliderPrimitive.Root
        onDoubleClick={onDoubleClick}
        className={cn('relative flex w-8 touch-none select-none items-center sm:w-12 md:w-16 lg:w-20')}
        defaultValue={[100]}
        value={[isMuted ? 0 : volume * 100]}
        onValueChange={(value) => {
          onVolumeChange(value[0])
        }}
        max={100}
        step={1}
      >
        <SliderPrimitive.Track className="bg-primary/20 relative h-2 w-full grow overflow-hidden rounded-full">
          <SliderPrimitive.Range className="bg-primary absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="border-primary/50 bg-background focus-visible:ring-ring block h-5 w-5 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  )
}
