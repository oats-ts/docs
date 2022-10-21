import React, { FC, PropsWithChildren } from 'react'
import { css, cx } from '@emotion/css'
import { ctnr } from './css'

export type ContentProps = PropsWithChildren

const contentStyle = css`
  width: 100%;
  flex: 1 1 1px;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
`

export const Content: FC<ContentProps> = ({ children }) => {
  return <main className={cx(contentStyle, ctnr)}>{children}</main>
}
