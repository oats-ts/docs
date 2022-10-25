import { css } from '@emotion/react'
import { theme } from './theme'

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: ${theme.fontFamily.sansSerif};
  }
  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`
