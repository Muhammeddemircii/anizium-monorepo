import { Gauge, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PlayerControlsProps } from './interfaces'
import { onDoubleClick } from './utils'

export interface PlaybackSpeedProps extends PlayerControlsProps {
  speed: number
  onSpeedChange: (speed: number) => void
  speeds?: number[]
}

export function PlaybackSpeed({
  speed,
  onSpeedChange,
  buttonClassName,
  iconClassName,
  dropdownMenuContentClassName,
  dropdownMenuItemClassName,
  speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3],
  showLabel,
  labelClassName,
  labelText,
  labelTextClassName,
  checkIconClassName,
  portalContainerId,
  triggerClassName,
  triggerLabelClassName,
  triggerValueClassName,
  textClassName,
}: PlaybackSpeedProps) {
  const container =
    portalContainerId && typeof window !== 'undefined'
      ? document.getElementById(portalContainerId)
      : null

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
        {/* <Button variant="ghost" size="icon" className={cn(buttonClassName)}>
          <Gauge className={iconClassName} />
        </Button> */}
        <div className={cn(triggerClassName)}>
          <span className={cn(triggerLabelClassName)}>{labelText}</span>
          <span className={cn(triggerValueClassName)}>{speed}x</span>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent
        // container={container}
        // side="top"
        // align="end"
        onDoubleClick={onDoubleClick}
        className={cn(dropdownMenuContentClassName)}
      >
        {showLabel && (
          <div className={cn(labelClassName)}>
            <span className={cn(labelTextClassName)}>{labelText}</span>
          </div>
        )}
        {speeds.map((s) => (
          <DropdownMenuItem
            key={s}
            onDoubleClick={onDoubleClick}
            onClick={() => onSpeedChange(s)}
            className={cn(dropdownMenuItemClassName)}
          >
            <span className={cn(textClassName)}>{s}x</span>
            {speed === s && <Check className={cn(checkIconClassName)} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
