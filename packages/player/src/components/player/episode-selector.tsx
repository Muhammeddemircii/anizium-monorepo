import { List, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PlayerControlsProps, Episode } from './interfaces'
import { onDoubleClick } from './utils'

export interface EpisodeSelectorProps extends PlayerControlsProps {
  episodes: Episode[]
  currentEpisode?: Episode
  onEpisodeSelect: (episode: Episode) => void
  episodeLabel?: string
}

export function EpisodeSelector({
  episodes,
  currentEpisode,
  onEpisodeSelect,
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
  episodeLabel = 'Bölüm',
}: EpisodeSelectorProps) {
  const container =
    portalContainerId && typeof window !== 'undefined'
      ? document.getElementById(portalContainerId)
      : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(buttonClassName)}>
          <List className={iconClassName} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        container={container}
        align="end"
        side="top"
        className={cn(dropdownMenuContentClassName)}
      >
        {showLabel && (
          <div className={cn(labelClassName)}>
            <span className={cn(labelTextClassName)}>{labelText}</span>
          </div>
        )}
        {episodes.map((episode) => (
          <DropdownMenuItem
            key={episode.id}
            onClick={() => onEpisodeSelect(episode)}
            className={cn(dropdownMenuItemClassName)}
            onDoubleClick={onDoubleClick}
          >
            <span>
              {episodeLabel} {episode.episode}
            </span>
            {currentEpisode?.id === episode.id && <Check className={cn(checkIconClassName)} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
