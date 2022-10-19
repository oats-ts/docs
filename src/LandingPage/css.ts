import { css } from '@emotion/css'

export const ctnr = css`
  display: flex;
  @media (min-width: 1200px) {
    max-width: 1200px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 1200px) {
    padding: 0px 10px;
    margin-left: auto;
    margin-right: auto;
  }
`
