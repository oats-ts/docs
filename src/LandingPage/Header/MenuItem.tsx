import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { theme } from '../../theme'

const activeStyle = css`
  color: ${theme.colors.text};
  /* &::after {
    transform: scale(1) !important;
    background-color: ${theme.colors.text};
  } */
`

const anchorStyle = css`
  position: relative;
  text-decoration: none;
  color: ${theme.colors.muted};
  display: flex;
  gap: 8px;
  align-items: center;
  transition: color 150ms linear;

  &:hover {
    color: ${theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${theme.colors.text};
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
  }

  &:hover::after,
  &:focus::after {
    opacity: 1;
    transform: translate3d(0, 0.2em, 0);
  }

  &::after,
  &:focus::after {
    opacity: 1;
    transform: scale(0);
    transform-origin: center;
  }

  &:hover::after {
    transform: scale(1);
  }
`

const menuItemStyle = css`
  height: 100%;
  padding: 0px 24px;
  color: ${theme.colors.text};
  display: flex;
  gap: 8px;
  align-items: center;
`

export type MenuItemProps = {
  active?: boolean
  label: string
  href: string
  icon: IconType
}

export const MenuItem: FC<MenuItemProps> = ({ label, active, href, icon: Icon }) => {
  const fullAnchorStyle = cx(anchorStyle, active ? activeStyle : undefined)
  return (
    <li className={menuItemStyle}>
      <a href={`#${href}`} className={fullAnchorStyle}>
        <Icon size="20px" />
        <span>{label}</span>
      </a>
    </li>
  )
}
