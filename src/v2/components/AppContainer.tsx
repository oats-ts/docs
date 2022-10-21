import { css, cx } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'

const containerStyle = css`
  label: app-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  margin: 0px;
  padding: 0px;
  background-color: ${theme.colors.dark2};
`

const verticalStyle = css`
  label: vertical;
  flex-direction: column;
`

const horizontalStyle = css`
  label: vertical;
  flex-direction: row;
`

export type AppContainerProps = PropsWithChildren & {
  direction: 'vertical' | 'horizontal'
}

export const AppContainer: FC<AppContainerProps> = ({ children, direction }) => {
  const clsName = cx(containerStyle, direction === 'horizontal' ? horizontalStyle : verticalStyle)
  return <div className={clsName}>{children}</div>
}
