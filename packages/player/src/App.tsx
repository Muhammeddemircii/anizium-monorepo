import './index.css'
import { useCallback, useEffect, useState } from 'react'
import { Player } from './components/player'

import { usePlayer } from './components/player/use-player'
import { ResponsePlayerData } from './api'

import pkg from '../package.json'

function App() {
  const onNextEpisode = useCallback(() => {
    window.parent.postMessage(
      {
        ID: 'player',
        anizium_player: true,
        next_episode: true,
      },
      '*'
    )
  }, [])

  const {
    source,
    audioOptions,
    subtitles,
    skipTimes,
    qualitySources,
    onChangeAudioOption,
    setSource,
    setQualitySources,
    isReady,
    poster,
    episode,
    setData,
    levels,
    setLevels,
    subtitle,
    handleSubtitleChange,
    nextEpisode,
  } = usePlayer({ onNextEpisode })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [timePostedAt, setTimePostedAt] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const episodeId = params.get('id')
    const time = params.get('time')
    const autoPlay = params.get('autoPlay')
    const isFullScreen = params.get('fullScreen')

    if (isFullScreen) setIsFullScreen(true)
    if (autoPlay) setAutoPlay(true)

    if (time && !isNaN(Number(time))) {
      setStartTime(parseFloat(time))
    }

    initEpisode(episodeId)
  }, [])

  useEffect(() => {
    if (currentTime && Date.now() - timePostedAt > 1 * 60 * 1000) {
      window.parent.postMessage({ ID: 'player', type: 'current_time', time: currentTime }, '*')
      setTimePostedAt(Date.now())
    }
  }, [currentTime])

  const initEpisode = async (episodeId: string) => {
    try {
      if (!episodeId) {
        throw new Error('Lütfen girdiğiniz bilgileri kontrol ediniz.')
      }

      const response = await fetch('https://player.zenithstudio.net/api/video/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: `id=${episodeId}&ref=1414001f0516054f150018&answer_encrypt=0`,
      })

      if (!response.ok) {
        throw new Error('Video verisi alınamadı.')
      }

      const data = await response.json()

      if (data.isError) {
        throw new Error(data.msg || 'Video bulunamadı.')
      }

      setData(episodeId, data as ResponsePlayerData)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-black">
      <Player
        isReady={isReady}
        source={source}
        onChangeSource={setSource}
        qualitySources={qualitySources}
        onChangeQualitySources={setQualitySources}
        audioOptions={audioOptions}
        poster={poster}
        autoPlay={autoPlay}
        subtitles={subtitles}
        skipTimes={skipTimes}
        videoId={episode?.id || ''}
        episodes={[]}
        currentEpisode={episode}
        showBackButton={false}
        showEpisodeLabel={false}
        nextEpisode={nextEpisode}
        onNextEpisode={onNextEpisode}
        showNextEpisodeButton={!!nextEpisode}
        showReportButton={false}
        version={pkg.version}
        levels={levels}
        setLevels={setLevels}
        subtitle={subtitle}
        onChangeSubtitle={handleSubtitleChange}
        onTimeUpdate={setCurrentTime}
        startTime={startTime}
        // isFullScreen={isFullScreen}
      />
    </div>
  )
}

export default App
