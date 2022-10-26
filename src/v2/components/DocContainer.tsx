import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'

const containerStyle = css`
  label: doc-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  margin: ${theme.spacing.zero};
  padding: ${theme.spacing.zero};
  background-color: ${theme.colors.dark3};
`

export type DocContainerProps = PropsWithChildren & {
  className?: string
}

export const DocContainer: FC<DocContainerProps> = ({ children }) => {
  return <div className={containerStyle}>{children}</div>
}
