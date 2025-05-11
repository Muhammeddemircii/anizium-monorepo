import { Captions, Check } from 'lucide-react'
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
import { Subtitle } from './interfaces'
import { PlayerControlsProps } from './interfaces'
import { onDoubleClick } from './utils'

export interface SubtitleSelectorProps extends PlayerControlsProps {
  subtitles: Subtitle[]
  selectedSubtitle: Subtitle | null
  onSubtitleChange: (srclang: string) => void
  onSubtitleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  noSubtitleLabel?: string
  uploadSubtitleLabel?: string
}

export function SubtitleSelector({
  subtitles,
  selectedSubtitle,
  onSubtitleChange,
  onSubtitleUpload,
  buttonClassName,
  iconClassName,
  dropdownMenuContentClassName,
  dropdownMenuItemClassName,
  showLabel,
  triggerClassName,
  triggerLabelClassName,
  triggerValueClassName,
  labelClassName,
  labelText,
  labelTextClassName,
  checkIconClassName,
  portalContainerId,
  noSubtitleLabel = 'Altyazı Yok',
  uploadSubtitleLabel = 'Altyazı Yükle',
  textClassName,
}: SubtitleSelectorProps) {
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
          <Captions className={iconClassName} />
        </Button> */}
        <div className={cn(triggerClassName)}>
          <span className={cn(triggerLabelClassName)}>{labelText}</span>
          <span className={cn(triggerValueClassName)}>{selectedSubtitle?.label || ''}</span>
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
        <DropdownMenuItem
          onClick={(e) => {
            onClick(e)
            if (selectedSubtitle === null) return
            onSubtitleChange('')
          }}
          onDoubleClick={onDoubleClick}
          className={cn(dropdownMenuItemClassName)}
        >
          <span className={cn(textClassName)}>{noSubtitleLabel}</span>
          {selectedSubtitle === null && <Check className={cn(checkIconClassName)} />}
        </DropdownMenuItem>
        {subtitles.map((subtitle) => (
          <DropdownMenuItem
            key={subtitle.srclang}
            onDoubleClick={onDoubleClick}
            onClick={(e) => {
              onClick(e)
              if (selectedSubtitle?.srclang === subtitle.srclang) return
              onSubtitleChange(subtitle.srclang)
            }}
            className={cn(dropdownMenuItemClassName)}
          >
            <span className={cn(textClassName)}>{subtitle.label}</span>
            {selectedSubtitle?.srclang === subtitle.srclang && (
              <Check className={cn(checkIconClassName)} />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onDoubleClick={onDoubleClick}
          onClick={(e) => {
            onClick(e)
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.vtt,.srt'
            input.onchange = (e) =>
              onSubtitleUpload(e as unknown as React.ChangeEvent<HTMLInputElement>)
            input.click()
          }}
          className={cn(dropdownMenuItemClassName)}
        >
          <span className={cn(textClassName)}>{uploadSubtitleLabel}</span>
          {selectedSubtitle?.srclang === 'custom' && <Check className={cn(checkIconClassName)} />}
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
