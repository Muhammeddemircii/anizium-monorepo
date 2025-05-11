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

interface QualitySelectorProps extends PlayerControlsProps {
  sources: Source[]
  selectedSource: Source
  onSourceChange: ({
    source,
    level,
    notify,
  }: {
    source: Source
    level?: number
    notify?: boolean
  }) => void
  levels: Level[]
  selectedLevel?: number
  autoQuality: boolean
  setAutoQuality: (autoQuality: boolean) => void
}

export function QualitySelector({
  sources,
  selectedSource,
  onSourceChange,
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
  levels,
  selectedLevel,
  autoQuality,
  setAutoQuality,
}: QualitySelectorProps) {
  const container =
    portalContainerId && typeof window !== 'undefined'
      ? document.getElementById(portalContainerId)
      : null

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const { items, selectedItem } = useMemo(() => {
    const items: Data[] = []
    let selectedItem: Data | null = null

    if (sources.length > 1) {
      sources.forEach((source) => {
        const isSelected = selectedSource.src === source.src
        const id = source.src
        items.push({
          id,
          label: source.label,
          source: source,
          type: 'source' as const,
          resolution: Number(source.resolution),
          selected: isSelected,
        })
        if (isSelected) selectedItem = items[items.length - 1]
      })
    }

    if (sources.length === 1) {
      const source = sources[0]

      levels.forEach((level) => {
        const isSelected = selectedLevel === level.level
        const id = source.src + '-' + level.level.toString()
        items.push({
          id,
          label: level.label,
          level,
          type: 'level' as const,
          source,
          resolution: Number(level.resolution),
          selected: isSelected,
        })
        if (isSelected) selectedItem = items[items.length - 1]
      })

      if (!selectedItem) {
        selectedItem = items[0]
      }
    }

    return { items: items.sort((a, b) => b.resolution - a.resolution), selectedItem }
  }, [sources, levels, selectedLevel, selectedSource])

  const label = useMemo(() => {
    if (autoQuality) {
      return 'Auto'
    }
    return ResolutionLabels[Number(selectedItem?.resolution)] || selectedItem?.label || ''
  }, [autoQuality, selectedItem])

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
        {/* <Button variant="ghost" size="icon" className={cn(buttonClassName)}>
          <Settings className={iconClassName} />
        </Button> */}
        <div className={cn(triggerClassName)}>
          <span className={cn(triggerLabelClassName)}>{labelText}</span>
          <span className={cn(triggerValueClassName)}>{label}</span>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent
        // container={container}
        // align="end"
        // side="top"
        onDoubleClick={onDoubleClick}
        className={cn(dropdownMenuContentClassName)}
      >
        {showLabel && (
          <div className={cn(labelClassName)}>
            <span className={cn(labelTextClassName)}>{labelText}</span>
          </div>
        )}
        <DropdownMenuItem
          onDoubleClick={onDoubleClick}
          key={'auto'}
          onClick={(e) => {
            onClick(e)
            setAutoQuality(true)
          }}
          className={cn(dropdownMenuItemClassName)}
        >
          <span className={cn(textClassName)}>Auto</span>
          {autoQuality && <Check className={cn(checkIconClassName)} />}
        </DropdownMenuItem>
        {items.map((item) => (
          <DropdownMenuItem
            onDoubleClick={onDoubleClick}
            key={item.id}
            onClick={(e) => {
              onClick(e)
              setAutoQuality(false)
              if (item.type === 'source') {
                onSourceChange({ source: item.source })
              } else {
                onSourceChange({ source: item.source, level: item.level?.level })
              }
            }}
            className={cn(dropdownMenuItemClassName)}
          >
            <span className={cn(textClassName)}>{item.label}</span>
            {item.selected && !autoQuality && <Check className={cn(checkIconClassName)} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
