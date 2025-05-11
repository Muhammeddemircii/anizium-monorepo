import { Wand2, Check } from 'lucide-react'
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
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu'
import { Filter, PlayerControlsProps } from './interfaces'
import { Slider } from '../ui/slider'
import { onDoubleClick } from './utils'
export interface VideoFiltersProps extends PlayerControlsProps {
  filters: Filter[]
  activeFilter: string
  onFilterChange: (filter: Filter | null) => void
  noFilterLabel?: string
  brightness: number
  opacity: number
  onBrightnessChange: (value: number) => void
  onOpacityChange: (value: number) => void
  brightnessLabel?: string
  opacityLabel?: string
}

export function VideoFilters({
  filters,
  activeFilter,
  onFilterChange,
  buttonClassName,
  iconClassName,
  dropdownMenuContentClassName,
  dropdownMenuItemClassName,
  showLabel,
  labelClassName,
  labelText,
  labelTextClassName,
  checkIconClassName,
  portalContainerId,
  noFilterLabel = 'Filtre Yok',
  triggerClassName,
  triggerLabelClassName,
  triggerValueClassName,
  brightnessLabel = 'Parlaklık',
  opacityLabel = 'Opaklık',
  brightness,
  opacity,
  onBrightnessChange,
  onOpacityChange,
  textClassName,
  valueClassName,
}: VideoFiltersProps) {
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
      <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
        {/* <Button variant="ghost" size="icon" className={cn(buttonClassName)}>
          <Wand2 className={iconClassName} />
        </Button> */}
        <div className={cn(triggerClassName)}>
          <span className={cn(triggerLabelClassName)}>{labelText}</span>
          <span className={cn(triggerValueClassName)}>{activeFilter}</span>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent
        // container={container}
        // side="top"
        // align="end"
        onDoubleClick={onDoubleClick}
        className={cn(dropdownMenuContentClassName)}
        onClick={(e) => e.stopPropagation()}
      >
        {showLabel && (
          <div className={cn(labelClassName)}>
            <span className={cn(labelTextClassName)}>{labelText}</span>
          </div>
        )}
        <div className={cn(dropdownMenuItemClassName, 'flex flex-col gap-2')}>
          <div className="flex w-full items-center justify-between">
            <span className={cn(textClassName)}>{brightnessLabel}</span>
            <span className={cn(valueClassName)}>{brightness}%</span>
          </div>
          <Slider
            value={[brightness]}
            onValueChange={(value) => {
              onBrightnessChange(value[0])
            }}
            max={200}
            min={0}
            step={1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </div>
        <div className={cn(dropdownMenuItemClassName, 'flex flex-col gap-2')}>
          <div className="flex w-full items-center justify-between">
            <span className={cn(textClassName)}>{opacityLabel}</span>
            <span className={cn(valueClassName)}>{opacity}%</span>
          </div>
          <Slider
            value={[opacity]}
            onValueChange={(value) => {
              onOpacityChange(value[0])
            }}
            max={100}
            min={0}
            step={1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </div>
        <DropdownMenuItem
          onClick={(e) => {
            onClick(e)
            if (!activeFilter) return
            onFilterChange(null)
          }}
          className={cn(dropdownMenuItemClassName)}
        >
          <span className={cn(textClassName)}>{noFilterLabel}</span>
          {!activeFilter && <Check className={cn(checkIconClassName)} />}
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator className="bg-neutral-700" /> */}
        {Array.from(new Set(filters.map((f) => f.category))).map((category) => (
          <DropdownMenuSub key={category}>
            <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
              {category}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className={cn(dropdownMenuContentClassName)}>
              {filters
                .filter((f) => f.category === category)
                .map((filter) => (
                  <DropdownMenuItem
                    key={filter.name}
                    onClick={(e) => {
                      onClick(e)
                      if (activeFilter === filter.name) return
                      onFilterChange(filter)
                    }}
                    className={cn(dropdownMenuItemClassName)}
                  >
                    <span className={cn(textClassName)}>{filter.name}</span>
                    {activeFilter === filter.name && <Check className={cn(checkIconClassName)} />}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
