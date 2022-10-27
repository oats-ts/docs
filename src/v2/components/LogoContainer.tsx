import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { breakpoints } from '../breakpoints'
import { theme } from '../theme'

const containerStyle = css`
  margin: ${theme.spacing.m} ${theme.spacing.m} ${theme.spacing.xxxl} ${theme.spacing.m};
  @media ${breakpoints.phone} {
    margin: ${theme.spacing.m};
  }
`

export const LogoContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className={containerStyle}>{children}</div>
}
