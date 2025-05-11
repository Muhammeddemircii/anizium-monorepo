import { useEffect, useState } from 'react'
import { PlayerSettings } from './interfaces'
import { defaultSubtitleStyle } from './data'

export const defaultPlayerSettings: PlayerSettings = {
  volume: 1,
  isMuted: false,
  playbackSpeed: 1,
  subtitleStyle: defaultSubtitleStyle,
  brightness: 100,
  opacity: 100,
  activeFilter: '',
  currentFilterValues: null,
  autoQuality: false,
}

export const getPlayerSettings = (): PlayerSettings => {
  if (typeof window === 'undefined') return defaultPlayerSettings

  const savedSettings = localStorage.getItem('player-settings')
  if (savedSettings) {
    return JSON.parse(savedSettings)
  }
  return defaultPlayerSettings
}

export const usePlayerSettings = () => {
  const settings = getPlayerSettings()
  const [volume, setVolume] = useState(settings.volume)
  const [isMuted, setIsMuted] = useState(settings.isMuted)
  const [playbackSpeed, setPlaybackSpeed] = useState(settings.playbackSpeed)
  const [subtitleStyle, setSubtitleStyle] = useState(settings.subtitleStyle)
  const [brightness, setBrightness] = useState(settings.brightness)
  const [opacity, setOpacity] = useState(defaultPlayerSettings.opacity)
  const [activeFilter, setActiveFilter] = useState(defaultPlayerSettings.activeFilter)
  const [currentFilterValues, setCurrentFilterValues] = useState(
    defaultPlayerSettings.currentFilterValues
  )
  const [lastQualityPreference, setLastQualityPreference] = useState(
    defaultPlayerSettings.lastQualityPreference
  )
  const [lastAudioPreference, setLastAudioPreference] = useState(
    defaultPlayerSettings.lastAudioPreference
  )
  const [lastSubtitleLanguage, setLastSubtitleLanguage] = useState(
    defaultPlayerSettings.lastSubtitleLanguage
  )
  const [autoQuality, setAutoQuality] = useState(defaultPlayerSettings.autoQuality)
  const [isLoaded, setIsLoaded] = useState(false)

  const loadPlayerSettings = () => {
    const playerSettings = getPlayerSettings()
    setPlayerSettings(playerSettings)
  }

  useEffect(() => {
    loadPlayerSettings()
    setTimeout(() => {
      setIsLoaded(true)
    }, 200)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      savePlayerSettings()
    }
  }, [
    volume,
    isMuted,
    playbackSpeed,
    subtitleStyle,
    brightness,
    opacity,
    activeFilter,
    currentFilterValues,
    lastQualityPreference,
    lastAudioPreference,
    lastSubtitleLanguage,
    autoQuality,
  ])

  const setPlayerSettings = (settings: Partial<PlayerSettings>) => {
    if (settings.volume) setVolume(settings.volume)
    if (typeof settings.isMuted === 'boolean') setIsMuted(settings.isMuted)
    if (settings.playbackSpeed) setPlaybackSpeed(settings.playbackSpeed)
    if (settings.subtitleStyle) setSubtitleStyle(settings.subtitleStyle)
    if (settings.brightness) setBrightness(settings.brightness)
    if (settings.opacity) setOpacity(settings.opacity)
    if (typeof settings.activeFilter === 'string') setActiveFilter(settings.activeFilter)
    if (typeof settings.currentFilterValues === 'object')
      setCurrentFilterValues(settings.currentFilterValues)
    if (settings.lastQualityPreference) setLastQualityPreference(settings.lastQualityPreference)
    if (settings.lastAudioPreference) setLastAudioPreference(settings.lastAudioPreference)
    if (typeof settings.autoQuality === 'boolean') setAutoQuality(settings.autoQuality)
    if (settings.lastSubtitleLanguage) setLastSubtitleLanguage(settings.lastSubtitleLanguage)
  }

  const _getPlayerSettings = (): PlayerSettings => {
    return {
      volume,
      isMuted,
      playbackSpeed,
      subtitleStyle,
      brightness,
      opacity,
      activeFilter,
      currentFilterValues,
      lastQualityPreference,
      lastAudioPreference,
      lastSubtitleLanguage,
      autoQuality,
    }
  }

  const savePlayerSettings = () => {
    localStorage.setItem('player-settings', JSON.stringify(_getPlayerSettings()))
  }

  const resetPlayerSettings = () => {
    setPlayerSettings({ ...defaultPlayerSettings })
    setOpacity(defaultPlayerSettings.opacity)
  }

  return {
    setPlayerSettings,
    savePlayerSettings,
    volume,
    isMuted,
    playbackSpeed,
    subtitleStyle,
    brightness,
    opacity,
    activeFilter,
    currentFilterValues,
    lastQualityPreference,
    lastAudioPreference,
    lastSubtitleLanguage,
    setVolume,
    setIsMuted,
    setPlaybackSpeed,
    setSubtitleStyle,
    setBrightness,
    setOpacity,
    setActiveFilter,
    setCurrentFilterValues,
    setLastQualityPreference,
    setLastAudioPreference,
    setLastSubtitleLanguage,
    resetPlayerSettings,
    autoQuality,
    setAutoQuality,
  }
}
