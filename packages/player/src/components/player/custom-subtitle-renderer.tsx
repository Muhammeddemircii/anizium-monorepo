'use client'

const testSubtitle = `
  WEBVTT

00:00:00.000 --> 00:00:05.000
Varsayılan konum (konum kodu olmayan)
Bu altyazıda konum kodu bulunmuyor
Üçüncü satır da varsayılan konumda

00:00:05.000 --> 00:00:10.000
{an1}Sol Alt Konum (an1)
İkinci satır da sol altta
Üçüncü satır bile aynı konumda

00:00:10.000 --> 00:00:15.000
{an2}Orta Alt Konum (an2)
Bu da ikinci satır
Üçüncü satır test

00:00:15.000 --> 00:00:20.000
{an3}Sağ Alt Konum (an3)
İkinci satır da sağ altta
Test test test

00:00:20.000 --> 00:00:25.000
{an4}Sol Orta Konum (an4)
İkinci satır sol ortada
Test satırı 3

00:00:25.000 --> 00:00:30.000
{an5}Tam Orta Konum (an5)
Merkezi pozisyon
Test satırı 3

00:00:30.000 --> 00:00:35.000
{an6}Sağ Orta Konum (an6)
Sağ orta pozisyonda
Test satırı 3

00:00:35.000 --> 00:00:40.000
{an7}Sol Üst Konum (an7)
Sol üst pozisyonda
Test satırı 3

00:00:40.000 --> 00:00:45.000
{an8}Orta Üst Konum (an8)
Orta üst pozisyonda
Anizium için hazırlanmıştır

00:00:45.000 --> 00:00:50.000
{an9}Sağ Üst Konum (an9)
Sağ üst köşede
Anizium test

00:00:50.000 --> 00:00:55.000
{an1}<i>İtalik yazı testi</i>
<b>Kalın yazı testi</b>
<i><b>Hem italik hem kalın</b></i>

00:00:55.000 --> 00:01:00.000
{\\an2}Alternatif konum kodu sözdizimi
İkinci satır
Üçüncü satır

00:01:00.000 --> 00:01:05.000
{an3}Bu satır normal yazı
<i>Bu satır italik
Ve bu satır hala italik</i>
Normal yazıya dönüş

00:01:05.000 --> 00:01:10.000
{an4}<b>Bu satır kalın yazı
Ve bu satır da hala kalın</b>
Normal yazıya dönüş

00:01:10.000 --> 00:01:15.000
{an5}Normal yazı başlangıcı
<i>İtalik başlangıcı
<b>İtalik ve kalın
Hala italik ve kalın</b>
Sadece italik</i>
Normal yazı sonu
`

import React, { useEffect, useState, useMemo } from 'react'
import { SubtitleStyle, Subtitle } from './interfaces'

interface CustomSubtitleRendererProps {
  subtitleStyle: SubtitleStyle
  selectedSubtitle: Subtitle | null
  currentTime: number
  videoHeight?: number
  letterboxMargin?: number
}

interface SubtitleCue {
  startTime: number
  endTime: number
  text: string[]
  position?: string // Örneğin "left: 0; bottom: 0;"
  isTop?: boolean
  isBottom?: boolean
  isLeft?: boolean
  isRight?: boolean
  isCenterX?: boolean
  isCenterY?: boolean
  positionString?: string
}

const getStyleNumber = (value: string | number) => {
  if (typeof value === 'string') {
    return parseFloat(value.replace('px', ''))
  }
  return value
}

/**
 * {\\anX} veya {\anX} kodunu yakalar ve uygun CSS konumlandırma satırını döndürür.
 */
