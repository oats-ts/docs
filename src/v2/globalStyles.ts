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

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.dark2} ${theme.colors.dark5};
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 14px;
  }

  *::-webkit-scrollbar-track {
    background: ${theme.colors.dark5};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.dark2};
    border-radius: 7px;
    border: 2px solid ${theme.colors.dark5};
  }
`
