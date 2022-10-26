import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'

const menuItemsContainerStyle = css`
  label: menu-bar;
  display: flex;
  flex-direction: row;
  padding: ${theme.spacing.zero};
`

export const MenuBar: FC<PropsWithChildren> = ({ children }) => {
  return <ul className={menuItemsContainerStyle}>{children}</ul>
}