const parseVTTPositioning = (rawLine: string) => {
  const positionMatch = rawLine.match(/\{\\?an([1-9])\}/)
  if (!positionMatch) {
    return { text: rawLine, position: null, positionString: 'none' }
  }
  let isBottom = false
  let isTop = false
  let isLeft = false
  let isRight = false
  let isCenterX = false
  let isCenterY = false
  let positionString = ''

  const positionCode = parseInt(positionMatch[1], 10)
  let positionCSS = ''

  switch (positionCode) {
    case 1: // Sol alt
      positionCSS = 'left: 0; bottom: 0;'
      isBottom = true
      isLeft = true
      positionString = 'bottom-left'
      break
    case 2: // Orta alt
      positionCSS = 'left: 50%; transform: translateX(-50%); bottom: 0;'
      isBottom = true
      isCenterX = true
      positionString = 'bottom-center'
      break
    case 3: // Sağ alt
      positionCSS = 'right: 0; bottom: 0;'
      isBottom = true
      isRight = true
      positionString = 'bottom-right'
      break
    case 4: // Sol orta
      positionCSS = 'left: 0; top: 50%; transform: translateY(-50%);'
      isCenterY = true
      isLeft = true
      positionString = 'center-left'
      break
    case 5: // Orta orta
      positionCSS = 'left: 50%; top: 50%; transform: translate(-50%, -50%);'
      isCenterX = true
      isCenterY = true
      positionString = 'center-center'
      break
    case 6: // Sağ orta
      positionCSS = 'right: 0; top: 50%; transform: translateY(-50%);'
      isCenterY = true
      isRight = true
      positionString = 'center-right'
      break
    case 7: // Sol üst
      positionCSS = 'left: 0; top: 0;'
      isTop = true
      isLeft = true
      positionString = 'top-left'
      break
    case 8: // Orta üst
      positionCSS = 'left: 50%; transform: translateX(-50%); top: 0;'
      isTop = true
      isCenterX = true
      positionString = 'top-center'
      break
    case 9: // Sağ üst
      positionCSS = 'right: 0; top: 0;'
      isTop = true
      isRight = true
      positionString = 'top-right'
      break
  }

  const cleanedText = rawLine.replace(/\{\\?an[1-9]\}/, '')
  return {
    text: cleanedText,
    position: positionCSS,
    isBottom,
    isTop,
    isLeft,
    isRight,
    isCenterX,
    isCenterY,
    positionString,
  }
}

// custom konum kodlarını koruyup diğer {\\...} komutlarını temizler.
const basicClean = (text: string): string => {
  return text.replace(/\{\\(?!an[1-9])[^\}]*\}/g, '').trim()
}

const parseVTT = (fileContent: string): SubtitleCue[] => {
  const lines = fileContent.split('\n')
  const cues: SubtitleCue[] = []
  let currentCue: Partial<SubtitleCue> = {}

  const timeToSeconds = (timeStr: string): number => {
    const [time, ms] = timeStr.split('.')
    const [hours, minutes, seconds] = time.split(':').map(Number)
    return hours * 3600 + minutes * 60 + seconds + (ms ? Number(`0.${ms}`) : 0)
  }

  let positionInfo: any = null
  let textLines: string[] = []
  let hasPositioningCode = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim() === '') {
      if (
        currentCue.startTime !== undefined &&
        currentCue.endTime !== undefined &&
        textLines.length > 0
      ) {
        // Konumu en son ayarla
        if (hasPositioningCode) {
          currentCue.text = textLines
        } else {
          // Hiç konum bilgisi yoksa, varsayılan olarak ekle
          currentCue.text = textLines
          currentCue.positionString = 'none'
        }

        cues.push(currentCue as SubtitleCue)
      }
      currentCue = {}
      positionInfo = null
      textLines = []
      hasPositioningCode = false
      continue
    }

    if (line.includes('-->')) {
      const [startStr, endStr] = line.split('-->').map((t) => t.trim())
      currentCue.startTime = timeToSeconds(startStr)
      currentCue.endTime = timeToSeconds(endStr)
    } else if (currentCue.startTime !== undefined && currentCue.endTime !== undefined) {
      const cleanedLine = basicClean(line)

      // Satırda konum kodu var mı kontrol et
      if (cleanedLine.match(/\{\\?an[1-9]\}/)) {
        const {
          text,
          position,
          isBottom,
          isTop,
          isLeft,
          isRight,
          isCenterX,
          isCenterY,
          positionString,
        } = parseVTTPositioning(cleanedLine)

        // İlk konum kodunu bulduk, bunu tüm altyazı kümesi için kullan
        if (!hasPositioningCode) {
          currentCue.isBottom = isBottom
          currentCue.isTop = isTop
          currentCue.isLeft = isLeft
          currentCue.isRight = isRight
          currentCue.isCenterX = isCenterX
          currentCue.isCenterY = isCenterY
          currentCue.positionString = positionString

          if (position) {
            currentCue.position = position
          }

          hasPositioningCode = true
        }

        textLines.push(text)
      } else {
        // Konum kodu yoksa sadece metni ekle
        textLines.push(cleanedLine)
      }
    }
  }

  // Son kümeyi de ekle
  if (
    currentCue.startTime !== undefined &&
    currentCue.endTime !== undefined &&
    textLines.length > 0
  ) {
    currentCue.text = textLines
    if (!hasPositioningCode) {
      currentCue.positionString = 'none'
    }
    cues.push(currentCue as SubtitleCue)
  }

  return cues
}

