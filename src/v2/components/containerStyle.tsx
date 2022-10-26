import { css } from '@emotion/css'
import { breakpoints } from '../breakpoints'
import { theme } from '../theme'

export const containerStyle = css`
  label: container;
  display: flex;
  @media ${breakpoints.desktop} {
    width: 90%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  @media ${breakpoints.tablet} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${theme.spacing.zero} ${theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }

  @media ${breakpoints.phone} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${theme.spacing.zero} ${theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }
`
