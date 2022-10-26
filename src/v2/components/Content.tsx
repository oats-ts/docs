import React, { FC, PropsWithChildren } from 'react'
import { css, cx } from '@emotion/css'
import { containerStyle } from './containerStyle'

export type ContentProps = PropsWithChildren

const contentStyle = css`
  label: content;
  width: 100%;
  flex: 1 1 1px;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
`

export const Content: FC<ContentProps> = ({ children }) => {
  return <main className={cx(contentStyle, containerStyle)}>{children}</main>
}