/**
 * CSS string'ini (örn. "left: 0; top: 0;") stil nesnesine çevirir.
 */
const parsePositionString = (positionString: string): React.CSSProperties => {
  const style: React.CSSProperties = {}
  const rules = positionString.split(';')
  rules.forEach((rule) => {
    const [prop, val] = rule.split(':').map((s) => s.trim())
    if (!prop || !val) return
    style[prop as any] = val
  })
  return style
}

/**
 * Custom konum verildiyse, videonun alanını hesaba katarak pozisyonu ayarlar.
 */
function adjustCustomPositionForVideo(
  style: React.CSSProperties,
  videoHeight: number
): React.CSSProperties {
  if (typeof window === 'undefined') return style
  const windowHeight = window.innerHeight
  const videoTop = (windowHeight - videoHeight) / 2
  const newStyle = { ...style }
  if (newStyle.top && typeof newStyle.top === 'string') {
    const topVal = parseFloat(newStyle.top)
    if (!isNaN(topVal)) {
      newStyle.top = `${videoTop + topVal}px`
    }
  }
  if (newStyle.bottom && typeof newStyle.bottom === 'string') {
    const bottomVal = parseFloat(newStyle.bottom)
    if (!isNaN(bottomVal)) {
      const videoBottomOffset = windowHeight - (videoTop + videoHeight)
      newStyle.bottom = `${videoBottomOffset + bottomVal}px`
    }
  }
  return newStyle
}

/**
 * Varsayılan durumda letterbox margin uygulanır.
 */
function adjustPositionForVideo(
  style: React.CSSProperties,
  letterboxMargin: number,
  videoHeight: number
) {
  if (style.top && style.top === '0') {
    style.top = `${letterboxMargin}px`
  }
  if (style.bottom && style.bottom === '0') {
    style.bottom = `${letterboxMargin}px`
  }
  return style
}

