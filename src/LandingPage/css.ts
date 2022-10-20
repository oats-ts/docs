import { css } from '@emotion/css'

export const breakpoints = {
  desktop: `@media (min-width: 1201px)`,
  tablet: `@media (min-width: 577px) and (max-width: 1200px) `,
  phone: `@media (max-width: 576px) `,
}

export const ctnr = css`
  display: flex;

  ${breakpoints.desktop} {
    width: 90%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  ${breakpoints.tablet} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0px 10px;
    margin-left: auto;
    margin-right: auto;
  }

  ${breakpoints.phone} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0px 10px;
    margin-left: auto;
    margin-right: auto;
  }
`
