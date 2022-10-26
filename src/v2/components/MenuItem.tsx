import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { theme } from '../theme'

const activeStyle = css`
  label: active-menu-item;
  color: ${theme.colors.text};
`

const anchorStyle = css`
  label: menu-item-anchor;
  position: relative;
  text-decoration: none;
  color: ${theme.colors.muted};
  display: flex;
  gap: ${theme.spacing.s};
  align-items: center;
  transition: color 150ms linear;

  &:hover {
    color: ${theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -${theme.spacing.xxs};
    left: 0;
    width: 100%;
    height: ${theme.spacing.xxxs};
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
  label: menu-item;
  height: 100%;
  padding: ${theme.spacing.zero} 24px;
  display: flex;
  gap: ${theme.spacing.s};
  align-items: center;
  cursor: pointer;
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
  &:first-of-type {
    padding-left: ${theme.spacing.zero};
  }
`

export type MenuItemProps = {
  active?: boolean
  label: string
  icon: IconType
  href?: string
  onClick?: () => void
}

export const MenuItem: FC<MenuItemProps> = ({ label, active, href, onClick, icon: Icon }) => {
  const fullAnchorStyle = cx(anchorStyle, active ? activeStyle : undefined)
  const _clickHandler = isNil(href) ? onClick : undefined
  return (
    <li className={menuItemStyle} onClick={_clickHandler}>
      <a href={href} className={fullAnchorStyle}>
        <Icon />
        <span>{label}</span>
      </a>
    </li>
  )
}
