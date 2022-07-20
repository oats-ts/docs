import { css } from '@emotion/css'

export const HeightSub = 130

export const wrapperStyle = css`
  padding: 16px;
  height: calc(100vh - ${HeightSub}px);
  overflow-y: auto;
`
