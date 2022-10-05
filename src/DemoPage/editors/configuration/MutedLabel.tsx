import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'

const mutedStyle = css`
  font-size: 0.85714286em;
  color: #777;
  font-weight: 400;
`

export const MutedLabel: FC<PropsWithChildren> = ({ children }) => {
  return <span className={mutedStyle}>{children}</span>
}
