import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { breakpoints } from '../breakpoints'
import { theme } from '../theme'

const sideBarStyle = css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${theme.colors.dark2};
  @media ${breakpoints.phone} {
    display: none;
  }
`

export const SideBar: FC<PropsWithChildren> = ({ children }) => {
  return <div className={sideBarStyle}>{children}</div>
}
