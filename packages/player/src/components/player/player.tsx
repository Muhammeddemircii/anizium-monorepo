'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VideoFilters, VideoFiltersProps } from './video-filters'
import { EpisodeSelector, EpisodeSelectorProps } from './episode-selector'
import { PlaybackSpeed, PlaybackSpeedProps } from './playback-speed'
import { Notification, NotificationProps } from './notification'
import { ProgressBar, ProgressBarProps } from './progress-bar'
import { SubtitleSelector, SubtitleSelectorProps } from './subtitle-selector'
import { FullscreenToggle, FullscreenToggleProps } from './fullscreen-toggle'
import { PlayPauseButton, PlayPauseButtonProps } from './play-pause-button'
import { SeekButtons, SeekButtonsProps } from './seek-buttons'
import { VolumeControl, VolumeControlProps } from './volume-control'
import { SubtitleStyleMenu, SubtitleStyleMenuProps } from './subtitle-style-menu'
import { PlayerReport, PlayerReportProps } from './player-report'
import { AudioTrackSelector, AudioTrackSelectorProps } from './audio-track-selector'
import { NextEpisodeButton, NextEpisodeButtonProps } from './next-episode-button'
import {
  Subtitle,
  SubtitleStyle,
  SkipTime,
  Filter,
  PlayerControlsProps,
  Episode,
  Source,
  AudioOption,
  PlayerSettings,
  Level,
} from './interfaces'
import { defaultSubtitleStyle, ResolutionLabels, filters as videoFilters } from './data'
import Hls, { ErrorData, HlsConfig, ManifestParsedData } from 'hls.js'
import { VideoSettings, VideoSettingsProps } from './video-settings'
import { SkipButtons, SkipButtonsProps } from './skip-buttons'
import { QualitySelector } from './quality-selector'
import { ContextMenu } from './context-menu'
import { useVideoDimensions } from './use-video-dimensions'
import { CustomSubtitleRenderer } from './custom-subtitle-renderer'
import { defaultPlayerSettings, usePlayerSettings } from './use-player-settings'
import _ from 'lodash'
import { ResetSettings } from './reset-settings'
import o9n from 'o9n'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const isMobile = () => {
  if (typeof window === 'undefined') return false
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

const isIos = () => {
  if (typeof window === 'undefined') return false
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

const isSafari = () => {
  if (typeof window === 'undefined') return false
  return (
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
    // @ts-ignore
    /constructor/i.test(window?.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]'
    })(
      !window['safari'] || (typeof global?.safari !== 'undefined' && global.safari.pushNotification)
    )
  )
}

const defaultFilter = `
  brightness(100%)
  contrast(100%)
  saturate(100%)
  sepia(0%)
  hue-rotate(0deg)
  blur(0px)
`
const controlsTimeout = 3500

const seekTime = 5
interface PlayerProps {
  isReady?: boolean
  source: Source | undefined
  onChangeSource: (source: Source) => void
  poster?: string
  autoPlay?: boolean
  onEnded?: () => void
  onTimeUpdate?: (time: number) => void
  onDurationChange?: (duration: number) => void
  startTime?: number
  qualitySources: Source[]
  onChangeQualitySources: (sources: Source[]) => void
  audioOptions: AudioOption[]
  subtitles?: Subtitle[]
  skipTimes?: SkipTime[]
  videoId: string
  nextEpisode?: Episode
  onNextEpisode?: () => void
  episodes?: Episode[]
  currentEpisode?: Episode
  onEpisodeSelect?: (episode: Episode) => void
  iconClassName?: string
  buttonClassName?: string
  filters?: Filter[]
  onBack?: () => void
  subtitleStyle?: SubtitleStyle
  initialSubtitleStyle?: SubtitleStyle
  showBackButton?: boolean
  showEpisodeLabel?: boolean
  showNextEpisodeButton?: boolean
  showReportButton?: boolean
  options?: {
    audioTrackSelectorProps?: AudioTrackSelectorProps
    videoSettingsProps?: VideoSettingsProps
    subtitleStyleMenuProps?: SubtitleStyleMenuProps
    subtitleSelectorProps?: SubtitleSelectorProps
    playbackSpeedProps?: PlaybackSpeedProps
    seekButtonsProps?: SeekButtonsProps
    volumeControlProps?: VolumeControlProps
    fullscreenToggleProps?: FullscreenToggleProps
    playPauseButtonProps?: PlayPauseButtonProps
    skipButtonsProps?: SkipButtonsProps
    progressBarProps?: ProgressBarProps
    notificationProps?: NotificationProps
    nextEpisodeButtonProps?: NextEpisodeButtonProps
    episodeSelectorProps?: EpisodeSelectorProps
    playerReportProps?: PlayerReportProps
    videoFiltersProps?: VideoFiltersProps
  }
  onReport?: (report: { type: string; message: string }) => void
  version?: string
  levels?: Level[]
  setLevels?: (levels: Level[]) => void
  subtitle: Subtitle | null
  onChangeSubtitle: (subtitle: Subtitle | null) => void
  isFullScreen?: boolean
}

