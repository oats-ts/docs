import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { breakpoints } from '../breakpoints'
import { theme } from '../theme'

const menuItemsContainerStyle = css`
  label: menu-bar;
  display: flex;
  flex-direction: row;
  padding: ${theme.spacing.zero};
  @media ${breakpoints.phone} {
    flex-direction: column;
    gap: ${theme.spacing.l};
  }
`

export const MenuBar: FC<PropsWithChildren> = ({ children }) => {
  return <ul className={menuItemsContainerStyle}>{children}</ul>
}
