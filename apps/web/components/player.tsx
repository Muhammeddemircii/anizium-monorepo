import { useEffect, useState } from 'react'
import '@anizium/player/player.css'
import { Player as AniziumPlayer, ResponsePlayerData, usePlayer } from '@anizium/player'

import pkg from '../package.json'

export const Player = () => {
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
  } = usePlayer({ onNextEpisode: () => {} })
  const [startTime, setStartTime] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        // URL'den episode ID'yi al
        const params = new URLSearchParams(window.location.search)
        const episodeId = '3442' //params.get('id')

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
          throw new Error('Video verisi alınamadı')
        }

        const data = await response.json()
        setData(episodeId, data as ResponsePlayerData)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu')
        setLoading(false)
      }
    }

    fetchEpisodeData()
  }, [])

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
    <div className="h-full w-full">
      <AniziumPlayer
        isReady={isReady}
        source={source}
        onChangeSource={setSource}
        qualitySources={qualitySources}
        onChangeQualitySources={setQualitySources}
        audioOptions={audioOptions}
        poster={poster}
        autoPlay
        subtitles={subtitles}
        skipTimes={skipTimes}
        videoId={episode?.id || ''}
        episodes={[]}
        currentEpisode={episode}
        showBackButton={false}
        showEpisodeLabel={false}
        showNextEpisodeButton={false}
        showReportButton={false}
        version={pkg.version}
        onNextEpisode={() => {}}
        levels={[]}
        setLevels={() => {}}
        subtitle={null}
        onChangeSubtitle={() => {}}
        onTimeUpdate={() => {}}
        startTime={startTime}
      />
    </div>
  )
}
