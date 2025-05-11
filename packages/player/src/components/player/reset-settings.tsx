import { Settings, Check } from 'lucide-react'
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
import { Source, Level, PlayerControlsProps } from './interfaces'
import { ResolutionLabels } from './data'
import { onDoubleClick } from './utils'
import { useMemo } from 'react'

interface Data {
  id: string
  label: string
  source?: Source
  level?: Level
  type: 'source' | 'level'
  selected: boolean
  resolution: number
}

interface ResetSettingsProps extends PlayerControlsProps {
  onReset: () => void
}

export function ResetSettings({
  buttonClassName,
  iconClassName,
  dropdownMenuContentClassName,
  dropdownMenuItemClassName,
  labelClassName,
  labelText,
  labelTextClassName,
  checkIconClassName,
  showLabel,
  portalContainerId,
  triggerClassName,
  triggerLabelClassName,
  triggerValueClassName,
  textClassName,
  onReset,
}: ResetSettingsProps) {
  const container =
    portalContainerId && typeof window !== 'undefined'
      ? document.getElementById(portalContainerId)
      : null

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }
  return (
    <DropdownMenuSub>
      <DropdownMenuItem
        className={cn(dropdownMenuItemClassName)}
        onDoubleClick={onDoubleClick}
        key={'auto'}
        onClick={(e) => {
          onClick(e)
          onReset()
        }}
      >
        <div className={cn(triggerClassName)}>
          <span className={cn(triggerLabelClassName)}>Ayarları Sıfırla</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuSub>
  )
}
