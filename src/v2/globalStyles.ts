import { css } from '@emotion/react'
import { breakpoints } from './breakpoints'
import { theme } from './theme'

export const globalStyles = css`
  #root {
    margin: ${theme.spacing.zero};
    padding: ${theme.spacing.zero};
    width: 100vw;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fontFamily.sansSerif};
  }

  html {
    font-size: 100%;

    @media ${breakpoints.tablet} {
      font-size: 120%;
    }

    @media ${breakpoints.phone} {
      font-size: 200%;
    }
  }
`