export function Player({
  source,
  onChangeSource,
  poster,
  autoPlay = false,
  onEnded,
  onTimeUpdate,
  onDurationChange,
  startTime = 0,
  qualitySources = [],
  onChangeQualitySources,
  subtitles = [],
  audioOptions = [],
  skipTimes = [],
  videoId,
  nextEpisode,
  onNextEpisode = () => {},
  episodes = [],
  currentEpisode,
  onEpisodeSelect,
  iconClassName,
  buttonClassName,
  onBack,
  filters = videoFilters,
  initialSubtitleStyle = defaultSubtitleStyle,
  showBackButton = false,
  showEpisodeLabel = false,
  showReportButton = false,
  options,
  isReady = true,
  showNextEpisodeButton = false,
  onReport,
  version = '1.0.0',
  levels,
  setLevels,
  subtitle,
  onChangeSubtitle,
  isFullScreen = false,
}: PlayerProps) {
  const _isSafari = isSafari()
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [bufferedPercentage, setBufferedPercentage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(isFullScreen)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [hasError, setHasError] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3
  const retryTimeout = useRef<NodeJS.Timeout | null>(null)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const isInitialized = useRef(false)
  const { videoHeight, letterboxMargin } = useVideoDimensions()

  // Bildirim state'leri
  const [notificationText, setNotificationText] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const notificationTimeout = useRef<NodeJS.Timeout | null>(null)
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false)
  const hlsRef = useRef<Hls | null>(null)
  const [nativeTracks, setNativeTracks] = useState<Subtitle[]>([])
  const [tooltipTime, setTooltipTime] = useState('')
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [isFullScreenEnabled, setIsFullScreenEnabled] = useState(false)
  const {
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
    autoQuality,
    setAutoQuality,
    resetPlayerSettings,
  } = usePlayerSettings()
  const controlsRef = useRef<HTMLDivElement>(null)

  const showNotificationWithTimeout = (text: string, duration = 3000) => {
    if (notificationTimeout.current) {
      clearTimeout(notificationTimeout.current)
    }
    setNotificationText(text)
    setShowNotification(true)
    notificationTimeout.current = setTimeout(() => {
      setShowNotification(false)
      setNotificationText('')
    }, duration)
  }

  useEffect(() => {
    if (videoRef.current && startTime) {
      videoRef.current.currentTime = startTime
    }
  }, [startTime])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      const videoDuration = video.duration
      if (!isNaN(videoDuration) && videoDuration > 0) {
        setDuration(videoDuration)
        if (onDurationChange) onDurationChange(videoDuration)
      }
      setIsInitializing(false)
    }

    const handleTimeUpdate = () => {
      const time = video.currentTime
      const videoDuration = video.duration
      if (!isNaN(time) && time >= 0) {
        setCurrentTime(time)
        if (onTimeUpdate) onTimeUpdate(time)
      }
      if (!isNaN(videoDuration) && videoDuration > 0) {
        setDuration(videoDuration)
      }
    }

    const handleVolumeChange = () => {
      // setVolume(video.volume)
      // setIsMuted(video.muted)
    }

    const handlePlaying = () => {
      setIsPlaying(true)
      setIsBuffering(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleWaiting = () => {
      setIsBuffering(true)
    }

    const handleError = () => {
      setIsBuffering(false)
      setIsPlaying(false)
      setHasError(true)
      setIsInitializing(false)
    }

    const handleProgress = () => {
      if (video.buffered.length) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const duration = video.duration
        if (duration > 0) {
          const percentage = (bufferedEnd / duration) * 100
          setBufferedPercentage(percentage)
        }
      }
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('volumechange', handleVolumeChange)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('pause', handlePause)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('error', handleError)
    video.addEventListener('progress', handleProgress)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('volumechange', handleVolumeChange)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('error', handleError)
      video.removeEventListener('progress', handleProgress)
    }
  }, [source, onTimeUpdate, onDurationChange])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (isFullScreen) {
      console.log('Fullscreen mode')
      toggleFullscreen()
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handlePlaybackError = (error: any) => {
    console.error('Video oynatma hatası:', error)
    setIsBuffering(false)

    // if (retryCount < maxRetries) {
    setRetryCount((prev) => prev + 1)
    setIsBuffering(true)
    if (videoRef.current) {
      // Mevcut hata durumunu duraklatıyoruz
      const currentTime = videoRef.current.currentTime
      videoRef.current.pause()
      hlsRef.current?.destroy()

      // Zamanı 10 saniye ileri alıyoruz

      loadHls(source.src)

      videoRef.current.currentTime = currentTime + 3

      // Video elementini yeniden yükleyerek hata durumunu sıfırlıyoruz
      videoRef.current.load()

      // Küçük bir gecikme veriyoruz ki load işlemi tamamlansın
      setTimeout(() => {
        videoRef.current
          ?.play()
          .then(() => {
            console.log('Video yeniden oynatılıyor.')
            setHasError(false)
          })
          .catch((playError) => {
            console.error('Oynatma hatası:', playError)
          })
      }, 2000)
      // }
      // retryTimeout.current = setTimeout(
      //   () => {
      //     setRetryCount((prev) => prev + 1)
      //     if (videoRef.current) {
      //       console.log('videoRef.current.currentTime', videoRef.current.currentTime)
      //       videoRef.current.currentTime = videoRef.current.currentTime + 10
      //       // videoRef.current.load()
      //       videoRef.current.play().catch(handlePlaybackError)
      //     }
      //   },
      //   2000 * (retryCount + 1)
      // ) // Her denemede bekleme süresini artır
    } else {
      showNotificationWithTimeout('Video yüklenirken bir hata oluştu.')
      setHasError(true)
    }
  }

  const togglePlay = async () => {
    if (videoRef.current?.paused) {
      setShowPlayPauseIcon(true)
      await videoRef.current?.play()
      // showNotificationWithTimeout('Oynatılıyor')
      setTimeout(() => setShowPlayPauseIcon(false), 1000)
    } else {
      setShowPlayPauseIcon(true)
      videoRef.current?.pause()
      // showNotificationWithTimeout('Duraklatıldı')
      setTimeout(() => setShowPlayPauseIcon(false), 1000)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
      showNotificationWithTimeout(isMuted ? 'Ses açıldı' : 'Ses kapatıldı')
    }
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFullscreen()
  }

  const handleVolumeChange = (value: number) => {
    const newVolume = value / 100
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)

      if (newVolume === 0) {
        setIsMuted(true)
        showNotificationWithTimeout('Ses kapatıldı')
      } else {
        setIsMuted(false)
        showNotificationWithTimeout(`Ses seviyesi %${Math.round(newVolume * 100)}`)
      }
    }
  }

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0]

    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
      // showNotificationWithTimeout(`${formatTime(newTime)} konumuna atlandı`)
    }
  }

  const toggleFullscreen = async () => {
    if (typeof window === 'undefined') return

    let elementToFullscreen = containerRef.current as any

    if (isIos()) {
      elementToFullscreen = videoRef.current as any
    }

    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullScreenEnabled(false)
      if (isMobile()) {
        o9n.orientation.unlock()
      }
    } else {
      setIsFullScreenEnabled(true)
      if (elementToFullscreen.requestFullscreen) {
        elementToFullscreen.requestFullscreen()
      } else if (elementToFullscreen.mozRequestFullScreen) {
        elementToFullscreen.mozRequestFullScreen()
      } else if (elementToFullscreen.webkitRequestFullscreen) {
        elementToFullscreen.webkitRequestFullscreen()
      } else if (elementToFullscreen.webkitEnterFullscreen) {
        elementToFullscreen.webkitEnterFullscreen()
      } else if (elementToFullscreen.msRequestFullscreen) {
        elementToFullscreen.msRequestFullscreen()
      }

      await sleep(50)

      if (isMobile()) {
        o9n.orientation.lock('landscape-primary')
      }
    }
  }

  const seek = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration))
      videoRef.current.currentTime = newTime
      showNotificationWithTimeout(
        seconds > 0 ? `${seconds} saniye ileri sarıldı` : `${Math.abs(seconds)} saniye geri sarıldı`
      )
    }
  }

  const handleMouseMove = () => {
    if (isMobile()) return

    setShowControls(true)
    setCursorVisible(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
      if (isPlaying) {
        setCursorVisible(false)
      }
    }, controlsTimeout)
  }
  const loadHls = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current) return reject(new Error('Video elementi bulunamadı'))

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

      // Temel HLS konfigürasyonu
      const baseConfig: Partial<HlsConfig> = {
        autoStartLoad: true,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        debug: false,
        capLevelToPlayerSize: isMobile,
        startLevel: -1,
        renderTextTracksNatively: isIos(),
        enableWebVTT: isIos(),
      }

      // Mobil cihaz optimizasyonları (buffer süreleri artırıldı)
      const mobileConfig: Partial<HlsConfig> = {
        ...baseConfig,
        maxBufferSize: 30 * 1000 * 1000, // 20MB
        maxBufferLength: 60, // Artırıldı: 45 saniye
        maxMaxBufferLength: 100, // Artırıldı: 90 saniye
        abrEwmaDefaultEstimate: 500000,
        abrMaxWithRealBitrate: true,
        progressive: true,
        fragLoadingMaxRetry: 20,
        fragLoadingRetryDelay: 200,
        fragLoadingMaxRetryTimeout: 5000,
        manifestLoadingMaxRetry: 20,
        manifestLoadingRetryDelay: 200,
        manifestLoadingMaxRetryTimeout: 5000,
        testBandwidth: true,
        enableSoftwareAES: true,
      }

      // Masaüstü konfigürasyonu
      const desktopConfig: Partial<HlsConfig> = {
        ...baseConfig,
        maxBufferSize: 90 * 1024 * 1024, // 60 MB
        maxBufferLength: 60,
        maxMaxBufferLength: 120,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 10,
        maxFragLookUpTolerance: 0.5,
        maxLoadingDelay: 4,
        startFragPrefetch: true,
        testBandwidth: true,
      }

      const hls = new Hls(isMobile ? mobileConfig : desktopConfig)
      let retryCount = 0
      const maxRetries = isMobile ? 3 : 5

      // HLS event listener'larını temizlemek için referanslar
      const onMediaAttached = () => {
        hls.loadSource(src)
      }

      const onManifestParsed = (event: string, data: ManifestParsedData) => {
        // if (qualitySources.length > 1) return
        const levels: Level[] = []

        data?.levels?.forEach((level, index) => {
          const resolution = level.height || source.resolution || 0
          const bitrate = level.bitrate || source.bitrate || 0
          const label = ResolutionLabels[Number(resolution)] || resolution
          levels.push({
            label,
            bitrate,
            level: index,
            resolution: String(resolution),
          })
        })

        setLevels(levels)
        hlsRef.current = hls
        resolve()
      }

      // Hata yönetimi: Hata tipine göre yeniden deneme veya fallback
      const onError = async (event, data: ErrorData) => {
        console.warn('HLS Error:', { event, data, retryCount })
        if (data.fatal) {
          // Retry gecikmesini linear olarak hesaplıyoruz; isteğe bağlı olarak exponential backoff eklenebilir.
          const delay = isMobile ? 1000 * (retryCount + 1) : 500
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('HLS Ağ Hatası:', data.details)
              if (retryCount < maxRetries) {
                retryCount++
                console.log(`HLS Ağ Hatası Yeniden Deneme (${retryCount}/${maxRetries})`)
                await sleep(delay)
                hls.startLoad()
              } else {
                console.log("HLS başarısız, native player'a geçiliyor")
                cleanupHls()
                if (videoRef.current) {
                  videoRef.current.src = src
                }
              }
              break

            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('HLS Medya Hatası Data:', data)
              if (retryCount < maxRetries) {
                retryCount++
                console.log(`HLS Medya Hatası Yeniden Deneme (${retryCount}/${maxRetries})`)
                await sleep(delay)
                // Retry sayacını sıfırlayarak fragman yüklemeyi yeniden başlat
                // retryCount = 0
                // hls.startLoad(nextPosition)
                hls.recoverMediaError()
              } else {
                cleanupHls()

                console.log('HLS medya hatası....')
                // const currentTime = videoRef.current.currentTime
                // // Eğer hls.nextLoadPosition mevcutsa kullan, yoksa sabit bir offset ekle (örneğin 5 saniye)
                // const nextPosition = currentTime + 3
                // videoRef.current.currentTime = nextPosition
                // // Retry sayacını sıfırlayarak fragman yüklemeyi yeniden başlat
                // retryCount = 0
                // hls.startLoad(nextPosition)
                // // console.log('HLS medya hatası, yeniden başlatılıyor')
                // cleanupHls()
                // initHls() // Yeni HLS instance ile yeniden başlat
              }
              break

            default:
              if (retryCount < maxRetries) {
                retryCount++
                console.log(`HLS Kritik Hata Yeniden Deneme (${retryCount}/${maxRetries})`)
                await sleep(delay)
                cleanupHls()
                initHls()
              } else {
                console.error("HLS kritik hata, native player'a geçiliyor")
                cleanupHls()
                if (videoRef.current) {
                  videoRef.current.src = src
                }
              }
              break
          }
        }
      }

      // Cleanup fonksiyonu: event listener'ları kaldır ve instance'ı yok et
      const cleanupHls = () => {
        hls.off(Hls.Events.MEDIA_ATTACHED, onMediaAttached)
        hls.off(Hls.Events.MANIFEST_PARSED, onManifestParsed)
        hls.off(Hls.Events.ERROR, onError)
        hls.destroy()
      }

      // HLS instance'ını başlatan fonksiyon
      const initHls = () => {
        try {
          hls.attachMedia(videoRef.current)
          hls.on(Hls.Events.MEDIA_ATTACHED, onMediaAttached)
          hls.on(Hls.Events.MANIFEST_PARSED, onManifestParsed)
          hls.on(Hls.Events.ERROR, onError)

          // Mobil için performans gösterge eventleri
          if (isMobile) {
            hls.on(Hls.Events.FRAG_LOADING, () => {
              if (!videoRef.current?.paused) {
                // setIsBuffering(true)
              }
            })
            hls.on(Hls.Events.FRAG_LOADED, (data) => {
              setIsBuffering(false)
            })
          }
          hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
            console.log('Kalite değişti:', data.level)
          })
        } catch (error) {
          console.error('HLS init hatası:', error)
          reject(error)
        }
      }

      initHls()
      // Cleanup: Promise iptal edilirse HLS instance'ını temizle
      return () => {
        cleanupHls()
      }
    })
  }

  const changeSource = async (newSource: Source) => {
    onChangeSource(newSource)
  }

  const handleQualityChange = ({
    source,
    level,
    notify = true,
  }: {
    source: Source
    level?: number
    notify?: boolean
  }) => {
    if (level !== undefined && hlsRef.current) {
      hlsRef.current.currentLevel = level
      hlsRef.current.nextLevel = level
      setSelectedLevel(level)
      return
    }

    changeSource(source)
    setLastQualityPreference(source.label)
    // setAutoQuality(false)
    // setSelectedLevel(null)
    if (notify) {
      showNotificationWithTimeout(`Kalite ${source.label} olarak değiştirildi`)
    }

    if (isMobile()) {
      setTimeout(() => {
        videoRef.current?.play()
      }, 1000)
    }
  }

  const handleSubtitleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window === 'undefined') return
    const file = e.target.files?.[0]
    if (!file) return

    const fileUrl = URL.createObjectURL(file)

    // Custom altyazıyı seçili olarak ayarla
    onChangeSubtitle({
      label: 'Özel Altyazı',
      srclang: 'custom',
      src: fileUrl,
    })

    showNotificationWithTimeout('Özel altyazı yüklendi')
  }

  const handleSubtitleChange = async (srclang: string, notify: boolean = true) => {
    // Eğer altyazı kapatıldıysa
    if (srclang === '') {
      onChangeSubtitle(null)
      setLastSubtitleLanguage('')
      if (notify) {
        showNotificationWithTimeout('Altyazı kapatıldı')
      }
      return
    }

    try {
      // Seçilen altyazıyı bul
      const selectedSubtitle = subtitles.find((s) => s.srclang === srclang)
      if (!selectedSubtitle) return

      // Seçilen altyazıyı işaretle
      onChangeSubtitle(selectedSubtitle)
      setLastSubtitleLanguage(srclang)
      if (notify) {
        showNotificationWithTimeout(`Altyazı ${selectedSubtitle.label} olarak değiştirildi`)
      }
    } catch (error) {
      console.error('Altyazı yükleme hatası:', error)
      showNotificationWithTimeout('Altyazı yüklenirken bir hata oluştu', 3000)
    }
  }

  const onChangeAudioOption = (source: Source) => {
    const audioOption = audioOptions.find((option) => option.label === source.label)
    if (!audioOption) return

    changeSource(source)
    onChangeQualitySources(audioOption.sources)
    setLastAudioPreference(source.label)
    showNotificationWithTimeout(`Ses ${source.label} olarak değiştirildi`)
  }

  const handlePlaybackSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackSpeed(speed)
      showNotificationWithTimeout(`Oynatma hızı ${speed}x olarak değiştirildi`)
    }
  }

  const handleVideoClick = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return

    const controls = document.querySelector('.player-controls')
    const menu = document.querySelector('[role="menu"]')
    if (controls?.contains(e.target as Node) || menu?.contains(e.target as Node)) {
      return
    }

    if (!isMobile()) {
      togglePlay()
    } else {
      if (showControls) {
        setShowControls(false)
      } else {
        setShowControls(true)
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current)
        }
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
          if (isPlaying) {
            setCursorVisible(false)
          }
        }, controlsTimeout)
      }
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault()
          togglePlay()
          break
        case 'm':
          e.preventDefault()
          toggleMute()
          break
        case 'f':
          toggleFullscreen()
          break
        case 'arrowleft':
          seek(-seekTime)
          break
        case 'arrowright':
          seek(seekTime)
          break
        case 'arrowup':
          if (videoRef.current) {
            const newVolume = Math.min(1, (videoRef.current.volume || 0) + 0.1) * 100
            handleVolumeChange(newVolume)
          }
          break
        case 'arrowdown':
          if (videoRef.current) {
            const newVolume = Math.max(0, (videoRef.current.volume || 0) - 0.1) * 100
            handleVolumeChange(newVolume)
          }
          break
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (videoRef.current) {
            const percent = parseInt(e.key) * 10
            const newTime = (duration * percent) / 100
            handleTimeChange([newTime])
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [duration, isPlaying, volume, isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleError = () => {
      handlePlaybackError(new Error('Video yüklenme hatası'))
    }

    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('error', handleError)
    }
  }, [retryCount])

  // Cleanup for retry timeout
  useEffect(() => {
    return () => {
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current)
      }
    }
  }, [])

  const handleSkip = (skipTime: SkipTime) => {
    if (skipTime && videoRef.current) {
      videoRef.current.currentTime = skipTime.end
      showNotificationWithTimeout(`${skipTime.notificationLabel || skipTime.label} geçildi`)
    }
  }

  // Boş hover handler'lar
  const handleProgressHover = (e: React.MouseEvent) => {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const position = e.clientX - rect.left
    const percentage = position / rect.width
    const previewTime = duration * percentage
    const minutes = Math.floor(previewTime / 60)
    const seconds = Math.floor(previewTime % 60)
    setTooltipTime(`${minutes}:${String(seconds).padStart(2, '0')}`)
  }

  const handleProgressLeave = () => {
    setTooltipTime('')
  }

  const loadSavedPosition = () => {
    const savedPosition = localStorage.getItem(`video-position-${videoId}`)
    if (savedPosition && videoRef.current) {
      const position = parseFloat(savedPosition)
      videoRef.current.currentTime = position
      setCurrentTime(position)
    }
  }

  // Her 5 saniyede bir pozisyonu kaydet
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (videoRef.current) {
        localStorage.setItem(`video-position-${videoId}`, videoRef.current.currentTime.toString())
      }
    }, 2000)

    return () => clearInterval(saveInterval)
  }, [videoId])

  // Video bittiğinde pozisyonu sıfırla
  useEffect(() => {
    if (currentTime > 0 && duration > 0 && currentTime >= duration * 0.95) {
      localStorage.removeItem(`video-position-${videoId}`)
    }
  }, [currentTime, duration, videoId])

  const handleFilterChange = (filter: Filter | null) => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.style.filter = defaultFilter

      if (!filter) {
        setBrightness(100)
        setOpacity(100)

        showNotificationWithTimeout('Filtre kaldırıldı')
        setActiveFilter('')
        setCurrentFilterValues(null)
        return
      }

      const {
        contrast,
        brightness: filterBrightness,
        saturate,
        sepia,
        hueRotate,
        blur,
        temperature,
      } = filter.values

      setTimeout(() => {
        videoElement.style.filter = `
          brightness(${brightness}%)
          contrast(${contrast}%)
          saturate(${saturate}%)
          sepia(${sepia}%)
          hue-rotate(${hueRotate}deg)
        ${temperature ? `sepia(${temperature / 100}) hue-rotate(${temperature * -1}deg)` : ''}
      `
      }, 10)

      showNotificationWithTimeout(`${filter.name} filtresi uygulandı`)
      setActiveFilter(filter.name)
      setCurrentFilterValues(filter.values)
    }
  }

  const handleReport = (type: string, message: string) => {
    showNotificationWithTimeout('Sorun bildiriminiz alındı, teşekkürler!')
    onReport?.({
      type,
      message,
    })
  }

  const controlProps: PlayerControlsProps = {
    buttonClassName: cn(
      'h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white hover:bg-white/20 transition-transform duration-300 hover:scale-[1.05]',
      buttonClassName
    ),
    iconClassName: cn('w-5.5 h-5.5 md:w-7 md:h-7 lg:w-8 lg:h-8', iconClassName),
    dropdownMenuContentClassName: cn(
      'z-[9999] border-neutral-700 bg-neutral-900/95 min-w-[50px] max-w-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent max-h-[calc(100vh-100px)]'
    ),
    dropdownMenuItemClassName: cn(
      'cursor-pointer px-1.5 py-1.5 md:px-3 md:py-3 text-sm md:text-base transition-colors hover:bg-white/10 flex items-center justify-between'
    ),
    checkIconClassName: cn('h-4 w-4'),
    labelClassName: cn(
      'flex items-center justify-between border-b border-white/10 px-2 py-2 md:px-3 md:py-3 '
    ),
    labelTextClassName: cn('font-bold text-sm '),
    portalContainerId: 'player-portal-root',
    triggerClassName: cn('flex w-full items-center justify-between'),
    triggerLabelClassName: cn('font-medium mr-2 text-sm '),
    triggerValueClassName: cn('text-white/70 text-sm'),
    textClassName: cn('text-sm  mr-3'),
    valueClassName: cn('text-white/70 text-sm '),
    showLabel: false,
  }

  const controlsWrapperClassName = cn(
    'absolute  z-40',
    showControls ? 'opacity-100' : 'pointer-events-none opacity-0'
  )

  useEffect(() => {
    if (!videoRef.current || !source) return

    const loadVideo = async () => {
      try {
        const videoElement = videoRef.current
        // Mevcut oynatmayı durdur, HLS instance'larını temizle
        const time = currentTime
        const speed = videoRef.current?.playbackRate || playbackSpeed || 1
        const playing = isPlaying

        videoElement.pause()
        videoElement.removeAttribute('src')
        videoElement.load()
        setIsPlaying(false)

        if (hlsRef.current) {
          hlsRef.current.destroy()
          hlsRef.current = null
        }

        const isHlsSource = source.type === 'hls'
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
        const isAndroid = /Android/i.test(navigator.userAgent)

        const tryDirectSource = () => {
          console.log('HLS başarısız, direkt video kaynağına geçiliyor')
          const directUrl = source.src.replace('/index.m3u8', '/video.mp4')
          videoElement.src = directUrl
        }

        if (isHlsSource) {
          if (isIOS) {
            console.log('iOS: Native HLS kullanılıyor')
            videoElement.src = source.src
            videoElement.onerror = () => {
              console.error('iOS native HLS hatası')
              tryDirectSource()
            }
          } else if (isAndroid && Hls.isSupported()) {
            console.log('Android: MSE destekli, HLS.js kullanılıyor')
            try {
              await loadHls(source.src)
            } catch (error) {
              console.error('HLS.js yükleme hatası:', error)
              tryDirectSource()
            }
          } else if (Hls.isSupported()) {
            console.log('HLS.js kullanılıyor')
            try {
              await loadHls(source.src)
            } catch (error) {
              console.error('HLS.js yükleme hatası:', error)
              tryDirectSource()
            }
          } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            console.log('Native HLS kullanılıyor (fallback)')
            videoElement.src = source.src
            videoElement.onerror = () => {
              console.error('Native HLS hatası')
              tryDirectSource()
            }
          } else {
            throw new Error('HLS desteklenmiyor')
          }
        } else {
          videoElement.src = source.src
        }

        videoElement.addEventListener('canplay', function handleCanPlay() {
          if (!isInitialized.current) {
            isInitialized.current = true
            loadSavedPosition()
          } else {
            videoElement.currentTime = time
            videoElement.playbackRate = speed
            // if (playing) {
            videoElement
              .play()
              .catch((error) => {
                console.error('Video oynatma hatası:', error)
                // if (isAndroid) {
                const playAttempt = setInterval(() => {
                  videoElement
                    .play()
                    .then(() => clearInterval(playAttempt))
                    .catch(() => console.log('Oynatma yeniden deneniyor...'))
                }, 3000)
                // }
              })
              .finally(() => {
                setIsPlaying(true)
              })
            // }
          }
          videoElement.removeEventListener('canplay', handleCanPlay)
        })
      } catch (error) {
        console.error('Video yükleme hatası:', error)
        handlePlaybackError(error)
      }
    }

    loadVideo()
  }, [source])

  const handleBrightnessChange = (value: number) => {
    setBrightness(value)
    if (videoRef.current) {
      videoRef.current.style.filter = `brightness(${value}%)`
      showNotificationWithTimeout(`Parlaklık ${value}%`)
    }
  }

  const handleOpacityChange = (value: number) => {
    setOpacity(value)
    if (videoRef.current) {
      videoRef.current.style.opacity = `${value}%`
      showNotificationWithTimeout(`Opaklık ${value}%`)
    }
  }

  useEffect(() => {
    if (controlsRef.current) {
      const height = controlsRef.current.offsetHeight
      setSubtitleStyle((val) => ({ ...val, minBottomPosition: height }))
    }
  }, [controlsRef.current])

  // Context menu'yü kapat
  const closeContextMenu = () => setContextMenu(null)

  // Sağ tık menüsünü engelle ve custom menu'yü göster
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    const { pageX, pageY } = e

    // Ekran sınırlarını kontrol et
    const menuWidth = 200 // Yaklaşık menu genişliği
    const menuHeight = 100 // Yaklaşık menu yüksekliği
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Menu'nün ekran dışına taşmasını engelle
    const x = Math.min(pageX, windowWidth - menuWidth)
    const y = Math.min(pageY, windowHeight - menuHeight)

    setContextMenu({ x, y })
  }

  // Herhangi bir yere tıklandığında context menu'yü kapat
  const handleClick = (e: React.MouseEvent) => {
    if (contextMenu) {
      closeContextMenu()
    }

    handleVideoClick(e)
  }

  // Video kaynağı değiştiğinde tercihleri uygula
  useEffect(() => {
    // TODO: improve
    if (!source || !qualitySources.length || !audioOptions.length) return

    try {
      const savedSettings = localStorage.getItem('player-settings')
      if (!savedSettings) return

      const settings: PlayerSettings = JSON.parse(savedSettings)

      // Kalite tercihini uygula
      if (settings.lastQualityPreference) {
        const preferredQuality = qualitySources.find(
          (q) => q.label === settings.lastQualityPreference
        )
        if (preferredQuality && preferredQuality.src !== source.src) {
          handleQualityChange({ source: preferredQuality, notify: false })
        }
      }

      // Ses tercihi uygula
      if (settings.lastAudioPreference) {
        const preferredAudio = audioOptions.find(
          (opt) => opt.label === settings.lastAudioPreference
        )
        if (preferredAudio && preferredAudio.source.src !== source.src) {
          onChangeAudioOption(preferredAudio.source)
        }
      }

      // Altyazı tercihi uygula
      if (settings.lastSubtitleLanguage && subtitles.length > 0) {
        const preferredSubtitle = subtitles.find(
          (sub) => sub.srclang === settings.lastSubtitleLanguage
        )
        if (preferredSubtitle) {
          handleSubtitleChange(preferredSubtitle.srclang, false)
        }
      }
    } catch (error) {
      console.error('Video tercihleri uygulanırken hata:', error)
    }
  }, [source, audioOptions, subtitles])

  // Video yüklendiğinde ayarları uygula
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    video.volume = volume
    video.muted = isMuted
    video.playbackRate = playbackSpeed
    // Video filtrelerini uygula
    if (activeFilter && currentFilterValues) {
      const filter = filters.find((f) => f.name === activeFilter)
      handleFilterChange(filter)
    } else {
      video.style.filter = `brightness(${brightness}%)`
    }
    video.style.opacity = `${opacity}%`
  }, [videoRef.current])

  const onChangeAutoQuality = (autoQuality: boolean) => {
    setAutoQuality(autoQuality)
    if (autoQuality) {
      if (hlsRef.current) {
        hlsRef.current.currentLevel = -1
        setSelectedLevel(null)
      }
      showNotificationWithTimeout('Otomatik kalite seçildi')
    }
  }

  useEffect(() => {
    if (!autoQuality || qualitySources.length < 2 || !hlsRef.current) return

    const hls = hlsRef.current

    const checkAndSwitchSource = () => {
      const bandwidth = hls.bandwidthEstimate || 0

      // qualitySources içinden, tahmini bant genişliğine en yakın bitrate değerine sahip kaynağı seçiyoruz.
      const bestSource = qualitySources.reduce((prev, curr) => {
        return Math.abs(curr.bitrate - bandwidth) < Math.abs(prev.bitrate - bandwidth) ? curr : prev
      })
      // Eğer seçilen kaynak, mevcut video kaynağından farklıysa geçiş yap.
      if (bestSource && bestSource.src !== source?.src) {
        console.log(
          `AutoQuality: Kaynak değiştiriliyor. Eski: ${source?.src}, Yeni: ${bestSource.src}`
        )
        handleQualityChange({ source: bestSource, notify: true })
      }
    }

    // Hls.js FRAG_LOADED event'inde her fragment yüklendiğinde kontrol edelim.
    hls.on(Hls.Events.FRAG_LOADED, checkAndSwitchSource)

    // Alternatif olarak, her 10 saniyede bir de kontrol edebilirsiniz.
    const interval = setInterval(checkAndSwitchSource, 10000)

    return () => {
      hls.off(Hls.Events.FRAG_LOADED, checkAndSwitchSource)
      clearInterval(interval)
    }
  }, [autoQuality, qualitySources, source, hlsRef.current])

  const getNativeTrack = async (src: string) => {
    if (!src) return null

    const response = await fetch(src)
    const text = await response.text()

    const subtitleBlob = new Blob([text], { type: 'text/vtt' })

    // Blob URL'si oluşturun
    const subtitleUrl = URL.createObjectURL(subtitleBlob)

    return subtitleUrl
  }

  const prepareNativeTracks = async (subtitles: Subtitle[]) => {
    if (!subtitles.length) return
    let tracks = []
    for (const sub of subtitles) {
      const url = await getNativeTrack(sub.src)
      sub.src = url
      tracks.push(sub)
    }
    setNativeTracks(tracks)
  }

  useEffect(() => {
    prepareNativeTracks(subtitles)
  }, [subtitles])

  const showNativeTrack = isIos() && isFullScreenEnabled

  const onReset = () => {
    resetPlayerSettings()
    const { opacity, volume, isMuted, playbackSpeed } = defaultPlayerSettings
    if (videoRef.current) {
      videoRef.current.style.opacity = `${opacity}%`
      videoRef.current.style.filter = defaultFilter
      videoRef.current.playbackRate = playbackSpeed
      videoRef.current.volume = volume
      videoRef.current.muted = isMuted
    }
    showNotificationWithTimeout('Ayarlar sıfırlandı')
  }

  const onResetSubtitleStyle = () => {
    setSubtitleStyle({ ...defaultSubtitleStyle })
    showNotificationWithTimeout('Altyazı ayarları sıfırlandı')
  }

  const showPlayButton = isMobile() && !isPlaying

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          'z-1 fixed relative inset-0 flex w-full items-center justify-center overflow-hidden bg-black',
          cursorVisible ? 'cursor-default' : 'cursor-none',
          isFullscreen ? 'fixed inset-0' : 'relative'
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (!isMobile() && isPlaying) {
            setShowControls(false)
          }
        }}
        onDoubleClick={handleDoubleClick}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        {/* Loading Indicator */}
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            {poster ? (
              <div className="absolute inset-0">
                <img src={poster} alt="Video thumbnail" className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                </div>
              </div>
            ) : (
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            )}
          </div>
        )}
        {/* Video with filter styles */}
        <video
          ref={videoRef}
          src={source?.src || ''}
          poster={poster}
          className="h-full w-full bg-black object-contain relative"
          autoPlay={autoPlay}
          disableRemotePlayback
          playsInline
          webkit-playsinline="true"
          x-webkit-playsinline="true"
          controls={showNativeTrack}
        >
          {isSafari() &&
            isFullScreenEnabled &&
            nativeTracks.map((sub, index) => (
              <track
                default={index === 0}
                label={sub.label}
                srcLang={sub.srclang}
                kind="subtitles"
                src={sub.src}
              />
            ))}
        </video>
        {subtitle && !(isFullScreenEnabled && isSafari()) && (
          <CustomSubtitleRenderer
            subtitleStyle={subtitleStyle}
            selectedSubtitle={subtitle}
            currentTime={currentTime}
            videoHeight={videoHeight}
            letterboxMargin={letterboxMargin}
          />
        )}
        {/* Buffering Indicator */}
        {isBuffering && isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          </div>
        )}
        {/* Skip Buttons */}
        {isReady && (
          <SkipButtons
            currentTime={currentTime}
            skipTimes={skipTimes}
            onSkip={handleSkip}
            {...controlProps}
            {...options?.skipButtonsProps}
          />
        )}
        {/* Controls */}
        {isReady && (
          <>
            <div
              className={cn(
                controlsWrapperClassName,
                'left-0 right-0 top-0 z-[99999] flex items-center justify-between space-y-2 bg-gradient-to-b from-black/50 via-black/25 to-transparent p-4'
              )}
            >
              <div className="flex items-center gap-4">
                {showBackButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => onBack?.()}
                  >
                    <ChevronLeft className={controlProps.iconClassName} />
                  </Button>
                )}
                {showEpisodeLabel && (
                  <h1 className="text-xl font-medium text-white">
                    {currentEpisode?.title} - {currentEpisode?.episode}. Bölüm
                  </h1>
                )}
              </div>
              {showReportButton && (
                <div className={cn('flex items-center gap-2')}>
                  <PlayerReport
                    onReport={handleReport}
                    {...controlProps}
                    {...options?.playerReportProps}
                  />
                </div>
              )}
            </div>
            <div className={cn(controlsWrapperClassName, 'bottom-0 left-0 right-0 z-[99999]')}>
              <div
                ref={controlsRef}
                className="player-controls absolute bottom-0 left-0 right-0 space-y-2 bg-gradient-to-t from-black/50 via-black/25 to-transparent p-4"
              >
                {/* Progress Bar */}
                <ProgressBar
                  currentTime={currentTime}
                  duration={duration}
                  onTimeChange={handleTimeChange}
                  onProgressHover={handleProgressHover}
                  onProgressLeave={handleProgressLeave}
                  tooltipTime={tooltipTime}
                  bufferedPercentage={bufferedPercentage}
                  {...options?.progressBarProps}
                />

                {/* Controls */}
                <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex min-w-max items-center justify-between px-2">
                    {/* Sol Taraftaki Kontroller */}
                    <div className="flex items-center gap-2">
                      <PlayPauseButton
                        isPlaying={isPlaying}
                        onToggle={togglePlay}
                        {...controlProps}
                        {...options?.playPauseButtonProps}
                      />
                      <SeekButtons
                        onSeekBackward={() => seek(-seekTime)}
                        onSeekForward={() => seek(seekTime)}
                        {...controlProps}
                        {...options?.seekButtonsProps}
                      />
                      <VolumeControl
                        volume={volume}
                        isMuted={isMuted}
                        onVolumeChange={handleVolumeChange}
                        onToggleMute={toggleMute}
                        {...controlProps}
                        {...options?.volumeControlProps}
                      />
                      {showNextEpisodeButton && nextEpisode ? (
                        <NextEpisodeButton
                          onNextEpisode={onNextEpisode}
                          {...controlProps}
                          {...options?.nextEpisodeButtonProps}
                        />
                      ) : null}
                    </div>

                    {/* Sağ Taraftaki Kontroller */}
                    <div className="flex items-center gap-2">
                      {episodes.length > 0 && (
                        <EpisodeSelector
                          episodes={episodes}
                          currentEpisode={currentEpisode}
                          onEpisodeSelect={onEpisodeSelect!}
                          showLabel={false}
                          {...controlProps}
                          {...options?.episodeSelectorProps}
                        />
                      )}

                      <VideoSettings
                        {...controlProps}
                        labelText="Video Ayarları"
                        {...options?.videoSettingsProps}
                        menuItems={
                          <>
                            {qualitySources.length && !!source && (
                              <QualitySelector
                                autoQuality={autoQuality}
                                sources={qualitySources}
                                selectedSource={source}
                                onSourceChange={handleQualityChange}
                                {...controlProps}
                                labelText="Kalite"
                                levels={levels}
                                selectedLevel={selectedLevel}
                                setAutoQuality={onChangeAutoQuality}
                              />
                            )}
                            {subtitles.length > 0 && (
                              <SubtitleSelector
                                subtitles={subtitles}
                                selectedSubtitle={subtitle}
                                onSubtitleChange={handleSubtitleChange}
                                onSubtitleUpload={handleSubtitleUpload}
                                {...controlProps}
                                labelText="Altyazı"
                                {...options?.subtitleSelectorProps}
                              />
                            )}
                            {subtitle && (
                              <SubtitleStyleMenu
                                style={subtitleStyle}
                                onStyleChange={(newStyle) =>
                                  setSubtitleStyle((prev) => ({ ...prev, ...newStyle }))
                                }
                                labelText="Altyazı Ayarları"
                                availableFonts={[
                                  'Arial',
                                  'Times New Roman',
                                  'Courier New',
                                  'Georgia',
                                  'Verdana',
                                  'Tahoma',
                                  'Palatino',
                                  'Garamond',
                                  'Bookman',
                                  'Comic Sans MS',
                                ]}
                                availableFontWeights={[
                                  { label: 'İnce', value: 200 },
                                  { label: 'Normal', value: 400 },
                                  // { label: 'Orta', value: 500 },
                                  // { label: 'Yarı Kalın', value: 600 },
                                  { label: 'Kalın', value: 700 },
                                ]}
                                availableColors={[
                                  { label: 'Beyaz', value: '#FFFFFF' },
                                  { label: 'Siyah', value: '#000000' },
                                  { label: 'Sarı', value: '#FFFF00' },
                                  { label: 'Yeşil', value: '#00FF00' },
                                  { label: 'Mavi', value: '#00FFFF' },
                                  { label: 'Kırmızı', value: '#FF0000' },
                                  { label: 'Turuncu', value: '#FF7F00' },
                                  { label: 'Mor', value: '#800080' },
                                  { label: 'Yeşil', value: '#008000' },
                                  { label: 'Gri', value: '#808080' },
                                ]}
                                availableBackgroundColors={[
                                  { label: 'Siyah', value: '#000000' },
                                  { label: 'Yarı Saydam Siyah', value: '#000000aa' },
                                  { label: 'Koyu Gri', value: '#333333' },
                                  { label: 'Saydam', value: 'transparent' },
                                  { label: 'Beyaz', value: '#FFFFFF' },
                                  { label: 'Kırmızı', value: '#FF0000' },
                                  { label: 'Turuncu', value: '#FF7F00' },
                                  { label: 'Mor', value: '#800080' },
                                  { label: 'Yeşil', value: '#008000' },
                                  { label: 'Gri', value: '#808080' },
                                ]}
                                availableMargins={[0, 15, 30, 45, 60, 75, 90]}
                                letterColors={[
                                  { label: 'Yok', value: 'transparent' },
                                  { label: 'Siyah', value: '#000000' },
                                  { label: 'Beyaz', value: '#FFFFFF' },
                                  { label: 'Gri', value: '#777' },
                                ]}
                                onReset={onResetSubtitleStyle}
                                {...options?.subtitleStyleMenuProps}
                                {...controlProps}
                              />
                            )}
                            <AudioTrackSelector
                              sources={audioOptions.map((option) => ({
                                ...option.source,
                                label: option.label,
                              }))}
                              selectedSource={source!}
                              onChangeAudioOption={onChangeAudioOption}
                              labelText="Dublaj"
                              {...controlProps}
                              {...options?.audioTrackSelectorProps}
                            />
                            <PlaybackSpeed
                              speed={playbackSpeed}
                              onSpeedChange={handlePlaybackSpeedChange}
                              labelText="Oynatma Hızı"
                              {...controlProps}
                              {...options?.playbackSpeedProps}
                            />
                            <VideoFilters
                              filters={filters}
                              activeFilter={activeFilter}
                              onFilterChange={handleFilterChange}
                              labelText="Video Filtreleri"
                              brightness={brightness}
                              opacity={opacity}
                              onBrightnessChange={handleBrightnessChange}
                              onOpacityChange={handleOpacityChange}
                              {...options?.videoFiltersProps}
                              {...controlProps}
                            />
                            <ResetSettings onReset={onReset} {...controlProps} />
                          </>
                        }
                      />
                      <FullscreenToggle
                        isFullscreen={isFullscreen}
                        onToggleFullscreen={toggleFullscreen}
                        {...controlProps}
                        {...options?.fullscreenToggleProps}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* Context Menu */}
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={closeContextMenu}
            version={version}
          />
        )}
        {/* VPN Warning */}
        <Notification
          text="Videoyu izleyemiyorsanız veya hata alıyorsanız, VPN'inizin kapalı olduğundan ve Türkiye lokasyonunda bulunduğunuzdan emin olun."
          visible={(hasError || isInitializing) && isReady}
          type="warning"
          className="z-45"
          {...options?.notificationProps}
        />
        {/* General Notification */}
        <Notification
          text={notificationText}
          visible={showNotification}
          className="z-45"
          {...options?.notificationProps}
        />

        {/* Play/Pause Icon Overlay */}

        {showPlayButton && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center"
            onClick={togglePlay}
          >
            <div className="rounded-full bg-black/50 p-8 backdrop-blur-sm">
              <Play className={'h-8 w-8 md:h-12 md:w-12'} />
            </div>
          </div>
        )}

        {isReady && !showPlayButton && (
          <div
            className={cn(
              'absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300',
              showPlayPauseIcon ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <div className="rounded-full bg-black/50 p-8 backdrop-blur-sm">
              {isPlaying ? (
                <Pause className={'h-8 w-8 md:h-12 md:w-12'} />
              ) : (
                <Play className={'h-8 w-8 md:h-12 md:w-12'} />
              )}
            </div>
          </div>
        )}
        <div
          id={controlProps.portalContainerId}
          className="pointer-events-none absolute inset-0 z-[99999999]"
        />
      </div>
      <style>{`
        video::-webkit-media-controls-enclosure {
          display: none !important;
        }
        video::-webkit-media-controls {
          display: none !important;
        }
        video::-webkit-context-menu {
          display: none !important;
        }
        /* Firefox için */
        video::-moz-context-menu {
          display: none !important;
        }

        video::-webkit-media-text-track-display {
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          bottom: 10vh !important;
          top: auto !important;
          width: auto !important;
          min-width: 0 !important;
          max-width: 90% !important;
          line-height: normal !important;
        }

        @media (max-width: 768px) {
          .player-controls {
            padding-bottom: max(env(safe-area-inset-bottom), 1rem);
          }

          video {
            height: 100dvh !important;
            max-height: -webkit-fill-available !important;
          }

          .player-controls {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 99999 !important;
          }
        }

        /* iOS için güvenli alan desteği */
        @supports (padding: max(0px)) {
          .player-controls {
            padding-bottom: max(env(safe-area-inset-bottom), 1rem);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        }

        /* Video container için viewport height düzeltmesi */
        @supports (height: 100dvh) {
          .video-container {
            height: 100dvh !important;
            height: -webkit-fill-available !important;
          }
        }

        /* iOS için ek düzeltmeler */
        @supports (-webkit-touch-callout: none) {
          video {
            height: -webkit-fill-available !important;
          }
          
          .player-controls {
            bottom: env(safe-area-inset-bottom) !important;
          }

          :fullscreen .player-controls,
          :-webkit-full-screen .player-controls {
            z-index: 100000 !important;
          }

        }
      `}</style>
    </>
  )
}