export const CustomSubtitleRenderer: React.FC<CustomSubtitleRendererProps> = React.memo(
  ({ subtitleStyle, selectedSubtitle, currentTime, videoHeight = 0, letterboxMargin = 0 }) => {
    const [subtitleCues, setSubtitleCues] = useState<SubtitleCue[]>([])
    const [currentCues, setCurrentCues] = useState<SubtitleCue[]>([])

    useEffect(() => {
      const loadSubtitles = async () => {
        if (!selectedSubtitle) {
          setSubtitleCues([])
          return
        }
        try {
          const response = await fetch(selectedSubtitle.src)
          const text = await response.text()
          const cues = parseVTT(text)
          setSubtitleCues(cues)
        } catch (error) {
          console.error('Altyazı yükleme hatası:', error)
          setSubtitleCues([])
        }
      }
      loadSubtitles()
    }, [selectedSubtitle])

    useEffect(() => {
      const activeCues = subtitleCues.filter(
        (cue) =>
          currentTime >= cue.startTime + (subtitleStyle?.timeShift || 0) &&
          currentTime <= cue.endTime + (subtitleStyle?.timeShift || 0)
      )
      setCurrentCues(activeCues)
    }, [currentTime, subtitleCues])

    // Default stil
    const margin = letterboxMargin
    const bottom =
      margin < subtitleStyle.minBottomPosition ? subtitleStyle.minBottomPosition : margin

    const defaultStyle: React.CSSProperties = {
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: subtitleStyle.position === 'bottom' ? bottom : 'auto',
      top: subtitleStyle.position === 'top' ? margin : 'auto',
      width: '100%',
      maxWidth: '90%',
      textAlign: 'center',
      pointerEvents: 'none',
    }

    const textStyles = useMemo(
      () => ({
        fontFamily: subtitleStyle.fontFamily,
        fontSize: subtitleStyle.fontSize,
        fontWeight: subtitleStyle.fontWeight,
        color: subtitleStyle.color,
        textShadow: subtitleStyle.textShadow ? '2px 2px 2px rgba(0, 0, 0, 0.6)' : 'none',
        // padding: subtitleStyle.padding,
        paddingLeft: '6px',
        paddingRight: '6px',
        wordBreak: 'break-word' as const,
        whiteSpace: 'pre-wrap',
        WebkitTextStroke: '1px ' + subtitleStyle.letterColor,
      }),
      [subtitleStyle]
    )

    const backgroundStyles = useMemo(
      () => ({
        display: 'inline-block',
        boxDecorationBreak: 'clone' as const,
        WebkitBoxDecorationBreak: 'clone' as const,
      }),
      [subtitleStyle.backgroundColor]
    )

    if (!currentCues.length || !selectedSubtitle) return null

    const spacerStyle = {
      height: subtitleStyle.margin,
    }

    const mergedCues = currentCues.reduce((acc: Record<string, SubtitleCue>, cue) => {
      const exist = acc[cue.positionString]
      if (exist) {
        acc[cue.positionString].text = [...new Set([...exist.text, ...cue.text])]
      } else {
        acc[cue.positionString] = cue
      }
      return acc
    }, {})

    const mergedCuesArray = Object.values(mergedCues)

    return (
      <>
        {mergedCuesArray.map((cue, index) => {
          const cueContainerStyle = (() => {
            let style: React.CSSProperties = {
              position: 'absolute',
              width: '100%',
              pointerEvents: 'none',
            }
            if (cue.position) {
              const { isBottom, isTop, isLeft, isRight, isCenterX, isCenterY } = cue
              const customStyle = parsePositionString(cue.position)
              const adjustedCustomStyle = adjustCustomPositionForVideo(customStyle, videoHeight)

              if (isLeft) {
                style.left = adjustedCustomStyle.left || defaultStyle.left
                style.paddingLeft = subtitleStyle.margin
                style.right = 'unset'
                style.textAlign = 'left'
              }
              if (isRight) {
                style.right = adjustedCustomStyle.right || defaultStyle.right
                style.paddingRight = subtitleStyle.margin
                style.left = 'unset'
                style.textAlign = 'right'
              }
              if (isBottom) {
                const bottomValue = adjustedCustomStyle.bottom || defaultStyle.bottom
                style.bottom = Math.max(
                  getStyleNumber(bottomValue),
                  subtitleStyle.minBottomPosition
                )
                style.paddingBottom = subtitleStyle.margin
              }
              if (isTop) {
                const topValue = adjustedCustomStyle.top || defaultStyle.top
                style.top = Math.abs(getStyleNumber(topValue)) + 'px'
                style.paddingTop = subtitleStyle.margin
              }
              if (isCenterX) {
                if (!isCenterY) {
                  style.left = '50%'
                  style.transform = 'translateX(-50%)'
                }
                style.textAlign = 'center'
              }
              if (isCenterY) {
                style.top = '50%'
                style.transform = 'translateY(-50%)'
              }
            } else {
              style = { ...defaultStyle, position: 'absolute', pointerEvents: 'none' }
              style = adjustPositionForVideo(style, letterboxMargin, videoHeight)
            }
            return style
          })()
          return (
            <div
              key={index}
              style={cueContainerStyle}
              className="absolute inset-x-0 z-[99999] custom-subtitle-container"
            >
              <div style={backgroundStyles}>
                <div style={spacerStyle} />
                <div
                  style={{
                    backgroundColor: subtitleStyle.backgroundColor,
                    display: 'flex',
                  }}
                  className="rounded-sm"
                >
                  <span
                    style={textStyles}
                    dangerouslySetInnerHTML={{ __html: cue.text.join('<br>') }}
                  />
                </div>
                <div style={spacerStyle} />
              </div>
            </div>
          )
        })}
      </>
    )
  }
)

CustomSubtitleRenderer.displayName = 'CustomSubtitleRenderer'
