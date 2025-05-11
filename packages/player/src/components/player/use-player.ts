import { useState } from 'react'
import { AudioOption, Episode, SkipTime, Source, Subtitle, Level } from './interfaces'
import { ResponsePlayerData } from '@/api'
import { ResolutionLabels } from './data'
import { getPlayerSettings } from './use-player-settings'
import { getTrackUrl } from '@/lib/utils'

const convertTimeTextToSeconds = (timeText: string) => {
  const [hours, minutes, seconds] = timeText.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

export const usePlayer = ({ onNextEpisode }: { onNextEpisode: () => void }) => {
  const [source, setSource] = useState<Source>()
  const [levels, setLevels] = useState<Level[]>([])
  const [qualitySources, setQualitySources] = useState<Source[]>([])
  const [audioOptions, setAudioOptions] = useState<AudioOption[]>([])
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])
  const [skipTimes, setSkipTimes] = useState<SkipTime[]>([])
  const [episode, setEpisode] = useState<Episode>()
  const [poster, setPoster] = useState<string>()
  const [subtitle, setSubtitle] = useState<Subtitle | null>(null)
  const [nextEpisode, setNextEpisode] = useState<Episode>()

  const onChangeAudioOption = (audioOption: AudioOption) => {
    if (audioOption.source.src === source?.src) {
      return
    }

    const src = audioOption.source
    setSource(src)
    setQualitySources(audioOption.sources)
  }

  const setData = (episodeId: string, data: ResponsePlayerData) => {
    const episode: Episode = {
      id: episodeId,
      title: '',
      season: 0,
      episode: 0,
    }

    const { isError, success, style, js_version, subtitle, source, banner } =
      data as ResponsePlayerData

    const poster = banner

    const subtitles: Subtitle[] = subtitle.map((subtitle) => ({
      label: subtitle.name,
      srclang: subtitle.short_name,
      src: getTrackUrl(subtitle.link),
    }))

    const audioOptions: AudioOption[] = source.map((source) => {
      const sources: Source[] = source.link.map((link) => ({
        label: ResolutionLabels[link.quality],
        src: link.link,
        type: link.hls ? 'hls' : 'mp4',
        resolution: link.quality.toString(),
        language: source.name,
      }))
      const initialSource: Source = sources.sort(
        (a, b) => Number(b.resolution) - Number(a.resolution)
      )[0]

      return {
        label: source.name,
        source: initialSource,
        sources: sources,
      }
    })

    const settings = getPlayerSettings()

    const {
      source: initialSource,
      qualitySources,
      audioOption: initialAudioOption,
      subtitle: initialSubtitle,
    } = getSources({
      audioOptions,
      subtitles,
      qualityPreference: settings.lastQualityPreference,
      audioPreference: settings.lastAudioPreference,
      subtitleLanguage: settings.lastSubtitleLanguage,
    })

    const skipTimes: SkipTime[] = getSkipTimes(data)

    setSource(initialSource)
    setQualitySources(qualitySources)
    setAudioOptions(audioOptions)
    setSubtitles(subtitles)
    setSkipTimes(skipTimes)
    setPoster(poster)
    setEpisode(episode)
    setSubtitle(initialSubtitle)
  }

  const getSources = ({
    audioOptions,
    subtitles,
    qualityPreference,
    audioPreference,
    subtitleLanguage,
  }: {
    audioOptions: AudioOption[]
    subtitles: Subtitle[]
    qualityPreference: string
    audioPreference: string
    subtitleLanguage: string
  }): {
    source: Source
    qualitySources: Source[]
    audioOption: AudioOption
    subtitle: Subtitle | null
  } => {
    const audioOption =
      audioOptions.find((option) => option.label === audioPreference) || audioOptions[0]

    const qualitySources = audioOption.sources
    const source =
      qualitySources.find((source) => source.label === qualityPreference) || qualitySources[0]
    const subtitle =
      subtitles.find((subtitle) => subtitle.srclang === subtitleLanguage) || subtitles?.[0] || null

    return {
      source,
      qualitySources,
      audioOption,
      subtitle,
    }
  }

  const handleSubtitleChange = (subtitle: Subtitle | null) => {
    setSubtitle(subtitle)
  }

  const getSkipTimes = (data: ResponsePlayerData) => {
    const { next_episode_id, next_episode, opening } = data
    const skipTimes: SkipTime[] = []

    if (next_episode_id) {
      setNextEpisode({
        id: next_episode_id,
        title: 'Sonraki Bölüm',
      })
    }

    if (next_episode_id && next_episode) {
      skipTimes.push({
        id: next_episode_id,
        label: 'Sonraki Bölüm',
        notificationLabel: 'Sonraki bölüme',
        start: convertTimeTextToSeconds(next_episode),
        end: convertTimeTextToSeconds(next_episode) + 10,
        onClick: onNextEpisode,
      })
    }

    if (opening && opening.start && opening.end) {
      skipTimes.push({
        id: 'opening',
        label: 'İntroyu Atla',
        notificationLabel: 'İntro',
        start: convertTimeTextToSeconds(opening.start),
        end: convertTimeTextToSeconds(opening.end),
      })
    }

    return skipTimes
  }

  return {
    source,
    setSource,
    audioOptions,
    subtitles,
    skipTimes,
    qualitySources,
    onChangeAudioOption,
    setSubtitles,
    setSkipTimes,
    setQualitySources,
    setAudioOptions,
    isReady: source !== null,
    setData,
    poster,
    episode,
    levels,
    setLevels,
    getSources,
    subtitle,
    handleSubtitleChange,
    nextEpisode,
  }
}
