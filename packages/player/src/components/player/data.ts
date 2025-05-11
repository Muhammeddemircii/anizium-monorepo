import { getResponsiveValue } from '@/lib/utils'
import { Filter, SubtitleStyle } from './interfaces'

export const filters: Filter[] = [
  // Cinematic Filtreler
  {
    name: 'Hollywood',
    category: 'Cinematic',
    values: {
      contrast: 130,
      brightness: 110,
      saturate: 120,
      sepia: 10,
      hueRotate: 2,
      blur: 0,
      temperature: 7,
      vignette: '0 0 220px rgba(0,0,0,0.4)',
      grain:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr8i2tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQ4jWNgGAWjgP6ASdXAwEBVQcnAwEBJQcHAwEBBwcDAwEBJQUlAwEBJQUlJSYCBgYEBANH5CxkR0NTgAAAAAElFTkSuQmCC)',
    },
  },
  {
    name: 'Film Noir',
    category: 'Cinematic',
    values: {
      contrast: 170,
      brightness: 70,
      saturate: 15,
      sepia: 15,
      hueRotate: -10,
      blur: 0.5,
      temperature: -20,
      vignette: '0 0 260px rgba(0,0,0,1)',
      grain:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr8i2tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQ4jWNgGAWjgP6ASdXAwEBVQcnAwEBJQcHAwEBBwcDAwEBJQUlAwEBJQUlJSYCBgYEBANH5CxkR0NTgAAAAAElFTkSuQmCC)',
    },
  },
  {
    name: 'Blockbuster',
    category: 'Cinematic',
    values: {
      contrast: 130,
      brightness: 110,
      saturate: 150,
      sepia: 0,
      hueRotate: -2,
      blur: 0,
      temperature: 10,
      vignette: '0 0 200px rgba(0,0,0,0.3)',
      grain:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr8i2tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQ4jWNgGAWjgP6ASdXAwEBVQcnAwEBJQcHAwEBBwcDAwEBJQUlAwEBJQUlJSYCBgYEBANH5CxkR0NTgAAAAAElFTkSuQmCC)',
    },
  },

  // Vintage Filtreler
  {
    name: 'Old Film',
    category: 'Vintage',
    values: {
      contrast: 115,
      brightness: 80,
      saturate: 30,
      sepia: 50,
      hueRotate: -3,
      blur: 0.5,
      temperature: -10,
      vignette: '0 0 240px rgba(0,0,0,0.8)',
      grain:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr8i2tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQ4jWNgGAWjgP6ASdXAwEBVQcnAwEBJQcHAwEBBwcDAwEBJQUlAwEBJQUlJSYCBgYEBANH5CxkR0NTgAAAAAElFTkSuQmCC)',
    },
  },
  {
    name: 'Retro',
    category: 'Vintage',
    values: {
      contrast: 140,
      brightness: 95,
      saturate: 70,
      sepia: 20,
      hueRotate: -8,
      blur: 0,
      temperature: -5,
      vignette: '0 0 210px rgba(0,0,0,0.5)',
      grain:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr8i2tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQ4jWNgGAWjgP6ASdXAwEBVQcnAwEBJQcHAwEBBwcDAwEBJQUlAwEBJQUlJSYCBgYEBANH5CxkR0NTgAAAAAElFTkSuQmCC)',
    },
  },
  {
    name: 'VHS',
    category: 'Vintage',
    values: {
      contrast: 90,
      brightness: 110,
      saturate: 140,
      sepia: 10,
      hueRotate: 8,
      blur: 1.0,
      temperature: 8,
      vignette: '0 0 160px rgba(0,0,0,0.4)',
      grain:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr8i2tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQ4jWNgGAWjgP6ASdXAwEBVQcnAwEBJQcHAwEBBwcDAwEBJQUlAwEBJQUlJSYCBgYEBANH5CxkR0NTgAAAAAElFTkSuQmCC)',
    },
  },

  // Mood Filtreler
  {
    name: 'Dramatic',
    category: 'Mood',
    values: {
      contrast: 155,
      brightness: 70,
      saturate: 80,
      sepia: 5,
      hueRotate: -2,
      blur: 0,
      temperature: -15,
      vignette: '0 0 240px rgba(0,0,0,0.9)',
      grain:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr8i2tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQ4jWNgGAWjgP6ASdXAwEBVQcnAwEBJQcHAwEBBwcDAwEBJQUlAwEBJQUlJSYCBgYEBANH5CxkR0NTgAAAAAElFTkSuQmCC)',
    },
  },
  {
    name: 'Horror',
    category: 'Mood',
    values: {
      contrast: 140,
      brightness: 60,
      saturate: 50,
      sepia: 0,
      hueRotate: -15,
      blur: 0.8,
      temperature: -30,
      vignette: '0 0 260px rgba(0,0,0,1)',
      grain:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr8i2tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQ4jWNgGAWjgP6ASdXAwEBVQcnAwEBJQcHAwEBBwcDAwEBJQUlAwEBJQUlJSYCBgYEBANH5CxkR0NTgAAAAAElFTkSuQmCC)',
    },
  },
  {
    name: 'Romance',
    category: 'Mood',
    values: {
      contrast: 100,
      brightness: 110,
      saturate: 130,
      sepia: 10,
      hueRotate: 5,
      blur: 0.5,
      temperature: 14,
      vignette: '0 0 170px rgba(255,182,193,0.3)',
      grain:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr8i2tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQ4jWNgGAWjgP6ASdXAwEBVQcnAwEBJQcHAwEBBwcDAwEBJQUlAwEBJQUlJSYCBgYEBANH5CxkR0NTgAAAAAElFTkSuQmCC)',
    },
  },

  // Style Filtreler
  {
    name: 'Anime',
    category: 'Style',
    values: {
      contrast: 135,
      brightness: 115,
      saturate: 165,
      sepia: 0,
      hueRotate: 2,
      blur: 0,
      temperature: 10,
      vignette: '0 0 100px rgba(0,0,0,0.15)',
      grain: 'none',
    },
  },
  {
    name: 'Comic',
    category: 'Style',
    values: {
      contrast: 150,
      brightness: 120,
      saturate: 175,
      sepia: 0,
      hueRotate: 0,
      blur: 0,
      temperature: 6,
      vignette: 'none',
      grain: 'none',
    },
  },
  {
    name: 'Cartoon',
    category: 'Style',
    values: {
      contrast: 160,
      brightness: 120,
      saturate: 185,
      sepia: 0,
      hueRotate: 0,
      blur: 0,
      temperature: 10,
      vignette: 'none',
      grain: 'none',
    },
  },

  // Color Filtreler
  {
    name: 'Warm',
    category: 'Color',
    values: {
      contrast: 115,
      brightness: 108,
      saturate: 125,
      sepia: 10,
      hueRotate: 0,
      blur: 0,
      temperature: 20,
      vignette: 'none',
      grain: 'none',
    },
  },
  {
    name: 'Cool',
    category: 'Color',
    values: {
      contrast: 110,
      brightness: 98,
      saturate: 80,
      sepia: 0,
      hueRotate: -20,
      blur: 0,
      temperature: -20,
      vignette: 'none',
      grain: 'none',
    },
  },
  {
    name: 'High Contrast',
    category: 'Color',
    values: {
      contrast: 180,
      brightness: 85,
      saturate: 130,
      sepia: 0,
      hueRotate: 0,
      blur: 0,
      temperature: 0,
      vignette: 'none',
      grain: 'none',
    },
  },
]

export const defaultSubtitleStyle: SubtitleStyle = {
  fontFamily: 'Verdana',
  fontSize: getResponsiveValue({
    mobile: '1.25rem',
    default: '2rem',
  }),
  fontWeight: 500,
  color: '#FFFFFF',
  backgroundColor: 'transparent',
  opacity: 0.75,
  position: 'bottom',
  textShadow: true,
  padding: 20,
  margin: 15,
  letterColor: 'transparent',
  timeShift: 0,
}

export const reportTypes = [
  {
    id: 'subtitle',
    label: 'Altyazı Sorunu',
    description: 'Altyazı eksik, hatalı veya senkron değil',
  },
  {
    id: 'video',
    label: 'Video Sorunu',
    description: 'Video oynatılmıyor veya kalitesi düşük',
  },
  {
    id: 'audio',
    label: 'Ses Sorunu',
    description: 'Ses yok veya senkron değil',
  },
  {
    id: 'other',
    label: 'Diğer',
    description: 'Başka bir sorun var',
  },
]

export const ResolutionLabels = {
  1440: '2K',
  2160: '4K',
  1080: '1080p',
  720: '720p',
  576: '576p',
  480: '480p',
  360: '360p',
  240: '240p',
  144: '144p',
}
