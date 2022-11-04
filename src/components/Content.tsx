import React, { FC, PropsWithChildren } from 'react'
import { css, cx } from '@emotion/css'
import { containerStyle } from './containerStyle'
import { theme } from '../theme'

export type ContentProps = PropsWithChildren

const contentStyle = css`
  label: content;
  width: 100%;
  flex: ${theme.flex.grow};
  margin: ${theme.spacing.zero};
  padding: ${theme.spacing.zero};
  display: flex;
  flex-direction: column;
`

export const Content: FC<ContentProps> = ({ children }) => {
  return <main className={cx(contentStyle, containerStyle)}>{children}</main>
}
