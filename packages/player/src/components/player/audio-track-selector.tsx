import { Check, AudioLines } from 'lucide-react'
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
import { Source, PlayerControlsProps } from './interfaces'
import { onDoubleClick } from './utils'

export interface AudioTrackSelectorProps extends PlayerControlsProps {
  sources?: Source[]
  selectedSource?: Source
  onChangeAudioOption: (source: Source) => void
}

export function AudioTrackSelector({
  sources,
  selectedSource,
  onChangeAudioOption,
  buttonClassName,
  iconClassName,
  dropdownMenuContentClassName,
  dropdownMenuItemClassName,
  labelClassName,
  labelText,
  labelTextClassName,
  showLabel,
  checkIconClassName,
  portalContainerId,
  triggerClassName,
  triggerLabelClassName,
  triggerValueClassName,
  textClassName,
}: AudioTrackSelectorProps) {
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
          <AudioLines className={iconClassName} />
        </Button> */}
        <div className={cn(triggerClassName)}>
          <span className={cn(triggerLabelClassName)}>{labelText}</span>
          <span className={cn(triggerValueClassName)}>
            {selectedSource?.language || selectedSource?.label || ''}
          </span>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent
        onDoubleClick={onDoubleClick}
        className={cn(dropdownMenuContentClassName)}
      >
        {showLabel && (
          <div className={cn(labelClassName)}>
            <span className={cn(labelTextClassName)}>{labelText}</span>
          </div>
        )}
        {sources?.map((source) => {
          const isSelected =
            selectedSource?.src === source.src ||
            selectedSource?.label === source.label ||
            selectedSource?.language === source.language
          return (
            <DropdownMenuItem
              key={source.src}
              onDoubleClick={onDoubleClick}
              onClick={(e) => {
                onClick(e)
                if (selectedSource?.src === source.src) return
                onChangeAudioOption(source)
              }}
              className={cn(dropdownMenuItemClassName)}
            >
              <span className={cn(textClassName)}>{source.label}</span>
              {isSelected && <Check className={cn(checkIconClassName)} />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
