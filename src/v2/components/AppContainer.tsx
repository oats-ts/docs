import { css } from '@emotion/css'
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
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  background-color: ${theme.colors.dark3};
`

export type AppContainerProps = PropsWithChildren

export const AppContainer: FC<AppContainerProps> = ({ children }) => {
  return <div className={containerStyle}>{children}</div>
}
