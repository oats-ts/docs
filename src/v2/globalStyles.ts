import { css } from '@emotion/react'
import { theme } from './theme'

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: ${theme.fontFamily.sansSerif};
  }
`
