import { Breakpoint, breakpoints } from '@/config'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type KeyType = Breakpoint | 'default'

export function getResponsiveValue(params: Partial<Record<KeyType, number | string>>) {
  const size = typeof window !== 'undefined' ? window.innerWidth : 1200

  const data = {
    mobile: params.mobile ?? params.default,
    tablet: params.tablet ?? params.default,
    desktop: params.desktop ?? params.default,
  }

  if (size < breakpoints.mobile) {
    return data.mobile
  } else if (size < breakpoints.tablet) {
    return data.tablet
  }

  return data.desktop
}

export const getTrackUrl = (src: string) => {
  const url = new URL(src)
  url.searchParams.append('skin', 'beta')
  return url.toString()
}
