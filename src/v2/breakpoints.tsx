// import { css } from '@emotion/css'

import React, { ComponentType, FC, useEffect, useState } from 'react'

export const breakpoints = {
  desktop: `(orientation: landscape) and (min-width: 1201px)`,
  tablet: `(orientation: landscape) and (min-width: 651px) and (max-width: 1200px) `,
  phone: `(orientation: portrait), (max-width: 650px)`,
} as const

type MobileOnlyProps = {
  breakpoint: keyof typeof breakpoints
  Component: ComponentType
}

export const BreakPoint: FC<MobileOnlyProps> = ({ Component, breakpoint }) => {
  const [matches, setMatches] = useState(() => window.matchMedia(breakpoints[breakpoint]).matches)

  useEffect(() => {
    window.matchMedia(breakpoints[breakpoint]).addEventListener('change', (e) => setMatches(e.matches))
  }, [])

  return matches ? <Component /> : null
}
