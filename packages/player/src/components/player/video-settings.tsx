import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PlayerControlsProps } from './interfaces'
import { onDoubleClick } from './utils'
import { useEffect, useRef, useState } from 'react'

export interface VideoSettingsProps extends PlayerControlsProps {
  menuItems: React.ReactNode
  brightnessLabel?: string
  opacityLabel?: string
}

export function VideoSettings({
  buttonClassName,
  iconClassName,
  dropdownMenuContentClassName,
  labelClassName,
  labelTextClassName,
  showLabel = false,
  labelText = 'Video Ayarları',
  portalContainerId,
  menuItems,
}: VideoSettingsProps) {
  const container =
    portalContainerId && typeof window !== 'undefined'
      ? document.getElementById(portalContainerId)
      : null

  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 1200)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(buttonClassName)}>
          <Settings className={iconClassName} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onDoubleClick={onDoubleClick}
        container={container}
        side="top"
        align="end"
        className={cn('', dropdownMenuContentClassName)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showLabel && (
          <div className={cn(labelClassName)}>
            <span className={cn(labelTextClassName)}>{labelText}</span>
          </div>
        )}
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
