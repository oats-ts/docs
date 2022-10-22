import { css, cx } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { HiChevronRight } from 'react-icons/hi2'
import { theme } from '../theme'

export type SideBarMenuItemProps = PropsWithChildren & {
  active: boolean
  href: string
}

const docItemStyle = css`
  display: flex;
  flex-direction: row;
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.muted};
  padding: 10px 14px;
  transition: background-color 150ms linear, color 150ms linear;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${theme.colors.dark1};
  }
`

const docItemLabelStyle = css`
  flex: 1 1 1px;
`

const activeDocItemStyle = css`
  background-color: ${theme.colors.dark1};
  color: ${theme.colors.text};
`

export const SideBarMenuItem: FC<SideBarMenuItemProps> = ({ children, href, active }) => {
  const itemClassName = active ? cx(docItemStyle, activeDocItemStyle) : docItemStyle
  return (
    <a href={href} className={itemClassName}>
      <span className={docItemLabelStyle}>{children}</span> {active && <HiChevronRight />}
    </a>
  )
}
