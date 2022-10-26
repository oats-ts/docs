// import { css } from '@emotion/css'

import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

export const breakpoints = {
  desktop: `(min-width: 1201px)`,
  tablet: `(min-width: 651px) and (max-width: 1200px) `,
  phone: `(max-width: 650px) `,
} as const

type MobileOnlyProps = PropsWithChildren & {
  breakpoint: keyof typeof breakpoints
}

export const BreakPoint: FC<MobileOnlyProps> = ({ children, breakpoint }) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    window.matchMedia(breakpoints[breakpoint]).addEventListener('change', (e) => setMatches(e.matches))
  }, [])

  return matches ? <>{children}</> : null
}
