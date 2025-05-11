export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export const breakpoints: Record<Breakpoint, number> = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
}
