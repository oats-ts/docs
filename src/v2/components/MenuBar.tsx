import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'

const menuItemsContainerStyle = css`
  label: menu-bar;
  display: flex;
  flex-direction: row;
`

export const MenuBar: FC<PropsWithChildren> = ({ children }) => {
  return <ul className={menuItemsContainerStyle}>{children}</ul>
}
