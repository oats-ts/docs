import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'

const sideBarStyle = css`
  label: side-bar;
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  overflow: auto;
`

export const SideBar: FC<PropsWithChildren> = ({ children }) => {
  return <div className={sideBarStyle}>{children}</div>
}
